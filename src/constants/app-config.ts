/**
 * Application configuration constants
 */

// Application metadata
export const APP_CONFIG = {
  name: 'Vantage Lane',
  version: process.env.APP_VERSION || '2.0.0',
  description: 'Premium luxury chauffeur booking platform',
  url: process.env.NEXT_PUBLIC_APP_URL || 'https://vantagelane.com',
  
  // Contact information
  contact: {
    email: 'support@vantagelane.com',
    phone: '+44 20 7946 0958',
    address: 'London, United Kingdom',
  },
  
  // Social links
  social: {
    twitter: 'https://twitter.com/vantagelane',
    linkedin: 'https://linkedin.com/company/vantage-lane',
    instagram: 'https://instagram.com/vantagelane',
  },
} as const

// Business configuration
export const BUSINESS_CONFIG = {
  // Operating hours (24/7 for premium service)
  operatingHours: {
    start: '00:00',
    end: '23:59',
    timezone: 'Europe/London',
  },
  
  // Service areas
  serviceAreas: [
    'London',
    'Birmingham',
    'Manchester', 
    'Edinburgh',
    'Glasgow',
  ],
  
  // Booking constraints
  booking: {
    minAdvanceBooking: 30, // minutes
    maxAdvanceBooking: 365 * 24 * 60, // 1 year in minutes
    defaultDuration: 60, // minutes
    maxDuration: 24 * 60, // 24 hours in minutes
  },
  
  // Pricing
  pricing: {
    currency: 'GBP',
    symbol: '£',
    minimumFare: 25.00,
    cancellationFee: 10.00,
    vatRate: 0.20, // 20% VAT
  },
} as const

// API configuration
export const API_CONFIG = {
  // Rate limiting
  rateLimit: {
    windowMs: 60 * 1000, // 1 minute
    maxRequests: 100,
  },
  
  // Timeouts
  timeouts: {
    default: 30000, // 30 seconds
    upload: 120000, // 2 minutes
    longRunning: 300000, // 5 minutes
  },
  
  // Pagination
  pagination: {
    defaultLimit: 20,
    maxLimit: 100,
  },
} as const

// Feature flags
export const FEATURES = {
  // Core features
  booking: true,
  payments: true,
  notifications: true,
  
  // Premium features
  realTimeTracking: true,
  corporateAccounts: true,
  apiAccess: false, // Coming soon
  
  // Experimental features (development only)
  aiPricing: process.env.NODE_ENV === 'development',
  voiceBooking: false,
  socialLogin: true,
} as const
