# 👨‍💻 Development Guidelines

**Coding standards, conventions, and best practices for Vantage Lane 2.0**

## 📋 **Code Quality Standards**

### ✅ **MUST Follow**
- **TypeScript strict mode**: All code must be fully typed
- **ESLint compliance**: Zero warnings on commit
- **File size limit**: Maximum 200 lines per file
- **No `console.log`**: Use logger system instead
- **Error handling**: Proper try-catch with logging
- **Testing**: Unit tests for utilities, E2E for critical flows

### ❌ **NEVER Do**
- Use `any` type without justification
- Create files larger than 200 lines
- Skip error handling in async operations
- Hardcode sensitive values
- Commit with lint warnings

## 🏗️ **Architecture Patterns**

### **Component Architecture**
```tsx
// ✅ Good: Proper component structure
interface ButtonProps {
  variant?: 'primary' | 'secondary'
  size?: 'sm' | 'md' | 'lg'
  disabled?: boolean
  children: React.ReactNode
  onClick?: () => void
}

export function Button({ 
  variant = 'primary', 
  size = 'md', 
  disabled = false,
  children, 
  onClick 
}: ButtonProps) {
  return (
    <button
      className={cn(
        'font-medium transition-colors',
        variants[variant],
        sizes[size],
        disabled && 'opacity-50 cursor-not-allowed'
      )}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  )
}
```

### **Custom Hooks Pattern**
```tsx
// ✅ Good: Clean hook with proper error handling
export function useAuth() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const getUser = async () => {
      try {
        const { data, error } = await supabase.auth.getUser()
        if (error) throw error
        setUser(data.user)
      } catch (err) {
        log.error('Auth error', err)
        setError('Failed to load user')
      } finally {
        setLoading(false)
      }
    }
    
    getUser()
  }, [])

  return { user, loading, error }
}
```

### **Server Action Pattern**
```tsx
// ✅ Good: Server action with validation and logging
'use server'

import { createAuditLog } from '@/lib/db/audit'
import { log } from '@/lib/logger'

export async function createBooking(formData: FormData) {
  try {
    // Validate input
    const bookingData = bookingSchema.parse({
      pickup: formData.get('pickup'),
      destination: formData.get('destination'),
      date: formData.get('date'),
    })

    // Business logic
    const booking = await supabase
      .from('bookings')
      .insert(bookingData)
      .select()
      .single()

    // Audit log
    await createAuditLog({
      action: 'booking.create',
      user_id: booking.user_id,
      resource_id: booking.id,
    })

    log.info('Booking created', { bookingId: booking.id })
    return { success: true, booking }
  } catch (error) {
    log.error('Booking creation failed', error)
    return { success: false, error: 'Failed to create booking' }
  }
}
```

## 🎨 **UI Development Standards**

### **Styling Guidelines**
- **Use Tailwind classes**: Prefer utilities over custom CSS
- **Design tokens**: Use design system tokens for colors/spacing
- **Responsive design**: Mobile-first approach
- **Accessibility**: Include ARIA labels and focus states

```tsx
// ✅ Good: Proper Tailwind usage with design tokens
<button className={cn(
  'px-4 py-2 rounded-lg font-medium transition-colors',
  'bg-brand-primary hover:bg-brand-primary-dark',
  'text-white',
  'focus:outline-none focus:ring-2 focus:ring-brand-primary/50',
  'disabled:opacity-50 disabled:cursor-not-allowed'
)}>
  Book Now
</button>
```

### **Component Composition**
```tsx
// ✅ Good: Composable components
export function BookingCard({ booking }: { booking: Booking }) {
  return (
    <Card className="p-6">
      <CardHeader>
        <CardTitle>{booking.service_type}</CardTitle>
        <CardDescription>{format(booking.date, 'PPP')}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div>From: {booking.pickup_address}</div>
          <div>To: {booking.destination_address}</div>
        </div>
      </CardContent>
      <CardFooter>
        <Button variant="outline" size="sm">
          View Details
        </Button>
      </CardFooter>
    </Card>
  )
}
```

## 🔧 **API Development**

### **API Route Structure**
```tsx
// ✅ Good: Proper API route with logging and validation
import { NextRequest, NextResponse } from 'next/server'
import { logRequest } from '@/lib/logger/http'
import { createBookingSchema } from '@/lib/validation'

export async function POST(request: NextRequest) {
  return logRequest(request, async () => {
    try {
      const body = await request.json()
      const validatedData = createBookingSchema.parse(body)
      
      // Business logic here
      const booking = await createBooking(validatedData)
      
      return NextResponse.json({ 
        success: true, 
        data: booking 
      })
    } catch (error) {
      if (error instanceof z.ZodError) {
        return NextResponse.json(
          { success: false, error: 'Invalid input', details: error.errors },
          { status: 400 }
        )
      }
      
      log.error('API Error', error)
      return NextResponse.json(
        { success: false, error: 'Internal server error' },
        { status: 500 }
      )
    }
  })
}
```

## 📝 **Naming Conventions**

