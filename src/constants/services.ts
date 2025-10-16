/**
 * Vehicle fleet and service type configurations
 */

// Vehicle fleet configuration
export const VEHICLE_TYPES = {
  executive: {
    name: 'Executive Sedan',
    capacity: 3,
    luggage: 2,
    baseRate: 2.50, // per mile
    description: 'Premium sedan for business travel',
    features: ['Wi-Fi', 'Bottled water', 'Phone charger'],
  },
  luxury: {
    name: 'Luxury Vehicle',
    capacity: 3,
    luggage: 3, 
    baseRate: 3.50,
    description: 'High-end luxury vehicles',
    features: ['Wi-Fi', 'Premium refreshments', 'Entertainment system'],
  },
  suv: {
    name: 'Premium SUV',
    capacity: 6,
    luggage: 4,
    baseRate: 4.00,
    description: 'Spacious SUV for groups',
    features: ['Wi-Fi', 'Climate control', 'Extra space'],
  },
  van: {
    name: 'Executive Van',
    capacity: 8,
    luggage: 8,
    baseRate: 5.00, 
    description: 'Large groups and events',
    features: ['Wi-Fi', 'Multiple screens', 'Conference setup'],
  },
} as const

// Service types
export const SERVICE_TYPES = {
  'airport-transfer': {
    name: 'Airport Transfer',
    icon: '✈️',
    description: 'Reliable airport transportation',
    features: ['Flight monitoring', 'Meet & greet', 'Luggage assistance'],
  },
  'executive-travel': {
    name: 'Executive Travel', 
    icon: '💼',
    description: 'Professional business transportation',
    features: ['Quiet environment', 'Wi-Fi', 'Privacy partition'],
  },
  'events': {
    name: 'Special Events',
    icon: '🎉', 
    description: 'Transportation for special occasions',
    features: ['Red carpet service', 'Champagne', 'Photography stops'],
  },
  'hourly-hire': {
    name: 'Hourly Hire',
    icon: '🕐',
    description: 'Flexible hourly transportation',
    features: ['Flexible routing', 'Wait time included', 'Multiple stops'],
  },
  'sightseeing': {
    name: 'Sightseeing Tours',
    icon: '🗺️',
    description: 'Guided city and countryside tours',
    features: ['Local guide', 'Custom itinerary', 'Historical insights'],
  },
} as const

export type VehicleType = keyof typeof VEHICLE_TYPES
export type ServiceType = keyof typeof SERVICE_TYPES
