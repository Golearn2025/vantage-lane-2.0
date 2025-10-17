/**
 * 🎴 LuxuryCard Component - Vantage Lane 2.0
 * Reusable luxury card with shimmer effects, identical to original design
 */

import { forwardRef } from 'react'
import { cn } from '@/lib/utils'
import { luxuryCardStyles, generateCustomProperties } from './LuxuryCard.variants'
import { luxuryCardTokens } from '@/design-system/tokens/luxury-card'
import type { 
  LuxuryCardProps, 
  LuxuryCardComponent,
  LuxuryCardVariant,
  LuxuryCardSize,
  LuxuryCardHover 
} from './LuxuryCard.types'

/**
 * Polymorphic LuxuryCard component with shimmer sweep effect
 * 
 * @example
 * // Simple API
 * <LuxuryCard 
 *   variant="shimmer" 
 *   icon={<CarFront />}
 *   title="Premium Fleet" 
 *   description="Luxury vehicles available 24/7"
 *   href="/fleet" 
 * />
 * 
 * // Flexible API
 * <LuxuryCard variant="shimmer" as={Link} href="/fleet">
 *   <div className="custom-layout">
 *     <CarFront className="w-20 h-20" />
 *     <h3>Custom Title</h3>
 *   </div>
 * </LuxuryCard>
 */
const LuxuryCard = forwardRef<HTMLElement, LuxuryCardProps>(({
  // Component behavior
  as: Component = 'div',
  variant = 'shimmer',
  size = 'md', 
  hover = 'shimmer',
  disabled = false,
  
  // Customization
  glowColor,
  shimmerColor,
  className,
  
  // Content (simple API)
  icon,
  title,
  description,
  footer,
  
  // Flexible API
  children,
  
  // Rest props (for polymorphic behavior)
  ...rest
}, ref) => {
  // Generate CSS custom properties for dynamic colors
  const customProps = generateCustomProperties(glowColor, shimmerColor)
  
  // Build classes
  const cardClasses = cn(
    luxuryCardStyles.base,
    luxuryCardStyles.variants[variant],
    luxuryCardStyles.sizes[size],
    hover !== 'none' && luxuryCardStyles.hover[hover].container,
    disabled && 'opacity-50 cursor-not-allowed pointer-events-none',
    className
  )
  
  // Render shimmer overlay if needed
  const renderShimmerOverlay = () => {
    if (hover === 'none' || disabled) return null
    
    const hoverConfig = luxuryCardStyles.hover[hover]
    
    return (
      <>
        {/* Golden glow overlay */}
        {hoverConfig.overlay && (
          <div className={hoverConfig.overlay} />
        )}
        
        {/* Shimmer sweep effect */}
        {hoverConfig.shimmer && (
          <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className={hoverConfig.shimmer} />
          </div>
        )}
      </>
    )
  }
  
  // Render icon with hover effects
  const renderIcon = () => {
    if (!icon) return null
    
    return (
      <div className="mb-6 group-hover:scale-110 transition-transform duration-300 flex justify-center">
        <div className="relative group-hover:scale-105 transition-all duration-300 overflow-visible">
          {typeof icon === 'string' ? (
            <span className="text-4xl">{icon}</span>
          ) : (
            <div 
              className="w-20 h-20 text-[#CBB26A] transition-all duration-300 group-hover:text-[#E5D485] group-hover:drop-shadow-[0_0_12px_rgba(203,178,106,0.6)] [&>svg]:w-full [&>svg]:h-full [&>svg]:stroke-[1.2]"
              style={{ 
                filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.3))',
                color: glowColor || luxuryCardTokens.colors.goldGlow
              }}
            >
              {icon}
            </div>
          )}
          
          {/* Subtle glow effect pe iconițe (exact ca în original) */}
          {hover === 'shimmer' && !disabled && icon && (
            <div 
              className="absolute inset-0 rounded-full bg-[#CBB26A]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl"
              style={{ backgroundColor: `${glowColor || luxuryCardTokens.colors.goldGlow}1A` }}
            ></div>
          )}
          
          {/* Icon shimmer effect (exact ca în original) */}
          {hover === 'shimmer' && !disabled && (
            <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div 
                className="absolute inset-0 bg-gradient-to-r from-transparent via-[#E5D485]/40 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out"
                style={{
                  width: '200%',
                  height: '100%',
                  backgroundImage: `linear-gradient(90deg, transparent, ${shimmerColor || luxuryCardTokens.colors.shimmerPrimary}66, transparent)`
                }}
              />
            </div>
          )}
        </div>
      </div>
    )
  }
  
  // Render content
  const renderContent = () => {
    // If children provided, use flexible API
    if (children) {
      return children
    }
    
    // Otherwise use simple props-based API
    return (
      <>
        {renderIcon()}
        {title && (
          <h3 className="text-xl font-semibold mb-3 text-white dark:text-white">
            {title}
          </h3>
        )}
        {description && (
          <p className="text-neutral-300 dark:text-neutral-400 leading-relaxed">
            {description}
          </p>
        )}
        {footer && (
          <div className="mt-4 pt-4 border-t border-white/10">
            {footer}
          </div>
        )}
      </>
    )
  }
  
  return (
    <Component
      ref={ref}
      className={cardClasses}
      style={customProps}
      {...rest}
    >
      {/* Hover overlays */}
      {renderShimmerOverlay()}
      
      {/* Card content */}
      <div className="relative z-10">
        {renderContent()}
      </div>
    </Component>
  )
}) as LuxuryCardComponent

LuxuryCard.displayName = 'LuxuryCard'

export { LuxuryCard }
export type { LuxuryCardProps, LuxuryCardVariant, LuxuryCardSize, LuxuryCardHover }
