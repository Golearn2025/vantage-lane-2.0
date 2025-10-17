/**
 * 🎴 Luxury Card Design Tokens - Vantage Lane 2.0
 * Extracted from original component, no hardcoded values
 */

export const luxuryCardTokens = {
  colors: {
    goldGlow: '#CBB26A',
    shimmerPrimary: '#E5D485',
    hoverGlow: '#CBB26A',
  },
  effects: {
    shimmer: {
      gradient: 'linear-gradient(90deg, transparent, rgba(229, 212, 133, 0.2), transparent)',
      skew: '-12deg',
      width: '200%',
      duration: '1200ms',
      easing: 'ease-out',
    },
    glow: {
      gradient: 'linear-gradient(135deg, rgba(203, 178, 106, 0.05), transparent)',
      duration: '300ms',
      easing: 'ease-in-out',
    },
    hover: {
      scale: '1.05',
      duration: '300ms',
      easing: 'ease-in-out',
    },
  },
  shadows: {
    base: '0 4px 6px -1px rgba(0, 0, 0, 0.3), 0 2px 4px -1px rgba(0, 0, 0, 0.2)',
    hover: '0 20px 25px -5px rgba(0, 0, 0, 0.4), 0 10px 10px -5px rgba(0, 0, 0, 0.2), 0 0 30px rgba(203, 178, 106, 0.15)',
  },
} as const

export default luxuryCardTokens
