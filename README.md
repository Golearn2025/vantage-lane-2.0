# Vantage Lane 2.0 🚗✨

Modern luxury chauffeur booking platform built with Next.js 15 and cutting-edge technologies.

## 🚀 Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript 5.6+ (Strict Mode)
- **Styling:** Tailwind CSS + Framer Motion
- **UI Components:** Radix UI
- **Database:** Supabase (PostgreSQL)
- **Authentication:** Supabase Auth
- **Payments:** Stripe
- **Maps:** Google Maps API
- **Email:** React Email + Resend
- **Testing:** Vitest + Playwright
- **Linting:** ESLint + Prettier + Husky

## 📁 Project Structure

```
src/
├── app/          # Next.js App Router
├── components/   # Reusable UI components
├── design-system/# Design tokens & system
├── emails/       # Email templates  
├── hooks/        # Custom React hooks
├── lib/          # Utilities & configurations
├── providers/    # React context providers
├── server/       # Server-only code
└── types/        # TypeScript definitions
```

## 🛠️ Development

```bash
# Install dependencies
pnpm install

# Setup environment variables
cp .env.example .env.local

# Run development server
pnpm dev

# Type checking
pnpm typecheck

# Linting
pnpm lint

# Testing
pnpm test
pnpm test:e2e
```

## 📋 Environment Variables

Copy `.env.example` to `.env.local` and fill in your values:

- Supabase URL and keys
- Stripe keys and webhook secret
- Google Maps API key
- Resend API key
- Optional: OpenAI API key

## 🎨 Design System

The application uses a comprehensive design system with:

- **Brand Colors:** Gold-based palette (#CBB26A primary)
- **Tier System:** Bronze, Silver, Gold, Platinum, Elite
- **Typography:** Inter + Playfair Display
- **Components:** Radix UI + Custom design system

## 🚢 Deployment

The application is configured for deployment on Vercel with:

- Automatic deployments from main branch
- Environment variables management
- Analytics and monitoring
- Performance optimization

## 📝 License

Private - Vantage Lane Ltd.
