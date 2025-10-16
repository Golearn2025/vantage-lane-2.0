'use client'

import { Moon, Sun, Monitor } from 'lucide-react'
import { useTheme } from '@/providers/theme-provider'
import { cn } from '@/lib/utils/cn'

// Tipare mai stricte cu as const
const variants = ['default', 'minimal', 'dropdown'] as const
const sizes = ['sm', 'md', 'lg'] as const

type Variant = typeof variants[number]
type Size = typeof sizes[number]

interface ThemeToggleProps {
  variant?: Variant
  size?: Size
  className?: string | undefined
}

export function ThemeToggle({ 
  variant = 'default', 
  size = 'md', 
  className 
}: ThemeToggleProps) {
  const { theme, setTheme } = useTheme()

  if (variant === 'minimal') {
    const sizeClasses = {
      sm: 'h-8 w-8',
      md: 'h-10 w-10',
      lg: 'h-12 w-12'
    }

    const iconSizes = {
      sm: 'h-3 w-3',
      md: 'h-4 w-4', 
      lg: 'h-5 w-5'
    }

    return (
      <button
        onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
        className={cn(
          'relative rounded-lg border border-neutral-200 bg-white p-2 transition-colors hover:bg-muted/80 dark:border-neutral-800 dark:bg-neutral-950 dark:hover:bg-muted/20',
          sizeClasses[size],
          className
        )}
        aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}
      >
        <Sun className={cn('absolute inset-0 m-auto rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0', iconSizes[size])} />
        <Moon className={cn('absolute inset-0 m-auto rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100', iconSizes[size])} />
      </button>
    )
  }

  if (variant === 'dropdown') {
    // Mapare iconuri pentru evitarea redundanței
    const icons = { light: Sun, dark: Moon, system: Monitor } as const
    
    return (
      <div className={cn('flex flex-col space-y-1', className)}>
        <div className="text-sm font-medium text-neutral-300 mb-2">Theme</div>
        {(['light', 'dark', 'system'] as const).map((themeOption) => {
          const Icon = icons[themeOption]
          return (
            <button
              key={themeOption}
              onClick={() => setTheme(themeOption)}
              className={cn(
                'flex items-center px-3 py-2 rounded-lg text-sm transition-colors',
                'hover:bg-muted/80',
                theme === themeOption && 'bg-brand-primary/20 text-brand-primary'
              )}
            >
              <Icon className="h-4 w-4 mr-2" />
              <span className="capitalize">{themeOption}</span>
              {theme === themeOption && (
                <div className="ml-auto h-2 w-2 bg-brand-primary rounded-full" />
              )}
            </button>
          )
        })}
      </div>
    )
  }

  // Default variant - three buttons
  return (
    <div 
      className={cn(
        'inline-flex items-center rounded-lg bg-neutral-800 p-1',
        className
      )}
      role="tablist"
      aria-label="Theme selection"
    >
      {[
        { value: 'light', icon: Sun, label: 'Light' },
        { value: 'dark', icon: Moon, label: 'Dark' },
        { value: 'system', icon: Monitor, label: 'System' }
      ].map(({ value, icon: Icon, label }) => (
        <button
          key={value}
          onClick={() => setTheme(value as 'light' | 'dark' | 'system')}
          className={cn(
            'inline-flex items-center justify-center rounded-md px-3 py-2 text-sm font-medium transition-colors',
            'focus:outline-none focus:ring-2 focus:ring-brand-primary/50',
            {
              'h-8 px-2': size === 'sm',
              'h-9 px-3': size === 'md', 
              'h-10 px-4': size === 'lg',
            },
            theme === value
              ? 'bg-brand-primary text-white shadow-sm'
              : 'text-neutral-400 hover:text-neutral-200 hover:bg-neutral-700'
          )}
          role="tab"
          aria-selected={theme === value}
          aria-label={`Switch to ${label.toLowerCase()} theme`}
        >
          <Icon className="h-4 w-4" />
          <span className="sr-only">{label}</span>
        </button>
      ))}
    </div>
  )
}

/**
 * Compact theme toggle for space-constrained areas
 */
export function CompactThemeToggle({ className }: { className?: string }) {
  return (
    <ThemeToggle 
      variant="minimal" 
      size="sm" 
      className={className}
    />
  )
}

/**
 * Theme selector for settings pages
 */
export function ThemeSelector({ className }: { className?: string }) {
  return (
    <ThemeToggle 
      variant="dropdown" 
      className={className}
    />
  )
}
