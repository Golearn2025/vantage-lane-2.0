'use client';

import type React from 'react';

import { cn } from '@/lib/utils/cn';

import Footer from './Footer';
import Navbar from './Navbar';

/**
 * 🏗️ Main Layout component for Vantage Lane 2.0
 *
 * Features:
 * - Navbar + Footer integration
 * - Flexible main content area
 * - SEO-friendly structure
 * - Accessible landmarks
 * - Theme-aware styling
 * - Zero layout shift
 * - TypeScript strict
 *
 * @example
 * <Layout>
 *   <HomePage />
 * </Layout>
 *
 * @example
 * <Layout hideNavbar hideFooter className="min-h-screen bg-black">
 *   <AuthPage />
 * </Layout>
 */

export interface LayoutProps {
  /** Main content */
  readonly children: React.ReactNode;
  /** Hide navigation bar */
  readonly hideNavbar?: boolean;
  /** Hide footer */
  readonly hideFooter?: boolean;
  /** Custom main content styling */
  readonly className?: string;
  /** Main content container styling */
  readonly containerClassName?: string;
  /** Enable full height layout */
  readonly fullHeight?: boolean;
  /** Page title for SEO */
  readonly pageTitle?: string;
}

/**
 * 🎨 Main application layout wrapper
 * Provides consistent structure with navbar, main, and footer
 */
export default function Layout({
  children,
  hideNavbar = false,
  hideFooter = false,
  className,
  containerClassName,
  fullHeight = false,
  pageTitle,
}: LayoutProps): React.JSX.Element {
  return (
    <div
      className={cn(
        'flex flex-col',
        fullHeight && 'min-h-screen',
        'transition-colors duration-300 ease-in-out',
      )}
    >
      {/* SEO Title */}
      {pageTitle && <title>{pageTitle} | Vantage Lane</title>}

      {/* Navigation */}
      {!hideNavbar && <Navbar />}

      {/* Main Content Area */}
      <main
        className={cn(
          'flex-1',
          fullHeight && !hideNavbar && !hideFooter && 'flex flex-col',
          containerClassName,
        )}
        role="main"
        aria-label="Main content"
      >
        <div
          className={cn(
            fullHeight && !hideNavbar && !hideFooter && 'flex flex-1 flex-col',
            className,
          )}
        >
          {children}
        </div>
      </main>

      {/* Footer */}
      {!hideFooter && <Footer />}
    </div>
  );
}
