/**
 * 🎨 LuxuryCard Variants - Vantage Lane 2.0
 * Style configurations bazate pe design tokens (fără hardcodări)
 */

import { designTokens } from '@/config/theme.config'
import { luxuryCardTokens } from '@/design-system/tokens/luxury-card'
import type { LuxuryCardStyleConfig } from './LuxuryCard.types'

// Base classes (extracted from original, dar fără hardcodări)
const baseClasses = [
  'group',
  'relative', 
  'text-center',
  'rounded-xl',
  'backdrop-blur-sm',
  'transition-all',
  'overflow-hidden',
  'cursor-pointer',
  'block'
].join(' ')

// Variant-specific classes 
const variantClasses = {
  shimmer: [
    // Background gradient (dark mode compatible)
    'bg-gradient-to-br',
    'from-[#1a1a1a]',
    'via-[#0f0f0f]', 
    'to-[#1a1a1a]',
    'dark:from-white/8',
    'dark:via-white/4',
    'dark:to-white/2',
    // Border
    'border',
    'border-neutral-800',
    'dark:border-white/10',
    'hover:border-[var(--luxury-glow-color)]/60',
    'dark:hover:border-[var(--luxury-glow-color)]/20',
    // Shadow (folosesc design tokens)
    'shadow-[0_4px_6px_-1px_rgba(0,0,0,0.3),0_2px_4px_-1px_rgba(0,0,0,0.2)]',
    'hover:shadow-[0_20px_25px_-5px_rgba(0,0,0,0.4),0_10px_10px_-5px_rgba(0,0,0,0.2),0_0_30px_rgba(203,178,106,0.15)]',
    // Hover scale
    'hover:scale-105',
    `duration-[${designTokens.animations.duration.normal}]`
  ].join(' '),
  
  glow: [
    'bg-white/5',
    'dark:bg-white/10',
    'border',
    'border-white/10',
    'dark:border-white/20',
    'hover:border-[var(--luxury-glow-color)]/50',
    'hover:shadow-[0_0_30px_rgba(203,178,106,0.3)]',
    `duration-[${designTokens.animations.duration.normal}]`
  ].join(' '),
  
  minimal: [
    'bg-transparent',
    'border',
    'border-neutral-200',
    'dark:border-neutral-800',
    'hover:border-[var(--luxury-glow-color)]/30',
    `duration-[${designTokens.animations.duration.fast}]`
  ].join(' '),
  
  premium: [
    'bg-gradient-to-br',
    'from-[var(--luxury-glow-color)]/5',
    'to-transparent',
    'border-2',
    'border-[var(--luxury-glow-color)]/20',
    'hover:border-[var(--luxury-glow-color)]/60',
    'hover:shadow-[0_0_40px_rgba(203,178,106,0.4)]',
    `duration-[${designTokens.animations.duration.slow}]`
  ].join(' ')
}

// Size classes
const sizeClasses = {
  sm: 'p-4 text-sm',
  md: 'p-6 text-base', 
  lg: 'p-8 text-lg',
  xl: 'p-10 text-xl'
}

// Hover effect classes
const hoverClasses = {
  shimmer: {
    container: 'group-hover:scale-105',
    overlay: [
      'absolute',
      'inset-0',
      'rounded-xl',
      'bg-gradient-to-br',
      'from-[var(--luxury-glow-color)]/5',
      'to-transparent',
      'opacity-0',
      'group-hover:opacity-100',
      'transition-opacity',
      `duration-[${luxuryCardTokens.effects.glow.duration}]`
    ].join(' '),
    shimmer: [
      'absolute',
      'inset-0',
      'bg-gradient-to-r',
      'from-transparent',
      'via-[var(--luxury-shimmer-color)]/20',
      'to-transparent',
      'transform',
      '-skew-x-12',
      '-translate-x-full',
      'group-hover:translate-x-full',
      'transition-transform',
      `duration-[${luxuryCardTokens.effects.shimmer.duration}]`,
      `${luxuryCardTokens.effects.shimmer.easing}`,
      'w-[200%]',
      'h-full'
    ].join(' ')
  },
  
  glow: {
    container: 'group-hover:scale-102',
    overlay: [
      'absolute',
      'inset-0',
      'rounded-xl',
      'bg-[var(--luxury-glow-color)]/10',
      'opacity-0',
      'group-hover:opacity-100',
      'transition-opacity',
      `duration-[${luxuryCardTokens.effects.glow.duration}]`
    ].join(' ')
  },
  
  lift: {
    container: 'group-hover:-translate-y-2 group-hover:scale-105',
    overlay: [
      'absolute',
      'inset-0',
      'rounded-xl',
      'shadow-[0_10px_40px_rgba(0,0,0,0.2)]',
      'opacity-0',
      'group-hover:opacity-100',
      'transition-opacity',
      `duration-[${designTokens.animations.duration.normal}]`
    ].join(' ')
  },
  
  none: {
    container: '',
    overlay: ''
  }
}

// Export complete style configuration
export const luxuryCardStyles: LuxuryCardStyleConfig = {
  base: baseClasses,
  variants: variantClasses,
  sizes: sizeClasses,
  hover: hoverClasses
}

// CSS Custom Properties generator (pentru culori dinamice)
export const generateCustomProperties = (glowColor?: string, shimmerColor?: string) => ({
  '--luxury-glow-color': glowColor || luxuryCardTokens.colors.goldGlow,
  '--luxury-shimmer-color': shimmerColor || luxuryCardTokens.colors.shimmerPrimary
})
