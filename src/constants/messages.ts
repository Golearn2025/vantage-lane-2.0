/**
 * Application messages and validation patterns
 */

// Error messages
export const ERROR_MESSAGES = {
  // Authentication
  INVALID_CREDENTIALS: 'Invalid email or password',
  ACCOUNT_LOCKED: 'Account temporarily locked. Please try again later.',
  EMAIL_NOT_VERIFIED: 'Please verify your email address before signing in',
  
  // Booking
  BOOKING_NOT_FOUND: 'Booking not found or you do not have permission to view it',
  BOOKING_CANNOT_CANCEL: 'This booking cannot be cancelled at this time',
  INVALID_BOOKING_TIME: 'Booking time must be at least 30 minutes in the future',
  
  // Payment
  PAYMENT_FAILED: 'Payment processing failed. Please try again.',
  CARD_DECLINED: 'Your card was declined. Please try a different payment method.',
  INSUFFICIENT_FUNDS: 'Insufficient funds. Please check your account balance.',
  
  // General
  NETWORK_ERROR: 'Network error. Please check your connection and try again.',
  SERVER_ERROR: 'Server error. Our team has been notified.',
  VALIDATION_ERROR: 'Please check your input and try again.',
} as const

// Success messages
export const SUCCESS_MESSAGES = {
  BOOKING_CREATED: 'Your booking has been confirmed!',
  BOOKING_CANCELLED: 'Booking cancelled successfully',
  PAYMENT_SUCCESS: 'Payment processed successfully',
  PROFILE_UPDATED: 'Profile updated successfully',
  EMAIL_SENT: 'Email sent successfully',
} as const

// Regular expressions for validation
export const REGEX_PATTERNS = {
  email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  phone: /^\+?[\d\s\-\(\)]{10,}$/,
  postcode: /^[A-Z]{1,2}\d[A-Z\d]?\s?\d[A-Z]{2}$/i, // UK postcodes
  strongPassword: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
} as const

export type ErrorMessageKey = keyof typeof ERROR_MESSAGES
export type SuccessMessageKey = keyof typeof SUCCESS_MESSAGES
