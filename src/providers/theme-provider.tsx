'use client'

import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'

type Theme = 'dark' | 'light' | 'system'

interface ThemeProviderProps {
  children: ReactNode
  defaultTheme?: Theme
  storageKey?: string
  attribute?: string
  enableSystem?: boolean
  disableTransitionOnChange?: boolean
}

interface ThemeContextValue {
  theme: Theme
  setTheme: (theme: Theme) => void
  systemTheme: 'dark' | 'light' | undefined
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined)

export function ThemeProvider({
  children,
  defaultTheme = 'system',
  storageKey = 'vantage-lane-theme',
  attribute = 'class',
  enableSystem = true,
  disableTransitionOnChange = false,
}: ThemeProviderProps) {
  const [theme, setThemeState] = useState<Theme>(defaultTheme)
  const [systemTheme, setSystemTheme] = useState<'dark' | 'light' | undefined>()

  useEffect(() => {
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
    const root = window.document.documentElement

    // Disable transitions temporarily if requested
    if (disableTransitionOnChange) {
      root.style.transition = 'none'
    }

    // Remove old theme classes
    root.classList.remove('light', 'dark')

    // Determine actual theme to apply
    const actualTheme = theme === 'system' 
      ? systemTheme || 'dark' // Default to dark for Vantage Lane
      : theme

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
  }, [theme, systemTheme, attribute, disableTransitionOnChange])

  const setTheme = (newTheme: Theme) => {
    localStorage.setItem(storageKey, newTheme)
    setThemeState(newTheme)
  }

  const value: ThemeContextValue = {
    theme,
    setTheme,
    systemTheme,
  }

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  )
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
  const { theme, systemTheme } = useTheme()
  
  return theme === 'system' ? systemTheme || 'dark' : theme
}
