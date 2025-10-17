// Unified monitoring exports
export { Sentry } from './sentry.client'
export * from '@sentry/nextjs'

/**
 * Capture user context for monitoring
 */
export function captureUserContext(user: { id: string; email: string; tier?: string }) {
  if (typeof window !== 'undefined') {
    // Client-side only
    const { Sentry } = require('./sentry.client')
    Sentry.setUser({
      id: user.id,
      email: user.email,
      tier: user.tier,
    })
  }
}

/**
 * Capture business event
 */
export function captureBusinessEvent(event: string, data?: Record<string, unknown>) {
  if (typeof window !== 'undefined') {
    const { Sentry } = require('./sentry.client')
    Sentry.addBreadcrumb({
      message: event,
      data,
      category: 'business',
      level: 'info',
    })
  }
}

/**
 * Capture API performance
 */
export function captureAPIPerformance(
  endpoint: string,
  duration: number,
  status: number,
) {
  if (typeof window !== 'undefined') {
    const { Sentry } = require('./sentry.client')
    Sentry.addBreadcrumb({
      message: `API ${endpoint}`,
      data: { duration, status },
      category: 'api',
      level: status >= 400 ? 'error' : 'info',
    })
  }
}
