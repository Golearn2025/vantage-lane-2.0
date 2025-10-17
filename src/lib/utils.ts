/**
 * 🛠️ Utility Functions - Vantage Lane 2.0
 * Common utility functions used across the application
 */

import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Utility function to merge Tailwind CSS classes with proper conflict resolution
 * Combines clsx for conditional classes with tailwind-merge for conflict resolution
 *
 * @example
 * cn('px-2 py-1', condition && 'bg-blue-500', { 'text-white': active })
 * cn('px-2', 'px-4') // Result: 'px-4' (conflict resolved)
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Utility function to format currency values
 * @param value - Numeric value to format
 * @param currency - Currency code (default: 'GBP')
 */
export function formatCurrency(value: number, currency: string = 'GBP'): string {
  return new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: currency,
  }).format(value);
}

/**
 * Utility function to format dates in a readable format
 * @param date - Date to format
 * @param options - Intl.DateTimeFormatOptions
 */
export function formatDate(date: Date, options?: Intl.DateTimeFormatOptions): string {
  return new Intl.DateTimeFormat('en-GB', options).format(date);
}

/**
 * Utility function to generate a random ID
 * @param length - Length of the ID (default: 8)
 */
export function generateId(length: number = 8): string {
  return Math.random()
    .toString(36)
    .substring(2, 2 + length);
}

/**
 * Utility function to debounce function calls
 * @param fn - Function to debounce
 * @param delay - Delay in milliseconds
 */
export function debounce<T extends (...args: unknown[]) => unknown>(
  fn: T,
  delay: number,
): (...args: Parameters<T>) => void {
  let timeoutId: ReturnType<typeof setTimeout>;
  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn(...args), delay);
  };
}

/**
 * Utility function to capitalize first letter of a string
 * @param str - String to capitalize
 */
export function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

/**
 * Utility function to safely parse JSON
 * @param str - JSON string to parse
 * @param fallback - Fallback value if parsing fails
 */
export function safeJsonParse<T>(str: string, fallback: T): T {
  try {
    return JSON.parse(str);
  } catch {
    return fallback;
  }
}
