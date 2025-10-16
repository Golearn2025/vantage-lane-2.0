# 📁 Vantage Lane 2.0 - File Structure

## 🏗️ **Complete Project Architecture**

```
vantage-lane-2.0/
├── 📁 docs/                            # 📚 Project documentation
│   ├── README.md                       # Documentation hub
│   ├── PROJECT_OVERVIEW.md             # Business & technical overview
│   ├── FILE_STRUCTURE.md               # This file
│   ├── DEVELOPMENT_GUIDELINES.md       # Coding standards
│   ├── DESIGN_SYSTEM_GUIDE.md          # UI/UX guidelines
│   ├── AI_RULES.md                     # AI development rules
│   └── DEPENDENCIES.md                 # Package explanations
│
├── 📁 sql/                             # 🗃️ Database schemas
│   └── audit_logs.sql                  # Audit logging table
│
├── 📁 src/                             # 💻 Application source code
│   ├── 📁 app/                         # 🎯 Next.js 15 App Router
│   │   ├── 📁 (auth)/                  # Route group: Authentication
│   │   │   ├── login/
│   │   │   │   └── page.tsx
│   │   │   ├── register/
│   │   │   │   └── page.tsx
│   │   │   ├── reset-password/
│   │   │   │   └── page.tsx
│   │   │   └── layout.tsx              # Auth layout
│   │   │
│   │   ├── 📁 (main)/                  # Route group: Main application
│   │   │   ├── dashboard/
│   │   │   │   └── page.tsx
│   │   │   ├── booking/
│   │   │   │   ├── page.tsx
│   │   │   │   └── [id]/
│   │   │   │       └── page.tsx
│   │   │   ├── profile/
│   │   │   │   ├── page.tsx
│   │   │   │   └── settings/
│   │   │   │       └── page.tsx
│   │   │   └── layout.tsx              # Main app layout
│   │   │
│   │   ├── 📁 api/                     # 🔌 API Routes
│   │   │   ├── auth/
│   │   │   │   ├── login/route.ts
│   │   │   │   ├── logout/route.ts
│   │   │   │   └── register/route.ts
│   │   │   ├── bookings/
│   │   │   │   ├── route.ts
│   │   │   │   └── [id]/route.ts
│   │   │   ├── payments/
│   │   │   │   ├── route.ts
│   │   │   │   └── webhook/route.ts
│   │   │   └── webhooks/
│   │   │       └── stripe/route.ts
│   │   │
│   │   ├── globals.css                 # Global styles
│   │   ├── layout.tsx                  # Root layout
│   │   ├── page.tsx                    # Homepage
│   │   ├── loading.tsx                 # Global loading UI
│   │   ├── error.tsx                   # Global error UI
│   │   └── not-found.tsx               # 404 page
│   │
│   ├── 📁 components/                  # 🧩 React components
│   │   ├── 📁 ui/                      # Base UI components (shadcn/ui style)
│   │   │   ├── button.tsx              # Button component
│   │   │   ├── card.tsx                # Card component
│   │   │   ├── input.tsx               # Input component
│   │   │   ├── dialog.tsx              # Modal component
│   │   │   ├── dropdown.tsx            # Dropdown component
│   │   │   ├── tabs.tsx                # Tabs component
│   │   │   └── index.ts                # Barrel exports
│   │   │
│   │   ├── 📁 layout/                  # Layout components
│   │   │   ├── header.tsx              # Site header
│   │   │   ├── footer.tsx              # Site footer
│   │   │   ├── navbar.tsx              # Navigation bar
│   │   │   ├── sidebar.tsx             # Dashboard sidebar
│   │   │   └── breadcrumbs.tsx         # Breadcrumb navigation
│   │   │
│   │   ├── 📁 forms/                   # Form components
│   │   │   ├── login-form.tsx          # Login form
│   │   │   ├── register-form.tsx       # Registration form
│   │   │   ├── booking-form.tsx        # Booking creation form
│   │   │   ├── profile-form.tsx        # Profile update form
│   │   │   └── payment-form.tsx        # Payment form
│   │   │
│   │   └── 📁 features/                # Feature-specific components
│   │       ├── 📁 auth/                # Authentication components
│   │       │   ├── auth-guard.tsx
│   │       │   ├── login-button.tsx
│   │       │   └── user-menu.tsx
│   │       ├── 📁 booking/             # Booking components
│   │       │   ├── booking-card.tsx
│   │       │   ├── fleet-selector.tsx
│   │       │   └── route-map.tsx
│   │       ├── 📁 dashboard/           # Dashboard components
│   │       │   ├── stats-cards.tsx
│   │       │   ├── recent-bookings.tsx
│   │       │   └── activity-feed.tsx
│   │       └── 📁 payments/            # Payment components
│   │           ├── payment-methods.tsx
│   │           ├── invoice-list.tsx
│   │           └── pricing-display.tsx
│   │
│   ├── 📁 design-system/               # 🎨 Design system
│   │   ├── 📁 tokens/                  # Design tokens
│   │   │   ├── colors.ts               # Brand color palette
│   │   │   ├── typography.ts           # Font system
│   │   │   ├── spacing.ts              # Spacing scale
│   │   │   ├── shadows.ts              # Box shadows
│   │   │   ├── borders.ts              # Border styles
│   │   │   └── index.ts                # Unified exports
│   │   │
│   │   └── 📁 components/              # Design system components
│   │       ├── 📁 Button/              # Button component system
│   │       │   ├── Button.tsx
│   │       │   ├── Button.stories.tsx
│   │       │   └── Button.test.tsx
│   │       ├── 📁 Card/                # Card component system
│   │       │   ├── Card.tsx
│   │       │   ├── Card.stories.tsx
│   │       │   └── Card.test.tsx
│   │       └── 📁 Input/               # Input component system
│   │           ├── Input.tsx
│   │           ├── Input.stories.tsx
│   │           └── Input.test.tsx
│   │
│   ├── 📁 emails/                      # 📧 Email templates (React Email)
│   │   ├── booking-confirmation.tsx    # Booking confirmation email
│   │   ├── password-reset.tsx          # Password reset email
│   │   ├── payment-success.tsx         # Payment success email
│   │   ├── welcome.tsx                 # Welcome email
│   │   └── 📁 components/              # Email component library
│   │       ├── header.tsx              # Email header
│   │       ├── footer.tsx              # Email footer
│   │       └── button.tsx              # Email button
│   │
│   ├── 📁 hooks/                       # 🪝 Custom React hooks
│   │   ├── use-auth.ts                 # Authentication hook
│   │   ├── use-booking.ts              # Booking management hook
│   │   ├── use-local-storage.ts        # Local storage hook
│   │   ├── use-debounce.ts             # Debounce hook
│   │   └── use-media-query.ts          # Responsive hook
│   │
│   ├── 📁 lib/                         # 🛠️ Utilities & configurations
│   │   ├── 📁 auth/                    # Authentication utilities
│   │   │   ├── client.ts               # Client-side auth
│   │   │   ├── server.ts               # Server-side auth
│   │   │   └── types.ts                # Auth types
│   │   │
│   │   ├── 📁 db/                      # Database utilities
│   │   │   ├── supabase.ts             # Supabase client
│   │   │   ├── queries.ts              # Database queries
│   │   │   ├── audit.ts                # Audit logging (✅ created)
│   │   │   └── types.ts                # Database types
│   │   │
│   │   ├── 📁 logger/                  # Logging system (✅ created)
│   │   │   ├── index.ts                # Main logger
│   │   │   └── http.ts                 # HTTP request logger
│   │   │
│   │   ├── 📁 monitoring/              # Monitoring & error tracking (✅ created)
│   │   │   ├── sentry.client.ts        # Client-side Sentry
│   │   │   ├── sentry.server.ts        # Server-side Sentry
│   │   │   └── index.ts                # Monitoring utilities
│   │   │
│   │   ├── 📁 utils/                   # General utilities
│   │   │   ├── cn.ts                   # ClassName merger (✅ created)
│   │   │   ├── format.ts               # Formatting utilities
│   │   │   ├── validation.ts           # Validation helpers
│   │   │   └── date.ts                 # Date utilities
│   │   │
│   │   ├── env.ts                      # Environment validation (✅ created)
│   │   └── constants.ts                # App constants
│   │
│   ├── 📁 providers/                   # 🔄 React context providers
│   │   ├── auth-provider.tsx           # Authentication provider
│   │   ├── theme-provider.tsx          # Theme provider
│   │   ├── query-provider.tsx          # React Query provider
│   │   └── toast-provider.tsx          # Toast notifications
│   │
│   ├── 📁 server/                      # 🖥️ Server-only code
│   │   ├── 📁 actions/                 # Server Actions (Next.js 15)
│   │   │   ├── auth.ts                 # Authentication actions
│   │   │   ├── booking.ts              # Booking actions
│   │   │   └── payments.ts             # Payment actions
│   │   │
│   │   ├── 📁 services/                # Business logic services
│   │   │   ├── stripe-service.ts       # Stripe integration
│   │   │   ├── supabase-service.ts     # Supabase operations
│   │   │   ├── email-service.ts        # Email sending
│   │   │   └── maps-service.ts         # Google Maps integration
│   │   │
│   │   ├── 📁 middleware/              # Custom middleware
│   │   │   ├── auth-middleware.ts      # Authentication middleware
│   │   │   ├── rate-limit.ts           # Rate limiting
│   │   │   └── cors.ts                 # CORS configuration
│   │   │
│   │   └── 📁 utils/                   # Server utilities
│   │       ├── database.ts             # Database helpers
│   │       ├── validation.ts           # Server validation
│   │       └── crypto.ts               # Encryption utilities
│   │
│   ├── 📁 types/                       # 📝 TypeScript definitions
│   │   ├── auth.ts                     # Authentication types
│   │   ├── booking.ts                  # Booking types
│   │   ├── database.ts                 # Database schema types
│   │   ├── payments.ts                 # Payment types
│   │   └── global.ts                   # Global types (✅ created)
│   │
│   ├── 📁 constants/                   # 📋 Application constants
│   │   ├── routes.ts                   # Route constants (✅ created)
│   │   ├── config.ts                   # App configuration
│   │   └── messages.ts                 # UI messages
│   │
│   └── 📁 test/                        # 🧪 Test utilities
│       ├── setup.ts                    # Test setup (✅ created)
│       ├── 📁 mocks/                   # Mock data
│       │   ├── auth.ts
│       │   ├── bookings.ts
│       │   └── users.ts
│       └── utils.ts                    # Test utilities
│
├── 📁 public/                          # 🌐 Static assets
│   ├── 📁 images/                      # Images
│   │   ├── 📁 brand/                   # Logo, branding assets
│   │   │   ├── logo.svg
│   │   │   ├── logo-dark.svg
│   │   │   └── wordmark.svg
│   │   ├── 📁 services/                # Service category images
│   │   │   ├── executive-travel.jpg
│   │   │   ├── airport-transfer.jpg
│   │   │   └── events.jpg
│   │   ├── 📁 vehicles/                # Vehicle photos
│   │   │   ├── executive-sedan.jpg
│   │   │   ├── luxury-suv.jpg
│   │   │   └── premium-van.jpg
│   │   └── 📁 backgrounds/             # Hero backgrounds
│   │       ├── hero-main.jpg
│   │       └── hero-booking.jpg
│   │
│   ├── 📁 icons/                       # Icons & favicons
│   │   ├── favicon.ico
│   │   ├── apple-touch-icon.png
│   │   ├── android-chrome-192x192.png
│   │   └── android-chrome-512x512.png
│   │
│   └── robots.txt                      # SEO robots file
│
└── 📄 Configuration Files               # ⚙️ Project configuration
    ├── package.json                    # ✅ Dependencies & scripts
    ├── tsconfig.json                   # ✅ TypeScript config
    ├── next.config.ts                  # ✅ Next.js config
    ├── tailwind.config.ts              # ✅ Tailwind config
    ├── eslint.config.mjs               # ✅ ESLint config
    ├── prettier.config.cjs             # ✅ Prettier config
    ├── vitest.config.ts                # ✅ Vitest config
    ├── .commitlintrc.cjs               # ✅ Commit lint config
    ├── .env.example                    # ✅ Environment variables template
    ├── .gitignore                      # ✅ Git ignore rules
    └── README.md                       # ✅ Project README
```

## 🎯 **Design Principles**

### **📁 Folder Organization**
- **Feature-based**: Group by business domain (auth, booking, payments)
- **Layer separation**: UI, business logic, data access clearly separated
- **Colocation**: Related files (component + test + story) in same folder
- **Scalability**: Structure supports growth without reorganization

### **📝 File Naming Conventions**
- **Components**: `PascalCase.tsx` (e.g., `BookingCard.tsx`)
- **Hooks**: `kebab-case.ts` with `use-` prefix (e.g., `use-auth.ts`)
- **Utilities**: `kebab-case.ts` (e.g., `format-date.ts`)
- **Pages**: `page.tsx` (Next.js App Router convention)
- **API Routes**: `route.ts` (Next.js App Router convention)

### **📦 Import Strategy**
- **Absolute imports**: Use `@/` alias for all internal imports
- **Barrel exports**: `index.ts` files for clean imports
- **Type imports**: Use `import type` for TypeScript types
- **External first**: External packages before internal imports

---

**This structure ensures maintainability, scalability, and AI-friendly development! 🚀**
