# 🏗️ VANTAGE LANE 2.0 – FRONTEND ARCHITECTURE GUIDE

> This document describes the **frontend architecture** of Vantage Lane 2.0 —  
> a modular Next.js + Supabase + Stripe + Tailwind system built for scalability, maintainability, and developer clarity.

## 📊 PROJECT STRUCTURE OVERVIEW

```
vantage-lane-2.0/
├── 📁 src/
│   ├── 🎨 components/          # UI Library & Feature Components
│   │   ├── ui/                 # Atomic components (Button, Card, Input)
│   │   ├── shared/             # Reusable UI blocks with light logic
│   │   ├── features/           # Domain-based modular organization
│   │   │   ├── booking/        # Complete booking workflow
│   │   │   ├── account/        # User account management
│   │   │   ├── auth/           # Authentication flows
│   │   │   ├── payments/       # Payment processing
│   │   │   ├── search/         # Search functionality
│   │   │   ├── members/        # Membership features
│   │   │   ├── corporate/      # Corporate clients
│   │   │   └── landing/        # Landing page components
│   │   ├── layout/             # Structural components (Navbar, Footer)
│   │   ├── forms/              # Form-specific components
│   │   ├── providers/          # React Context providers
│   │   └── mobile/             # Mobile-specific components
│   │
│   ├── 🛠️ lib/                 # Pure logic & utilities
│   │   ├── utils/              # Helper functions (cn, formatters, validators)
│   │   ├── hooks/              # Custom React hooks
│   │   ├── db/                 # Database utilities
│   │   ├── monitoring/         # Sentry, logging
│   │   └── rate-limit.ts       # API rate limiting
│   │
│   ├── 📝 types/               # TypeScript type definitions
│   │   ├── booking.ts          # Booking-related types
│   │   ├── user.ts             # User & authentication types
│   │   ├── invoice.ts          # Payment & billing types
│   │   └── global.ts           # Global type definitions
│   │
│   ├── 🎨 styles/              # Global CSS & animations
│   │   ├── theme.css           # Theme variables
│   │   ├── animations.css      # Custom animations
│   │   └── variables.css       # CSS custom properties
│   │
│   ├── 📋 constants/           # Business constants
│   │   ├── app-config.ts       # App configuration
│   │   ├── user-tiers.ts       # User tier definitions
│   │   ├── services.ts         # Vehicle services
│   │   └── messages.ts         # UI messages
│   │
│   ├── 🔗 providers/           # React Context providers
│   │   └── theme-provider.tsx  # Theme management
│   │
│   ├── 🚀 server/              # Server-side logic
│   │   ├── actions/            # Server actions
│   │   ├── services/           # Business logic
│   │   ├── middleware/         # Request middleware
│   │   └── utils/              # Server utilities
│   │
│   └── 📱 app/                 # Next.js App Router
│       ├── api/                # API routes
│       ├── layout.tsx          # Root layout
│       └── page.tsx            # Homepage
│
├── 📚 docs/                    # Project documentation
├── 🔧 scripts/                # Build & utility scripts
└── 🏗️ public/                 # Static assets
```

## 🎯 DESIGN PRINCIPLES

### **1. Atomic Design System**
- **ui/**: Pure atomic components (no business logic)
- **shared/**: Composed components with minimal logic
- **features/**: Complete business modules

### **2. Domain-Driven Architecture**
- Each **feature** is self-contained and modular
- Clear boundaries between domains (booking, auth, payments)
- Easy to extract or refactor individual features

### **3. Separation of Concerns**
- **Components**: Only UI rendering
- **Lib**: Pure logic and utilities
- **Server**: Business logic and API handling
- **Types**: Centralized type definitions

### **4. Scalability First**
- Modular structure supports team collaboration
- Clear import/export patterns
- Easy to add new features without conflicts

## 🔄 DATA FLOW

```
User Interaction → Component → Hook → Service → API → Database
                     ↓           ↓        ↓       ↓
                    UI         Logic   Server  Storage
```

## ✏️ NAMING CONVENTIONS

- **Components** → **PascalCase** (`BookingCard.tsx`, `ThemeToggle.tsx`)
- **Hooks** → **camelCase** (`useBookingFlow.ts`)
- **Utility files** → **kebab-case** (`format-date.ts`)
- **TypeScript types** → **PascalCase + Type suffix** (`UserType`, `BookingFormType`)
- **Constants** → **SCREAMING_SNAKE_CASE** (`MAX_RIDES_PER_TIER`)

## 📦 IMPORT PATTERNS

| Purpose | Example |
|---------|---------|
| UI Components | `import { Button } from "@/components/ui"` |
| Shared Components | `import { PricingCard } from "@/components/shared"` |
| Feature Modules | `import { BookingWizard } from "@/components/features/booking"` |
| Utils | `import { cn } from "@/lib/utils/cn"` |
| Hooks | `import { useDebounce } from "@/lib/hooks/useDebounce"` |
| Types | `import { BookingType } from "@/types/booking"` |

## 📚 RECOMMENDED DOCS STRUCTURE

```
docs/
├── ARCHITECTURE_FRONTEND.md    # This file
├── ARCHITECTURE_BACKEND.md     # (Future) API endpoints & services
├── DEVELOPMENT_RULES.md        # Coding standards & rules
├── COMPONENT_GUIDE.md          # UI & Atomic Design rules
├── FEATURE_MODULES.md          # How each feature works
└── API_OVERVIEW.md             # (Future) API documentation
```

## 📖 RELATED DOCUMENTATION

- `DEVELOPMENT_RULES.md` - Coding standards and rules
- `src/components/README.md` - Component guidelines
- `src/features/README.md` - Feature module structure
- `docs/ARCHITECTURE.md` - Technical architecture details
