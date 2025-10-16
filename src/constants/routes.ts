// Application routes constants
export const ROUTES = {
  // Public routes
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  
  // Protected routes  
  DASHBOARD: '/dashboard',
  PROFILE: '/profile',
  BOOKINGS: '/bookings',
  
  // API routes
  API: {
    AUTH: '/api/auth',
    BOOKINGS: '/api/bookings',
    PAYMENTS: '/api/payments',
    WEBHOOKS: '/api/webhooks',
  }
} as const

export type RouteKey = keyof typeof ROUTES
