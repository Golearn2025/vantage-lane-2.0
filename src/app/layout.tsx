import './globals.css';

import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

import Layout from '@/components/layout/Layout';
import { siteMetadata } from '@/config/site.config';
import { cn } from '@/lib/utils/cn';
import { ThemeProvider } from '@/providers/theme-provider';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

// Use config instead of hardcoded values
export const metadata: Metadata = {
  title: siteMetadata.title,
  description: siteMetadata.description,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                const stored = localStorage.getItem('vantage-lane-theme');
                const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                const theme = stored === 'system' || !stored ? (prefersDark ? 'dark' : 'light') : stored;
                document.documentElement.classList.add(theme);
              })();
            `,
          }}
        />
      </head>
      <body
        className={cn(
          inter.className,
          'min-h-screen bg-neutral-950 text-neutral-100 antialiased',
          'selection:bg-brand-primary/20 selection:text-brand-primary',
        )}
      >
        <ThemeProvider attribute="class" defaultTheme="dark">
          <Layout>{children}</Layout>
        </ThemeProvider>
      </body>
    </html>
  );
}
