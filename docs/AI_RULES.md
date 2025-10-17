# 🤖 AI Development Rules

**Critical guidelines for AI-assisted development on Vantage Lane 2.0**

## ⛔ ABSOLUTE RESTRICTIONS

### 🚫 **NEVER DO THESE:**

- **Never create files outside the defined folder structure**
- **Never modify core config files** (package.json, tsconfig.json, etc.) without explicit approval
- **Never use `console.log` or `console.error`** - use the logger system instead
- **Never use `any` type** - always provide proper TypeScript types
- **Never create files with more than 250 lines**
- **Never rename existing directories** without approval
- **Never install new dependencies** without approval

### 🚫 **FORBIDDEN PATTERNS:**

- `console.log()` → Use `log.info()` from `@/lib/logger`
- `any` type → Use proper TypeScript interfaces
- Inline styles → Use Tailwind classes or design tokens
- Hardcoded colors → Use design system colors
- Direct Supabase calls in components → Use custom hooks or server actions

## ✅ MANDATORY REQUIREMENTS

### 📝 **File Creation Rules:**

1. **Maximum 200 lines per file** (strict limit)
2. **Use exact folder structure** defined in FILE_STRUCTURE.md
3. **Always add proper TypeScript types**
4. **Include JSDoc comments** for public functions
5. **Use proper imports** with `@/` alias

### 🎨 **UI Component Rules:**

1. **Use design tokens** from `@/design-system/tokens`
2. **Follow Radix UI patterns** for accessibility
3. **Use `cn()` utility** for className merging
4. **Include proper loading and error states**
5. **Support dark mode** where applicable

### 🔧 **Code Quality Rules:**

1. **Use `log.info()` instead of console.log**
2. **Add error boundaries** for components that might fail
3. **Use proper TypeScript strict mode**
4. **Follow naming conventions** (see Development Guidelines)
5. **Add proper error handling** in API routes

## 📁 FOLDER STRUCTURE COMPLIANCE

### ✅ **WHERE TO PUT WHAT:**

| **File Type**      | **Location**                | **Example**                     |
| ------------------ | --------------------------- | ------------------------------- |
| UI Components      | `src/components/ui/`        | `button.tsx`, `card.tsx`        |
| Feature Components | `src/components/features/`  | `booking/`, `auth/`             |
| Custom Hooks       | `src/hooks/`                | `use-auth.ts`, `use-booking.ts` |
| Server Actions     | `src/server/actions/`       | `auth.ts`, `bookings.ts`        |
| Business Services  | `src/server/services/`      | `stripe-service.ts`             |
| Email Templates    | `src/emails/`               | `booking-confirmation.tsx`      |
| Types              | `src/types/`                | `auth.ts`, `booking.ts`         |
| Design Tokens      | `src/design-system/tokens/` | `colors.ts`, `typography.ts`    |

### ❌ **NEVER CREATE FILES IN:**

- Root directory (except docs)
- `public/` (only static assets)
- `node_modules/`
- `.next/`

## 🛠️ DEVELOPMENT WORKFLOW

### 📋 **Before Making Changes:**

1. ✅ Check if file exists in correct location
2. ✅ Verify it follows naming convention
3. ✅ Ensure it's under 200 lines
4. ✅ Use proper TypeScript types
5. ✅ Add proper logging instead of console

### 📋 **After Making Changes:**

1. ✅ Verify no lint errors
2. ✅ Check TypeScript compilation
3. ✅ Ensure proper imports
4. ✅ Test the functionality
5. ✅ Update related documentation

## 🎯 COMPONENT CREATION CHECKLIST

### ✅ **UI Component Checklist:**

```tsx
// ✅ Proper imports
import { cn } from '@/lib/utils/cn'
import { log } from '@/lib/logger'

// ✅ Proper TypeScript interface
interface ButtonProps {
  variant?: 'primary' | 'secondary'
  size?: 'sm' | 'md' | 'lg'
  children: React.ReactNode
}

// ✅ Use design tokens
const Button = ({ variant = 'primary', size = 'md', children }: ButtonProps) => {
  return (
    <button
      className={cn(
        'rounded-lg font-medium transition-colors',
        variant === 'primary' && 'bg-brand-primary text-white',
        size === 'md' && 'px-4 py-2',
      )}
    >
      {children}
    </button>
  )
}
```

