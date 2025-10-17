import { Redis } from '@upstash/redis'
import { type NextRequest, NextResponse } from 'next/server'

import { log } from '@/lib/logger'

// Rate limiting configuration
interface RateLimitConfig {
  requests: number
  window: number // seconds
  skipSuccessfulRequests?: boolean
  skipFailedRequests?: boolean
}

// Predefined rate limit tiers
export const rateLimits = {
  // API endpoints
  api: { requests: 100, window: 60 }, // 100 req/min
  auth: { requests: 5, window: 60 }, // 5 auth attempts/min
  booking: { requests: 10, window: 60 }, // 10 bookings/min
  payment: { requests: 3, window: 60 }, // 3 payments/min

  // By user tier
  bronze: { requests: 50, window: 60 },
  silver: { requests: 100, window: 60 },
  gold: { requests: 200, window: 60 },
  platinum: { requests: 500, window: 60 },
  elite: { requests: 1000, window: 60 },
} as const

let redis: Redis | null = null

if (process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN) {
  redis = new Redis({
    url: process.env.UPSTASH_REDIS_REST_URL,
    token: process.env.UPSTASH_REDIS_REST_TOKEN,
  })
}

/**
 * Rate limit middleware for API routes
 */
export async function rateLimit(
  request: NextRequest,
  config: RateLimitConfig,
  identifier?: string,
): Promise<{ success: boolean; reset: number; remaining: number } | NextResponse> {
  // Skip if Redis not configured
  if (!redis) {
    log.warn('Rate limiting skipped - Redis not configured')
    return { success: true, reset: 0, remaining: config.requests }
  }

  // Generate identifier (IP or custom)
  const id = identifier || getClientId(request)
  const key = `ratelimit:${id}:${request.nextUrl.pathname}`

  try {
    // Get current usage
    const current = (await redis.get<number>(key)) || 0
    const reset = Math.floor(Date.now() / 1000) + config.window

    // Check if limit exceeded
    if (current >= config.requests) {
      log.warn('Rate limit exceeded', {
        identifier: id,
        path: request.nextUrl.pathname,
        current,
        limit: config.requests,
      })

      return NextResponse.json(
        {
          error: 'Rate limit exceeded',
          message: `Too many requests. Limit: ${config.requests} per ${config.window} seconds`,
          reset,
        },
        {
          status: 429,
          headers: {
            'X-RateLimit-Limit': config.requests.toString(),
            'X-RateLimit-Remaining': '0',
            'X-RateLimit-Reset': reset.toString(),
            'Retry-After': config.window.toString(),
          },
        },
      )
    }

    // Increment counter
    const pipeline = redis.pipeline()
    pipeline.incr(key)
    pipeline.expire(key, config.window)
    await pipeline.exec()

    const remaining = Math.max(0, config.requests - current - 1)

    log.debug('Rate limit check passed', {
      identifier: id,
      path: request.nextUrl.pathname,
      current: current + 1,
      remaining,
      limit: config.requests,
    })

    return { success: true, reset, remaining }
  } catch (error) {
    log.error('Rate limiting failed', error, { identifier: id })
    // Fail open - allow request if rate limiting fails
    return { success: true, reset: 0, remaining: config.requests }
  }
}

/**
 * Rate limit by user tier
 */
export async function rateLimitByTier(
  request: NextRequest,
  userTier: keyof typeof rateLimits,
  userId: string,
): Promise<{ success: boolean; reset: number; remaining: number } | NextResponse> {
  const config = rateLimits[userTier] || rateLimits.bronze
  return rateLimit(request, config, `user:${userId}`)
}

/**
 * Extract client identifier from request
 */
function getClientId(request: NextRequest): string {
  // Try different methods to get client IP
  const forwardedFor = request.headers.get('x-forwarded-for')
  const realIp = request.headers.get('x-real-ip')
  const cfConnectingIp = request.headers.get('cf-connecting-ip')

  if (forwardedFor) {
    return forwardedFor.split(',')[0]?.trim() || 'unknown'
  }

  if (realIp) {
    return realIp
  }

  if (cfConnectingIp) {
    return cfConnectingIp
  }

  // Fallback - NextRequest doesn't have ip property in v15
  return 'unknown'
}

/**
 * Reset rate limit for specific identifier
 */
export async function resetRateLimit(identifier: string, path: string): Promise<void> {
  if (!redis) return

  const key = `ratelimit:${identifier}:${path}`

  try {
    await redis.del(key)
    log.info('Rate limit reset', { identifier, path })
  } catch (error) {
    log.error('Rate limit reset failed', error, { identifier, path })
  }
}

/**
 * Get current rate limit status
 */
export async function getRateLimitStatus(
  identifier: string,
  path: string,
  config: RateLimitConfig,
): Promise<{ current: number; remaining: number; reset: number }> {
  if (!redis) {
    return { current: 0, remaining: config.requests, reset: 0 }
  }

  const key = `ratelimit:${identifier}:${path}`

  try {
    const current = (await redis.get<number>(key)) || 0
    const ttl = await redis.ttl(key)
    const reset = ttl > 0 ? Math.floor(Date.now() / 1000) + ttl : 0
    const remaining = Math.max(0, config.requests - current)

    return { current, remaining, reset }
  } catch (error) {
    log.error('Rate limit status check failed', error, { identifier, path })
    return { current: 0, remaining: config.requests, reset: 0 }
  }
}
