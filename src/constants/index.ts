/**
 * Barrel export for all application constants
 */

export * from './app-config'
export * from './user-tiers'
export * from './services'
export * from './messages'

// Re-export for backward compatibility
import { APP_CONFIG, BUSINESS_CONFIG, API_CONFIG, FEATURES } from './app-config'
import { USER_TIERS } from './user-tiers'
import { VEHICLE_TYPES, SERVICE_TYPES } from './services'
import { ERROR_MESSAGES, SUCCESS_MESSAGES, REGEX_PATTERNS } from './messages'

export default {
  APP_CONFIG,
  BUSINESS_CONFIG,
  USER_TIERS,
  VEHICLE_TYPES,
  SERVICE_TYPES,
  API_CONFIG,
  FEATURES,
  ERROR_MESSAGES,
  SUCCESS_MESSAGES,
  REGEX_PATTERNS,
}
