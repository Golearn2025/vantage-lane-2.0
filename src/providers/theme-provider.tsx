'use client'

import { createContext, type ReactNode, useContext, useEffect, useState } from 'react'

type Theme = 'dark' | 'light' | 'system'

interface ThemeProviderProps {
  children: ReactNode
  defaultTheme?: Theme
  storageKey?: string
  attribute?: string
  disableTransitionOnChange?: boolean
}

interface ThemeContextValue {
  currentTheme: Theme
  setTheme: (theme: Theme) => void
  systemTheme: 'dark' | 'light' | undefined
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined)

export function ThemeProvider({
  children,
  attribute = 'class',
  defaultTheme = 'system',
  disableTransitionOnChange = false,
  storageKey = 'vantage-lane-theme',
}: ThemeProviderProps) {
  const [themeState, setThemeState] = useState<Theme>(defaultTheme)
  const [systemTheme, setSystemTheme] = useState<'dark' | 'light' | undefined>()

  useEffect(() => {
    // Prevent hydration mismatch by ensuring we're in browser
    if (typeof window === 'undefined') return

    // Get theme from localStorage or use default
    const stored = localStorage.getItem(storageKey) as Theme | null
    if (stored) {
      setThemeState(stored)
    }

    // Listen for system theme changes
    const media = window.matchMedia('(prefers-color-scheme: dark)')

    const updateSystemTheme = () => {
      setSystemTheme(media.matches ? 'dark' : 'light')
    }

    updateSystemTheme()
    media.addEventListener('change', updateSystemTheme)

    return () => media.removeEventListener('change', updateSystemTheme)
  }, [storageKey])

  useEffect(() => {
    // Prevent hydration mismatch by ensuring DOM is ready
    if (typeof window === 'undefined') return

    const root = window.document.documentElement

    // Disable transitions temporarily if requested
    if (disableTransitionOnChange) {
      root.style.transition = 'none'
    }

    // Remove old theme classes
    root.classList.remove('light', 'dark')

    // Determine actual theme to apply
    const actualTheme =
      themeState === 'system'
        ? systemTheme || 'dark' // Default to dark for Vantage Lane
        : themeState

    // Apply theme
    if (attribute === 'class') {
      root.classList.add(actualTheme)
    } else {
      root.setAttribute(attribute, actualTheme)
    }

    // Re-enable transitions
    if (disableTransitionOnChange) {
      setTimeout(() => {
        root.style.transition = ''
      }, 1)
    }
  }, [themeState, systemTheme, attribute, disableTransitionOnChange])

  const setTheme = (newTheme: Theme) => {
    localStorage.setItem(storageKey, newTheme)
    setThemeState(newTheme)
  }

  const value: ThemeContextValue = {
    currentTheme: themeState,
    setTheme,
    systemTheme,
  }

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

export function useTheme() {
  const context = useContext(ThemeContext)

  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }

  return context
}

/**
 * Hook to get the resolved theme (never 'system')
 */
export function useResolvedTheme() {
  const { currentTheme, systemTheme } = useTheme()

  return currentTheme === 'system' ? systemTheme || 'dark' : currentTheme
}
