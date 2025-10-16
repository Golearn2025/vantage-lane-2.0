# 🎨 Design System Guide

**Complete UI/UX guidelines for Vantage Lane 2.0 premium brand experience**

## 🏆 **Brand Identity**

### **Brand Values**
- **Luxury**: Premium experience in every interaction
- **Reliability**: Consistent, dependable service
- **Professionalism**: Executive-grade presentation
- **Innovation**: Modern technology meets classic service

### **Design Principles**
1. **Elegant Simplicity**: Clean interfaces with purposeful details
2. **Premium Feel**: High-quality visuals and smooth interactions  
3. **Trust & Security**: Professional appearance builds confidence
4. **Accessibility First**: Inclusive design for all users

## 🎨 **Color System**

### **Primary Brand Colors**
```css
/* 🏆 Primary Gold System - Extracted from Vantage Lane 1.0 */
--brand-primary-50: #fefce8;    /* Ultra light gold tint */
--brand-primary-100: #fef3c7;   /* Light gold background */
--brand-primary-200: #fde68a;   /* Soft gold for highlights */
--brand-primary-300: #fcd34d;   /* Medium gold for accents */
--brand-primary-400: #f59e0b;   /* Bright gold for CTAs */
--brand-primary-500: #CBB26A;   /* PRIMARY GOLD - Main brand color */
--brand-primary-600: #A68B42;   /* Dark gold for hover states */
--brand-primary-700: #92400e;   /* Darker gold for pressed states */
--brand-primary-800: #78350f;   /* Very dark gold */
--brand-primary-900: #451a03;   /* Ultra dark gold */

/* 🎯 Secondary Gold */
--brand-secondary: #E5D485;     /* Light gold for hover effects */
```

### **Tier System Colors** 
```css
/* 🥇 Customer Tier Colors */
--tier-bronze: #CD7F32;   /* Bronze tier */
--tier-silver: #C0C0C0;   /* Silver tier */
--tier-gold: #FFD700;     /* Gold tier */
--tier-platinum: #E5E4E2; /* Platinum tier */
--tier-elite: #CBB26A;    /* Elite tier (same as primary) */
```

### **Semantic Colors**
```css
/* ✅ Success States */
--success-50: #f0fdf4;
--success-500: #22c55e;
--success-700: #15803d;

/* ⚠️ Warning States */  
--warning-50: #fffbeb;
--warning-500: #f59e0b;
--warning-700: #a16207;

/* ❌ Error States */
--error-50: #fef2f2;
--error-500: #ef4444;
--error-700: #b91c1c;

/* ℹ️ Info States */
--info-50: #eff6ff;
--info-500: #3b82f6;
--info-700: #1d4ed8;
```

### **Neutral System**
```css
/* ⚫ Dark Theme (Primary) */
--neutral-50: #fafafa;    /* Pure white backgrounds */
--neutral-100: #f5f5f5;   /* Light gray backgrounds */
--neutral-200: #e5e5e5;   /* Border colors */
--neutral-300: #d4d4d4;   /* Dividers */
--neutral-400: #a3a3a3;   /* Placeholder text */
--neutral-500: #737373;   /* Secondary text */
--neutral-600: #525252;   /* Primary text on light */
--neutral-700: #404040;   /* Headings on light */
--neutral-800: #2a2a2a;   /* Card backgrounds (dark theme) */
--neutral-900: #1a1a1a;   /* Main background (dark theme) */
--neutral-950: #0a0a0a;   /* Deep black */
```

### **Usage Guidelines**

| **Use Case** | **Color** | **Example** |
|--------------|-----------|-------------|
| **Primary CTA** | `brand-primary-500` | Book Now, Sign Up buttons |
| **Secondary CTA** | `brand-primary-100` border with `brand-primary-500` text | Cancel, Back buttons |
| **Success Messages** | `success-500` | "Booking confirmed!" |
| **Error Messages** | `error-500` | Form validation errors |
| **Tier Badges** | Respective tier color | User tier indicators |
| **Card Backgrounds** | `neutral-800` (dark theme) | Content cards |
| **Text Primary** | `neutral-50` (dark theme) | Main content text |
| **Text Secondary** | `neutral-400` (dark theme) | Descriptions, meta text |