### **Files & Folders**
| **Type** | **Convention** | **Example** |
|----------|----------------|-------------|
| Components | PascalCase | `BookingCard.tsx` |
| Hooks | kebab-case with `use-` | `use-booking.ts` |
| Utils | kebab-case | `format-date.ts` |
| Types | kebab-case | `booking-types.ts` |
| Constants | UPPER_SNAKE_CASE | `API_ROUTES.ts` |

### **Variables & Functions**
```tsx
// ✅ Good naming conventions
const userBookings = await getUserBookings(userId)
const isBookingValid = validateBooking(bookingData)
const formattedPrice = formatPrice(booking.price, 'GBP')

// Component props
interface BookingCardProps {
  booking: Booking
  onEdit?: (booking: Booking) => void
  showActions?: boolean
}

// Event handlers
const handleBookingSubmit = async (data: BookingFormData) => {
  // Handle submission
}

const handleCancelBooking = (bookingId: string) => {
  // Handle cancellation
}
```

## 🧪 **Testing Standards**

### **Unit Tests**
```tsx
// ✅ Good: Comprehensive unit test
import { describe, it, expect } from 'vitest'
import { formatPrice } from '../format-price'

describe('formatPrice', () => {
  it('should format GBP correctly', () => {
    expect(formatPrice(2500, 'GBP')).toBe('£25.00')
  })

  it('should handle zero values', () => {
    expect(formatPrice(0, 'GBP')).toBe('£0.00')
  })

  it('should throw for invalid currency', () => {
    expect(() => formatPrice(100, 'INVALID')).toThrow()
  })
})
```

### **Component Tests**
```tsx
// ✅ Good: Component test with user interactions
import { render, screen, fireEvent } from '@testing-library/react'
import { BookingCard } from './BookingCard'

describe('BookingCard', () => {
  const mockBooking = {
    id: '1',
    service_type: 'Executive Travel',
    pickup_address: 'London Airport',
    destination_address: 'City Centre',
    date: '2024-12-01',
    price: 5000
  }

  it('should display booking information', () => {
    render(<BookingCard booking={mockBooking} />)
    
    expect(screen.getByText('Executive Travel')).toBeInTheDocument()
    expect(screen.getByText('From: London Airport')).toBeInTheDocument()
    expect(screen.getByText('To: City Centre')).toBeInTheDocument()
  })

  it('should call onEdit when edit button is clicked', () => {
    const mockOnEdit = vi.fn()
    render(<BookingCard booking={mockBooking} onEdit={mockOnEdit} />)
    
    fireEvent.click(screen.getByText('Edit'))
    expect(mockOnEdit).toHaveBeenCalledWith(mockBooking)
  })
})
```

## 🔄 **Git Workflow**

### **Commit Messages**
Follow conventional commits format:
```bash
# ✅ Good commit messages
feat: add booking cancellation feature
fix: resolve payment form validation issue
refactor: extract booking utilities to separate module
docs: update API documentation for payments
test: add unit tests for price calculation
chore: update dependencies

# ❌ Bad commit messages  
"fixed stuff"
"updates"
"wip"
```

### **Branch Strategy**
- **main**: Production-ready code
- **develop**: Integration branch
- **feature/**: New features (`feature/booking-cancellation`)
- **fix/**: Bug fixes (`fix/payment-validation`)
- **refactor/**: Code improvements (`refactor/auth-hooks`)

### **Pull Request Process**
1. ✅ All tests pass
2. ✅ Lint checks pass
3. ✅ TypeScript compiles without errors
4. ✅ Code review approved
5. ✅ Documentation updated if needed

## 📊 **Performance Guidelines**

### **React Performance**
- Use `useMemo` for expensive calculations
- Use `useCallback` for event handlers passed to children
- Lazy load non-critical components
- Optimize re-renders with proper key props

### **Next.js Optimizations**
- Use Server Components where possible
- Implement proper loading states
- Optimize images with Next.js Image component
- Use dynamic imports for large dependencies

### **Bundle Size**
- Keep individual files under 200 lines
- Use tree shaking friendly imports
- Analyze bundle with `next-bundle-analyzer`
- Lazy load heavy components

## 🛡️ **Security Standards**

### **Input Validation**
```tsx
// ✅ Good: Proper validation with Zod
const bookingSchema = z.object({
  pickup: z.string().min(1, 'Pickup address required'),
  destination: z.string().min(1, 'Destination required'),
  date: z.string().datetime('Invalid date format'),
  passengers: z.number().min(1).max(8)
})

// Validate in API routes
const validatedData = bookingSchema.parse(requestBody)
```

### **Environment Variables**
- Always validate with `envsafe`
- Use `.env.local` for secrets
- Never commit sensitive values
- Use different keys for development/production

### **Authentication & Authorization**
- Check auth on every protected route
- Use RLS policies in Supabase
- Validate user permissions server-side
- Log all authentication events

---

## 🎯 **Summary Checklist**

Before every commit, verify:
- ✅ TypeScript compiles without errors
- ✅ ESLint passes with zero warnings  
- ✅ All tests pass
- ✅ No `console.log` statements
- ✅ Proper error handling implemented
- ✅ Files are under 200 lines
- ✅ Proper logging used instead of console
- ✅ Security considerations addressed
