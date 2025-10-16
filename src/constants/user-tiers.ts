/**
 * User tier configuration using design system colors
 */

import { tierColors } from '@/design-system/tokens/colors'

export const USER_TIERS = {
  bronze: {
    name: 'Bronze',
    spendingThreshold: 0,
    color: tierColors.bronze,
    benefits: ['Basic booking', 'Email support'],
    discountPercentage: 0,
  },
  silver: {
    name: 'Silver', 
    spendingThreshold: 2000,
    color: tierColors.silver,
    benefits: ['Priority booking', 'Phone support', '5% discount'],
    discountPercentage: 0.05,
  },
  gold: {
    name: 'Gold',
    spendingThreshold: 5000, 
    color: tierColors.gold,
    benefits: ['Express booking', 'Dedicated support', '10% discount'],
    discountPercentage: 0.10,
  },
  platinum: {
    name: 'Platinum',
    spendingThreshold: 15000,
    color: tierColors.platinum,
    benefits: ['VIP treatment', '24/7 support', '15% discount', 'Complimentary upgrades'],
    discountPercentage: 0.15,
  },
  elite: {
    name: 'Elite',
    spendingThreshold: 30000,
    color: tierColors.elite,
    benefits: ['White-glove service', 'Personal concierge', '20% discount', 'Priority fleet access'],
    discountPercentage: 0.20,
  },
} as const

export type UserTier = keyof typeof USER_TIERS