## 🔤 **Typography System**

### **Font Stack**
```css
/* 📖 Primary Font - Inter (Sans-serif) */
font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;

/* 🎭 Display Font - Playfair Display (Serif) */  
font-family: 'Playfair Display', Georgia, 'Times New Roman', serif;
```

### **Type Scale**
```css
/* 📏 Font Size System */
--text-xs: 0.75rem;     /* 12px - Small labels, captions */
--text-sm: 0.875rem;    /* 14px - Secondary text, metadata */
--text-base: 1rem;      /* 16px - Body text, default */
--text-lg: 1.125rem;    /* 18px - Large body text */
--text-xl: 1.25rem;     /* 20px - Small headings */
--text-2xl: 1.5rem;     /* 24px - Section headings */
--text-3xl: 1.875rem;   /* 30px - Page headings */
--text-4xl: 2.25rem;    /* 36px - Large headings */
--text-5xl: 3rem;       /* 48px - Hero titles */
--text-6xl: 3.75rem;    /* 60px - Display titles */
```

### **Font Weights**
```css
--font-light: 300;      /* Light - Display text, elegant headings */
--font-normal: 400;     /* Normal - Body text, default */
--font-medium: 500;     /* Medium - Emphasis, labels */
--font-semibold: 600;   /* Semibold - Buttons, strong emphasis */
--font-bold: 700;       /* Bold - Headings, calls to action */
--font-black: 900;      /* Black - Hero titles, brand text */
```

### **Line Heights**
```css
--leading-tight: 1.25;  /* Headings, compact text */
--leading-normal: 1.5;  /* Body text, default */
--leading-relaxed: 1.625; /* Comfortable reading */
--leading-loose: 2;     /* Spacious text blocks */
```

### **Typography Usage**

| **Element** | **Font** | **Size** | **Weight** | **Usage** |
|-------------|----------|----------|------------|-----------|
| **Hero Title** | Playfair Display | `text-5xl` | `font-light` | Landing page headlines |
| **Page Heading** | Inter | `text-3xl` | `font-bold` | Main page titles |
| **Section Heading** | Inter | `text-2xl` | `font-semibold` | Content section titles |
| **Card Title** | Inter | `text-xl` | `font-semibold` | Card headings |
| **Body Text** | Inter | `text-base` | `font-normal` | Main content |
| **Caption** | Inter | `text-sm` | `font-medium` | Form labels, metadata |
| **Small Text** | Inter | `text-xs` | `font-normal` | Fine print, timestamps |

## 📏 **Spacing System**

### **Spacing Scale**
```css
/* 📐 Spacing System (based on 4px grid) */
--space-0: 0px;         /* No spacing */
--space-1: 0.25rem;     /* 4px - Tight spacing */
--space-2: 0.5rem;      /* 8px - Small gaps */
--space-3: 0.75rem;     /* 12px - Form field spacing */
--space-4: 1rem;        /* 16px - Standard spacing */
--space-5: 1.25rem;     /* 20px - Medium spacing */
--space-6: 1.5rem;      /* 24px - Large spacing */
--space-8: 2rem;        /* 32px - Section spacing */
--space-10: 2.5rem;     /* 40px - Large section spacing */
--space-12: 3rem;       /* 48px - Page section spacing */
--space-16: 4rem;       /* 64px - Major section spacing */
--space-20: 5rem;       /* 80px - Hero section spacing */
--space-24: 6rem;       /* 96px - Large page sections */
--space-32: 8rem;       /* 128px - Major page sections */
```

### **Container Sizes**
```css
--container-sm: 640px;    /* Small screens */
--container-md: 768px;    /* Medium screens */
--container-lg: 1024px;   /* Large screens */
--container-xl: 1280px;   /* Extra large screens */
--container-2xl: 1400px;  /* Maximum width */
```

