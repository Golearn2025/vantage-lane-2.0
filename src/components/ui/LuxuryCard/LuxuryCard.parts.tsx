/**
 * 🧩 LuxuryCard Parts - Enterprise Subcomponents
 * Modular subcomponents for maintainable architecture
 */

import type { ReactNode } from 'react';

import { luxuryCardTokens } from '@/design-system/tokens/luxury-card';

import type { LuxuryCardHover } from './LuxuryCard.types';
import { luxuryCardStyles } from './LuxuryCard.variants';

interface IconRenderProps {
  icon?: ReactNode;
  glowColor?: string | undefined;
  shimmerColor?: string | undefined;
  hover: LuxuryCardHover;
  disabled: boolean;
}

interface OverlayRenderProps {
  hover: LuxuryCardHover;
  disabled: boolean;
}

interface ContentRenderProps {
  children?: ReactNode;
  icon?: ReactNode;
  title?: string | undefined;
  description?: string | undefined;
  footer?: ReactNode;
  glowColor?: string | undefined;
  shimmerColor?: string | undefined;
  hover: LuxuryCardHover;
  disabled: boolean;
}

/**
 * Renders icon with hover effects and shimmer animation
 *
 * @param props - Icon rendering configuration
 * @returns JSX for icon with all effects applied
 */
export const renderIcon = ({
  icon,
  glowColor,
  shimmerColor,
  hover,
  disabled,
}: IconRenderProps): ReactNode => {
  if (!icon) return null;

  return (
    <div className="mb-6 flex justify-center transition-transform duration-300 group-hover:scale-110">
      <div className="relative overflow-visible transition-all duration-300 group-hover:scale-105">
        {typeof icon === 'string' ? (
          <span className="text-4xl">{icon}</span>
        ) : (
          <div
            className="h-20 w-20 text-[#CBB26A] transition-all duration-300 group-hover:text-[#E5D485] group-hover:drop-shadow-[0_0_12px_rgba(203,178,106,0.6)] [&>svg]:h-full [&>svg]:w-full [&>svg]:stroke-[1.2]"
            style={{
              filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.3))',
              color: glowColor || luxuryCardTokens.colors.goldGlow,
            }}
          >
            {icon}
          </div>
        )}

        {/* Subtle glow effect on icons */}
        {hover === 'shimmer' && !disabled && icon && (
          <div
            className="absolute inset-0 rounded-full bg-[#CBB26A]/10 opacity-0 blur-xl transition-opacity duration-300 group-hover:opacity-100"
            style={{
              backgroundColor: `${glowColor || luxuryCardTokens.colors.goldGlow}1A`,
            }}
          />
        )}

        {/* Icon shimmer sweep effect */}
        {hover === 'shimmer' && !disabled && (
          <div className="pointer-events-none absolute inset-0 overflow-hidden opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            <div
              className="absolute inset-0 -translate-x-full -skew-x-12 transform bg-gradient-to-r from-transparent via-[#E5D485]/40 to-transparent transition-transform duration-1000 ease-out group-hover:translate-x-full"
              style={{
                width: '200%',
                height: '100%',
                backgroundImage: `linear-gradient(90deg, transparent, ${shimmerColor || luxuryCardTokens.colors.shimmerPrimary}66, transparent)`,
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
};

/**
 * Renders hover overlay effects (glow + shimmer sweep)
 *
 * @param props - Overlay rendering configuration
 * @returns JSX for overlay effects or null if disabled
 */
export const renderShimmerOverlay = ({ hover, disabled }: OverlayRenderProps): ReactNode => {
  if (hover === 'none' || disabled) return null;

  const hoverConfig = luxuryCardStyles.hover[hover];

  return (
    <>
      {/* Golden glow overlay */}
      {hoverConfig.overlay && <div className={hoverConfig.overlay} />}

      {/* Shimmer sweep effect */}
      {hoverConfig.shimmer && (
        <div className="pointer-events-none absolute inset-0 overflow-hidden opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <div className={hoverConfig.shimmer} />
        </div>
      )}
    </>
  );
};

/**
 * Renders card content using either simple API (props) or flexible API (children)
 *
 * @param props - Content rendering configuration
 * @returns JSX for card content
 */
export const renderContent = ({
  children,
  icon,
  title,
  description,
  footer,
  glowColor,
  shimmerColor,
  hover,
  disabled,
}: ContentRenderProps): ReactNode => {
  // Flexible API: use children if provided
  if (children) {
    return children;
  }

  // Simple API: render from props
  return (
    <>
      {renderIcon({ icon, glowColor, shimmerColor, hover, disabled })}
      {title && <h3 className="mb-3 text-xl font-semibold text-neutral-900 dark:text-white">{title}</h3>}
      {description && (
        <p className="leading-relaxed text-neutral-600 dark:text-neutral-300">{description}</p>
      )}
      {footer && <div className="mt-4 border-t border-neutral-200 dark:border-white/10 pt-4">{footer}</div>}
    </>
  );
};