## 🔄 ERROR HANDLING PATTERNS

### ✅ **Correct Error Handling:**

```tsx
// ✅ API Route Error Handling
export async function POST(request: NextRequest) {
  return logRequest(request, async () => {
    try {
      const body = await request.json()
      // ... logic here
      return NextResponse.json({ success: true })
    } catch (error) {
      log.error('API Error', error)
      return NextResponse.json({ error: 'Internal error' }, { status: 500 })
    }
  })
}
```

### ❌ **Incorrect Patterns:**

```tsx
// ❌ Don't use console.log
console.log('Debug message')

// ❌ Don't use any type
const data: any = await fetch()

// ❌ Don't create large files
// Files over 200 lines are forbidden
```

## 🚀 DEPLOYMENT CHECKLIST

### ✅ **Before Deployment:**

1. ✅ All lint checks pass
2. ✅ TypeScript compilation succeeds
3. ✅ All tests pass
4. ✅ No console.log statements
5. ✅ Proper error handling
6. ✅ Environment variables configured
7. ✅ Audit logs working
8. ✅ Monitoring configured

## 🏛️ **AI GOVERNANCE LAYER**

### **📚 MANDATORY DOCUMENT READING BEFORE ANY ACTION:**

**ÎNAINTE de orice modificare, AI TREBUIE să citească complet:**

- [ ] `AI_RULES.md` (acest document)
- [ ] `DEVELOPMENT_GUIDELINES.md`
- [ ] `QUALITY-GATE.md`
- [ ] `FREEZE-LIST.md`
- [ ] `CHECKLIST.md`
- [ ] `ARCHITECTURE.md`

### **🔒 FREEZE-LIST COMPLIANCE:**

**ÎNAINTE de a modifica orice fișier, verifică FREEZE-LIST.md!**

Dacă fișierul e în FREEZE-LIST → **ÎNTREABĂ OBLIGATORIU:**

```
🔒 FREEZE-LIST ALERT:
Fișierul [nume] este protejat.
AM VOIE SĂ ÎL MODIFIC?
Aștept "DA" sau "NU" explicit.
```

### **✅ QUALITY GATE EXECUTION:**

**DUPĂ fiecare modificare, rulează OBLIGATORIU:**

```bash
pnpm lint        # Zero warnings
pnpm typecheck   # Zero errors
pnpm audit:custom # Custom audit
```

**Raportează rezultatul:**

```
✅ Quality Gate Status:
- Lint: PASSED/FAILED
- TypeScript: PASSED/FAILED
- Custom Audit: PASSED/FAILED
- Structure Check: PASSED/FAILED

Overall: ✅ PASSED / ❌ FAILED
```

### **🚫 FAILURE PROTOCOL:**

Dacă **orice check FAILS:**

1. **STOP imediat** - nu continua
2. **Șterge modificările** dacă au fost făcute
3. **Raportează exact ce a eșuat**
4. **Cere instrucțiuni** înainte de retry

### **📋 TASK COMPLETION TEMPLATE:**

La sfârșitul fiecărui task, confirmă:

```
📋 TASK COMPLETION CHECKLIST:
- [ ] Am citit toate documentele governance
- [ ] Am verificat FREEZE-LIST compliance
- [ ] Quality Gate: ✅ PASSED
- [ ] File size <250 lines: ✅ PASSED
- [ ] Zero 'any' types: ✅ PASSED
- [ ] Zero console.log: ✅ PASSED
- [ ] Structure compliance: ✅ PASSED
- [ ] Tests pass: ✅ PASSED

🎯 FINAL STATUS: ✅ TASK COMPLETED SUCCESSFULLY
```

## ⚖️ FINAL RULE

**AI Governance Protocol: Read → Verify → Execute → Audit → Report**

**When in doubt, ask for clarification rather than guessing!**

Following these rules ensures:

- 🏗️ **Consistent architecture**
- 🛡️ **High code quality**
- 🚀 **Maintainable codebase**
- 🤝 **Smooth team collaboration**
- 🎯 **AI-friendly development**