## 🎭 **Shadows & Effects**

### **Shadow System**
```css
/* 🌫️ Shadow Levels */
--shadow-xs: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
--shadow-sm: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
--shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
--shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
--shadow-xl: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
--shadow-2xl: 0 25px 50px -12px rgba(0, 0, 0, 0.25);

/* ✨ Premium Gold Shadows */
--shadow-gold-sm: 0 2px 4px 0 rgba(203, 178, 106, 0.1);
--shadow-gold-md: 0 4px 8px 0 rgba(203, 178, 106, 0.15);
--shadow-gold-lg: 0 8px 16px 0 rgba(203, 178, 106, 0.2);
```

### **Border Radius**
```css
--radius-none: 0px;       /* No radius */
--radius-sm: 0.125rem;    /* 2px - Small elements */
--radius-base: 0.25rem;   /* 4px - Default radius */
--radius-md: 0.375rem;    /* 6px - Medium elements */
--radius-lg: 0.5rem;      /* 8px - Cards, buttons */
--radius-xl: 0.75rem;     /* 12px - Large cards */
--radius-2xl: 1rem;       /* 16px - Modals, hero elements */
--radius-3xl: 1.5rem;     /* 24px - Premium components */
--radius-full: 9999px;    /* Circular elements */
```

## 🧩 **Component System**

### **Button Variants**

#### **Primary Button**
```tsx
<Button variant="primary" size="md">
  Book Now
</Button>
```
- **Background**: `brand-primary-500`
- **Hover**: `brand-primary-600` 
- **Text**: `white`
- **Shadow**: `shadow-md`
- **Radius**: `radius-lg`

#### **Secondary Button**  
```tsx
<Button variant="secondary" size="md">
  Learn More
</Button>
```
- **Background**: `transparent`
- **Border**: `brand-primary-500`
- **Text**: `brand-primary-500`
- **Hover**: `brand-primary-50`

#### **Ghost Button**
```tsx
<Button variant="ghost" size="md">
  Cancel
</Button>
```
- **Background**: `transparent`
- **Text**: `neutral-600`
- **Hover**: `neutral-100`

### **Card Components**

#### **Default Card**
```tsx
<Card className="bg-neutral-800 border-neutral-700">
  <CardContent>
    Content here
  </CardContent>
</Card>
```
- **Background**: `neutral-800`
- **Border**: `neutral-700`
- **Shadow**: `shadow-lg`
- **Radius**: `radius-2xl`
- **Padding**: `space-6`

#### **Premium Card**
```tsx
<Card className="bg-gradient-to-br from-neutral-800 to-neutral-900 border-brand-primary/20">
  <CardContent>
    Premium content
  </CardContent>
</Card>
```
- **Background**: Gradient `neutral-800` to `neutral-900`
- **Border**: `brand-primary` with 20% opacity
- **Shadow**: `shadow-gold-lg`
- **Glow**: Subtle gold glow effect

### **Form Components**

#### **Input Field**
```tsx
<Input 
  placeholder="Enter pickup location"
  className="bg-neutral-800 border-neutral-600 focus:border-brand-primary"
/>
```
- **Background**: `neutral-800`
- **Border**: `neutral-600` (default), `brand-primary-500` (focus)
- **Text**: `neutral-50`
- **Placeholder**: `neutral-400`
- **Radius**: `radius-lg`

#### **Select Dropdown**
```tsx
<Select>
  <SelectTrigger className="bg-neutral-800 border-neutral-600">
    <SelectValue placeholder="Select vehicle type" />
  </SelectTrigger>
</Select>
```
- **Background**: `neutral-800`
- **Border**: `neutral-600`
- **Focus**: `brand-primary-500` border with `shadow-gold-sm`

## 🎪 **Animation Guidelines**

### **Timing Functions**
```css
--ease-in: cubic-bezier(0.4, 0, 1, 1);
--ease-out: cubic-bezier(0, 0, 0.2, 1);
--ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);
--ease-bounce: cubic-bezier(0.68, -0.55, 0.265, 1.55);
```

