/**
 * 🛠️ LuxuryCard Helpers - Enterprise Utilities
 * Utility functions for LuxuryCard component system
 */

import { luxuryCardTokens } from '@/design-system/tokens/luxury-card';

/**
 * Generates CSS custom properties for dynamic theming
 *
 * @param glowColor - Custom glow color override
 * @param shimmerColor - Custom shimmer color override
 * @returns Object with CSS custom properties for dynamic styling
 *
 * @example
 * const props = generateCustomProperties('#CBB26A', '#E5D485')
 * // Returns: { '--luxury-glow-color': '#CBB26A', '--luxury-shimmer-color': '#E5D485' }
 */
export const generateCustomProperties = (
  glowColor?: string,
  shimmerColor?: string,
): Record<string, string> => {
  return {
    '--luxury-glow-color': glowColor || luxuryCardTokens.colors.goldGlow,
    '--luxury-shimmer-color': shimmerColor || luxuryCardTokens.colors.shimmerPrimary,
    '--luxury-hover-glow': glowColor || luxuryCardTokens.colors.hoverGlow,
  } as Record<string, string>;
};

/**
 * Checks if component is running in browser environment (SSR compatible)
 *
 * @returns True if running in browser, false in SSR
 */
export const isBrowser = (): boolean => {
  return typeof window !== 'undefined';
};

/**
 * Safely gets computed style property (SSR compatible)
 *
 * @param element - DOM element to get style from
 * @param property - CSS property name
 * @returns Style property value or empty string if not available
 */
export const safeGetComputedStyle = (element: Element | null, property: string): string => {
  if (!isBrowser() || !element) return '';

  try {
    return window.getComputedStyle(element).getPropertyValue(property);
  } catch {
    return '';
  }
};
