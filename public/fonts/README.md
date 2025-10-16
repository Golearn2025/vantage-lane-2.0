# 🔤 Fonts Directory

Acest folder conține fonturile locale pentru Vantage Lane 2.0.

## 📝 **Font Stack**

### **Primary Font - Inter**
- **Usage:** Body text, UI components, labels
- **Weight:** 300, 400, 500, 600, 700
- **Format:** WOFF2 (modern browsers), WOFF (fallback)
- **Source:** Google Fonts / Self-hosted

### **Display Font - Playfair Display**  
- **Usage:** Hero titles, elegant headings
- **Weight:** 300, 400, 700
- **Format:** WOFF2, WOFF
- **Source:** Google Fonts / Self-hosted

## 📂 **File Structure**

```
fonts/
├── inter/
│   ├── inter-300.woff2
│   ├── inter-400.woff2  
│   ├── inter-500.woff2
│   ├── inter-600.woff2
│   └── inter-700.woff2
├── playfair-display/
│   ├── playfair-300.woff2
│   ├── playfair-400.woff2
│   └── playfair-700.woff2
└── README.md (this file)
```

## ⚡ **Performance Optimization**

### **Font Loading Strategy**
```css
/* Critical fonts - preload */
@font-face {
  font-family: 'Inter';
  src: url('/fonts/inter/inter-400.woff2') format('woff2');
  font-weight: 400;
  font-style: normal;
  font-display: swap; /* Fast loading */
}

/* Non-critical fonts - load async */
@font-face {
  font-family: 'Playfair Display';
  src: url('/fonts/playfair-display/playfair-400.woff2') format('woff2');
  font-weight: 400;
  font-style: normal;
  font-display: optional; /* Skip if slow */
}
```

### **Next.js Font Optimization**
```typescript
// app/layout.tsx
import { Inter, Playfair_Display } from 'next/font/google'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const playfair = Playfair_Display({
  subsets: ['latin'], 
  variable: '--font-playfair',
  display: 'optional',
})
```

## 🎨 **Usage în Design System**

### **Tailwind Configuration**
```javascript
// tailwind.config.ts
module.exports = {
  theme: {
    fontFamily: {
      sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
      display: ['var(--font-playfair)', 'Georgia', 'serif'],
    }
  }
}
```

### **CSS Custom Properties**
```css
:root {
  --font-inter: 'Inter', system-ui, sans-serif;
  --font-playfair: 'Playfair Display', Georgia, serif;
}
```

## 📊 **Font Metrics**

| **Font** | **Size** | **Load Priority** | **Usage** |
|----------|----------|-------------------|-----------|
| Inter 400 | ~15KB | Critical | Body text |
| Inter 600 | ~15KB | High | Buttons, labels |
| Playfair 400 | ~25KB | Optional | Hero titles |
| Inter 300 | ~15KB | Low | Light text |
| Inter 700 | ~15KB | Medium | Headings |

## 🌐 **Fallback Strategy**

```css
/* Robust fallback stack */
font-family: 
  'Inter',                    /* Primary */
  -apple-system,              /* macOS/iOS */
  BlinkMacSystemFont,         /* Chrome on macOS */
  'Segoe UI',                 /* Windows */
  Roboto,                     /* Android */
  system-ui,                  /* Generic system */
  sans-serif;                 /* Final fallback */
```

## 🔧 **Local Development**

Pentru development local, fonturile se încarcă din:
1. **Local files** (acest folder)  
2. **Google Fonts** (fallback)
3. **System fonts** (ultimate fallback)

## 🚀 **Production Optimization**

În production:
- Fonturile sunt servite via CDN (Vercel)
- Gzip/Brotli compression enabled
- Cache headers: 1 year
- Preload critical fonts în `<head>`

---

**Font License:** SIL Open Font License 1.1  
**Performance Target:** <100ms font load time  
**Accessibility:** Minimum 16px base size, good contrast ratios