### **Duration Scale**
```css
--duration-75: 75ms;      /* Fast transitions */
--duration-100: 100ms;    /* Quick interactions */
--duration-150: 150ms;    /* Standard transitions */
--duration-200: 200ms;    /* Button hovers */
--duration-300: 300ms;    /* Modal animations */
--duration-500: 500ms;    /* Page transitions */
--duration-700: 700ms;    /* Hero animations */
--duration-1000: 1000ms;  /* Loading animations */
```

### **Common Animations**
```tsx
// ✨ Button hover animation
<button className="transition-all duration-200 hover:scale-105 hover:shadow-gold-md">

// 🎪 Modal entrance
<div className="animate-in fade-in-0 zoom-in-95 duration-300">

// 📱 Mobile menu slide
<nav className="transform transition-transform duration-300 translate-x-0">
```

## 📱 **Responsive Design**

### **Breakpoints**
```css
/* 📱 Mobile First Approach */
--bp-sm: 640px;    /* Small devices */
--bp-md: 768px;    /* Tablets */
--bp-lg: 1024px;   /* Laptops */
--bp-xl: 1280px;   /* Desktops */
--bp-2xl: 1536px;  /* Large displays */
```

### **Layout Patterns**

#### **Hero Section**
- **Mobile**: Single column, `text-3xl` heading
- **Tablet**: Single column, `text-4xl` heading  
- **Desktop**: Two column with image, `text-5xl` heading

#### **Service Grid**
- **Mobile**: 1 column
- **Tablet**: 2 columns
- **Desktop**: 3 columns

#### **Navigation**
- **Mobile**: Hamburger menu with slide-out drawer
- **Tablet**: Horizontal nav with dropdown menus
- **Desktop**: Full horizontal navigation

## ♿ **Accessibility Standards**

### **Color Contrast**
- **AA Compliance**: Minimum 4.5:1 ratio for normal text
- **AAA Compliance**: 7:1 ratio for important content
- **Large Text**: 3:1 ratio minimum (18px+ regular, 14px+ bold)

### **Focus States**
```css
/* ✅ Accessible focus rings */
.focus-ring {
  @apply focus:outline-none focus:ring-2 focus:ring-brand-primary/50 focus:ring-offset-2 focus:ring-offset-neutral-900;
}
```

### **ARIA Labels**
```tsx
// ✅ Proper ARIA implementation
<button 
  aria-label="Book a chauffeur for executive travel"
  aria-describedby="booking-help-text"
>
  Book Now
</button>

<input 
  aria-label="Pickup location"
  aria-required="true"
  aria-invalid={hasError}
  aria-describedby={hasError ? "pickup-error" : undefined}
/>
```

## 🎯 **Design Token Implementation**

### **Tailwind Configuration**
```javascript
// tailwind.config.ts
module.exports = {
  theme: {
    extend: {
      colors: {
        brand: {
          primary: {
            50: '#fefce8',
            500: '#CBB26A', // Main brand color
            600: '#A68B42',
          }
        },
        tier: {
          bronze: '#CD7F32',
          silver: '#C0C0C0',
          gold: '#FFD700',
          platinum: '#E5E4E2',
          elite: '#CBB26A',
        }
      }
    }
  }
}
```

### **CSS Custom Properties**
```css
/* globals.css */
:root {
  --brand-primary: #CBB26A;
  --brand-secondary: #E5D485;
  --success: #22c55e;
  --error: #ef4444;
  --warning: #f59e0b;
}
```

---

## 🏆 **Design System Checklist**

When creating components, verify:
- ✅ Uses design tokens instead of hardcoded values
- ✅ Follows color contrast accessibility standards  
- ✅ Includes proper focus states and ARIA labels
- ✅ Implements responsive behavior across all breakpoints
- ✅ Uses consistent spacing from the spacing scale
- ✅ Includes loading and error states
- ✅ Follows animation duration and easing guidelines
- ✅ Maintains brand consistency with gold color palette
