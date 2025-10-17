'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { X } from 'lucide-react';
import Link from 'next/link';
import type React from 'react';
import { useEffect, useRef, useState } from 'react';

import { ThemeToggle } from '@/components/ui/theme-toggle';
/**
 * 🧭 Navbar.tsx – versiunea finală completă
 *
 * Features:
 * - Desktop nav (logo, navlinks, dropdowns, user menu)
 * - Mobile burger menu + panel animat
 * - Glassmorphism, responsive, accesibil, sub 250 linii
 * - Enterprise-ready architecture
 */
// Import navigation from centralized config
import { navigation } from '@/config/site.config';
import { cn } from '@/lib/utils/cn';

import { Container } from './Container';
import { Logo } from './navbar/Logo';
import { NavLinks } from './navbar/NavLinks';
import { UserMenu } from './navbar/UserMenu';
import ServicesMenu from './ServicesMenu';
import ServicesMenuMobile from './ServicesMenuMobile';

// Use config instead of hardcoded values
const navItems = navigation.main;

export interface NavbarProps {
  readonly className?: string;
}

export default function Navbar({ className }: NavbarProps): React.JSX.Element {
  const [mobileOpen, setMobileOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);

  // close on outside click
  useEffect(() => {
    const close = (e: MouseEvent) => {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
        setMobileOpen(false);
      }
    };
    if (mobileOpen) document.addEventListener('mousedown', close);
    return () => document.removeEventListener('mousedown', close);
  }, [mobileOpen]);

  // close on escape
  useEffect(() => {
    const esc = (e: KeyboardEvent) => e.key === 'Escape' && setMobileOpen(false);
    if (mobileOpen) document.addEventListener('keydown', esc);
    return () => document.removeEventListener('keydown', esc);
  }, [mobileOpen]);

  return (
    <header
      className={cn(
        'sticky top-0 z-50 border-b border-white/10 bg-background/30 backdrop-blur-md',
        'transition-colors duration-300 ease-in-out',
        className,
      )}
    >
      <Container size="xl" className="overflow-visible">
        <div className="relative flex h-16 items-center">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Logo size="lg" />
          </div>

          {/* Desktop Nav */}
          <div className="absolute left-1/2 hidden -translate-x-1/2 md:flex">
            <div className="flex items-center gap-6">
              <NavLinks items={[{ href: '/', label: 'Home' }]} className="gap-0" />
              <ServicesMenu />
              <NavLinks items={navItems.slice(1)} className="gap-6" />
            </div>
          </div>

          {/* Desktop UserMenu + Theme Toggle */}
          <div className="ml-auto hidden items-center gap-4 md:flex">
            <ThemeToggle variant="minimal" size="sm" />
            <UserMenu />
          </div>

          {/* Mobile Burger */}
          <div className="ml-auto md:hidden">
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle mobile menu"
              className={cn(
                'rounded-md p-2 text-neutral-300 hover:text-brand-primary',
                'transition-colors focus:outline-none focus:ring-2 focus:ring-brand-primary/50',
              )}
            >
              {mobileOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </Container>

      {/* ── Mobile Panel ───────────────────────────────────────────── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            ref={panelRef}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className={cn(
              'border-t border-white/10 bg-background/90 shadow-xl backdrop-blur-xl md:hidden',
              'absolute left-0 top-16 z-40 w-full',
            )}
          >
            <nav className="flex flex-col space-y-2 p-4">
              {navItems.map(item => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className={cn(
                    'rounded-md px-3 py-2 text-sm font-medium transition-colors',
                    'text-neutral-200 hover:bg-brand-primary/10 hover:text-brand-primary',
                  )}
                >
                  {item.label}
                </Link>
              ))}

              {/* Services Accordion */}
              <div className="my-2 border-t border-white/10" />
              <ServicesMenuMobile />

              {/* User Actions (mobile simplified) */}
              <div className="mt-2 border-t border-white/10 pt-3">
                <UserMenu />
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
