/**
 * @deprecated This file has been removed as part of the config system migration.
 * All constants are now in:
 * - @/config/site.config.ts (navigation, footer, metadata)
 * - @/config/content.config.ts (page content, texts)
 * - @/config/theme.config.ts (design tokens, variants)
 */

// Re-export main configs for backward compatibility
export { aboutContent, homeContent } from '@/config/content.config';
export { footer, navigation, siteMetadata } from '@/config/site.config';
export { designTokens, themeConfig } from '@/config/theme.config';
