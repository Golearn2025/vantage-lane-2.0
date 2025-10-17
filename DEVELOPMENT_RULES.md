# ⚙️ DEVELOPMENT RULES – VANTAGE LANE 2.0

## 🧩 Code Style

- Write all code in **TypeScript**.
- No `any`, `unknown`, or `@ts-ignore`.
- Max 250 lines per file (split large logic).
- No commented or dead code.
- Always define prop types for components.

## 🎨 UI Rules

- Tailwind is the single source of styling.
- Use `cn()` helper for class combinations.
- Use only theme colors (no hardcoded hex).
- All interactive elements must have `aria-label`.
- Dark/light mode must work for every component.

## 🧠 Logic & Architecture

- Separate logic from UI.
- Use `hooks/` for reusable logic.
- Use `/lib/utils/` for pure functions.
- No direct Supabase/Stripe logic in components — only through services.

## 🧾 Folder Guidelines

- `/ui/` → atomic visuals (Button, Card, Input)
- `/shared/` → small reusable blocks (PricingCard, FleetSelector)
- `/features/` → complete modules (Booking, Account, Auth)
- `/layout/` → Navbar, Footer, Container, Section
- `/forms/` → form field components (with RHF integration)
- `/providers/` → Theme, Auth, Booking context
- `/mobile/` → dedicated responsive components

## 🔄 Import Rules

### **✅ ALLOWED IMPORTS:**

```typescript
// UI components can import:
import { cn } from '@/lib/utils/cn'
import { Button } from '@/components/ui/button'

// Features can import:
import { Card } from '@/components/ui/card'
import { PricingCard } from '@/components/shared/PricingCard'
import { useBooking } from '@/lib/hooks/useBooking'

// Services can import:
import { env } from '@/lib/env'
import type { BookingType } from '@/types/booking'
```

### **❌ FORBIDDEN IMPORTS:**

```typescript
// UI components CANNOT import:
import { BookingWizard } from '@/components/features/booking' // ❌
import { supabase } from '@/lib/supabase' // ❌

// Shared components CANNOT import:
import { PaymentModal } from '@/components/features/payments' // ❌
```

## 🎯 Component Rules

### **Atomic Components (`/ui/`)**

- Must be pure UI (no API calls or business logic)
- Can only import from `/lib/utils/` and other `/ui/` components
- Must support theme variants
- Required props must be typed

### **Shared Components (`/shared/`)**

- Can contain light business logic
- Can import from `/ui/` and `/lib/`
- Should be reusable across features
- Must be domain-agnostic

### **Feature Components (`/features/`)**

- Can contain complex business logic
- Can import from anywhere except other features
- Should be self-contained modules
- Must include types.ts and constants.ts

## ✅ Quality Checks

- Run `npm run lint` before every commit.
- Ensure `npm run dev` shows no TypeScript errors.
- Keep imports ordered and grouped.
- Avoid duplication; prefer reusable helpers.
- All components must pass accessibility checks.

## 🚀 Performance Rules

- Use `React.memo` for expensive components
- Lazy load feature components with `React.lazy`
- Keep bundle sizes small with tree shaking
- Use `useCallback` and `useMemo` appropriately

## 🔒 Security Rules

- Never hardcode API keys or secrets
- Always validate user inputs
- Use proper authentication guards
- Sanitize data before rendering

## 📱 Responsive Rules

- Mobile-first design approach
- Use Tailwind responsive prefixes (`sm:`, `md:`, `lg:`)
- Test on multiple screen sizes
- Use `/mobile/` components for complex mobile UX

## 🎨 Theme Rules

- Use CSS custom properties for dynamic values
- Support both light and dark modes
- Use semantic color naming (primary, secondary, accent)
- Test theme switching in all components

## 📝 Documentation Rules

- Add JSDoc comments for complex functions
- Update README.md when adding new features
- Document component props with TypeScript
- Keep CHANGELOG.md updated for major changes
