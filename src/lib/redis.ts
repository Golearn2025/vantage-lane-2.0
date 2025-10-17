import { Redis } from '@upstash/redis'

import { log } from '@/lib/logger'

// Initialize Redis client for caching
let redis: Redis | null = null

if (process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN) {
  redis = new Redis({
    url: process.env.UPSTASH_REDIS_REST_URL,
    token: process.env.UPSTASH_REDIS_REST_TOKEN,
  })
}

/**
 * Cache wrapper with automatic expiration and error handling
 */
export async function cache<T>(
  key: string,
  fetcher: () => Promise<T>,
  ttlSeconds: number = 300, // 5 minutes default
): Promise<T> {
  if (!redis) {
    log.debug('Redis not configured, executing fetcher directly', { key })
    return fetcher()
  }

  try {
    // Try to get from cache first
    const cached = await redis.get<T>(key)
    if (cached !== null) {
      log.debug('Cache hit', { key })
      return cached
    }

    // Cache miss - execute fetcher
    log.debug('Cache miss, executing fetcher', { key })
    const result = await fetcher()

    // Store in cache
    await redis.setex(key, ttlSeconds, result)
    log.debug('Cached result', { key, ttl: ttlSeconds })

    return result
  } catch (error) {
    log.error('Cache operation failed, falling back to fetcher', error, { key })
    return fetcher()
  }
}

/**
 * Invalidate cache key(s)
 */
export async function invalidateCache(keyOrPattern: string): Promise<void> {
  if (!redis) return

  try {
    if (keyOrPattern.includes('*')) {
      // Pattern-based deletion
      const keys = await redis.keys(keyOrPattern)
      if (keys.length > 0) {
        await redis.del(...keys)
        log.info('Cache invalidated by pattern', {
          pattern: keyOrPattern,
          count: keys.length,
        })
      }
    } else {
      // Single key deletion
      await redis.del(keyOrPattern)
      log.debug('Cache key invalidated', { key: keyOrPattern })
    }
  } catch (error) {
    log.error('Cache invalidation failed', error, { key: keyOrPattern })
  }
}

/**
 * Get cached value without setting
 */
export async function getCache<T>(key: string): Promise<T | null> {
  if (!redis) return null

  try {
    return await redis.get<T>(key)
  } catch (error) {
    log.error('Cache get failed', error, { key })
    return null
  }
}

/**
 * Set cache value with TTL
 */
export async function setCache<T>(
  key: string,
  value: T,
  ttlSeconds: number = 300,
): Promise<void> {
  if (!redis) return

  try {
    await redis.setex(key, ttlSeconds, value)
    log.debug('Cache value set', { key, ttl: ttlSeconds })
  } catch (error) {
    log.error('Cache set failed', error, { key })
  }
}

/**
 * Cache keys for different data types
 */
export const cacheKeys = {
  user: (userId: string) => `user:${userId}`,
  booking: (bookingId: string) => `booking:${bookingId}`,
  userBookings: (userId: string) => `user:${userId}:bookings`,
  pricing: (pickup: string, destination: string) => `pricing:${pickup}:${destination}`,
  fleet: () => 'fleet:available',
  rates: () => 'rates:current',
} as const
