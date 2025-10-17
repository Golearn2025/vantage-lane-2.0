/**
 * Design system color tokens for Vantage Lane 2.0
 */

// Primary brand colors (extracted from Vantage Lane 1.0)
export const brandColors = {
  primary: {
    50: 'hsl(48, 78%, 95%)', // Ultra light gold tint
    100: 'hsl(48, 75%, 87%)', // Light gold background
    200: 'hsl(48, 70%, 75%)', // Soft gold for highlights
    300: 'hsl(48, 65%, 65%)', // Medium gold for accents
    400: 'hsl(48, 60%, 55%)', // Bright gold for CTAs
    500: 'hsl(45, 35%, 60%)', // PRIMARY GOLD - Main brand color
    600: 'hsl(45, 35%, 50%)', // Dark gold for hover states
    700: 'hsl(45, 35%, 40%)', // Darker gold for pressed states
    800: 'hsl(45, 35%, 30%)', // Very dark gold
    900: 'hsl(45, 35%, 20%)', // Ultra dark gold
  },
  secondary: {
    DEFAULT: 'hsl(48, 50%, 70%)', // Light gold for hover effects
  },
} as const

// User tier colors (using design system approach)
export const tierColors = {
  bronze: 'hsl(30, 50%, 40%)', // Bronze tier
  silver: 'hsl(0, 0%, 75%)', // Silver tier
  gold: 'hsl(51, 100%, 50%)', // Gold tier
  platinum: 'hsl(0, 0%, 90%)', // Platinum tier
  elite: 'hsl(45, 35%, 60%)', // Elite tier (same as primary)
} as const

// Semantic colors
export const semanticColors = {
  success: {
    50: 'hsl(142, 76%, 96%)',
    500: 'hsl(142, 71%, 45%)',
    700: 'hsl(142, 71%, 35%)',
  },
  warning: {
    50: 'hsl(48, 100%, 96%)',
    500: 'hsl(38, 92%, 50%)',
    700: 'hsl(32, 95%, 44%)',
  },
  error: {
    50: 'hsl(0, 86%, 97%)',
    500: 'hsl(0, 84%, 60%)',
    700: 'hsl(0, 70%, 50%)',
  },
  info: {
    50: 'hsl(214, 100%, 97%)',
    500: 'hsl(217, 91%, 60%)',
    700: 'hsl(221, 83%, 53%)',
  },
} as const

// Neutral colors (for dark theme)
export const neutralColors = {
  50: 'hsl(0, 0%, 98%)', // Pure white backgrounds
  100: 'hsl(0, 0%, 96%)', // Light gray backgrounds
  200: 'hsl(0, 0%, 90%)', // Border colors
  300: 'hsl(0, 0%, 83%)', // Dividers
  400: 'hsl(0, 0%, 64%)', // Placeholder text
  500: 'hsl(0, 0%, 45%)', // Secondary text
  600: 'hsl(0, 0%, 32%)', // Primary text on light
  700: 'hsl(0, 0%, 25%)', // Headings on light
  800: 'hsl(0, 0%, 16%)', // Card backgrounds (dark theme)
  900: 'hsl(0, 0%, 10%)', // Main background (dark theme)
  950: 'hsl(0, 0%, 4%)', // Deep black
} as const

// Export all colors
export const colors = {
  brand: brandColors,
  tier: tierColors,
  semantic: semanticColors,
  neutral: neutralColors,
} as const

export default colors
