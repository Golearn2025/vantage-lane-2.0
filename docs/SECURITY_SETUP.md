# 🛡️ VANTAGE LANE – SECURITY & MAINTENANCE GUIDE

Document actualizat: **Octombrie 2025**  
Responsabil: **Cristian M.**  
Proiect: **Vantage Lane 2.0**

---

## 🔍 1. DESCRIERE GENERALĂ

Acest fișier descrie pașii corecți pentru menținerea securității și stabilității
dependințelor din proiectul **Vantage Lane 2.0**.

Proiectul folosește **Next.js 15**, **TypeScript 5**, **Vite**, **TailwindCSS**, **Supabase**  
și diverse pachete auxiliare.  
Unele dintre ele (precum `esbuild` , `vite`, `vitest`, `prismjs`) pot primi ocazional
actualizări de securitate.

---

## ⚠️ 2. VULNERABILITĂȚI CURENTE

### 🧩 ESBUILD / VITE / VITEST
- **Scop:** dezvoltare locală (compilator, dev server, test runner)  
- **Severitate:** Moderată  
- **Impact:** doar în mediul local (nu afectează producția)

### 🎨 PRISMJS / @REACT-EMAIL
- **Scop:** syntax highlighting pentru email templates  
- **Severitate:** Moderată  
- **Impact:** doar la generarea emailurilor, nu în interfața principală

📊 **Concluzie:** risc scăzut.  
Nicio vulnerabilitate nu afectează build-ul public sau datele utilizatorilor.

---

## 🧠 3. PROCEDURĂ DE ÎNTREȚINERE

### 🗓️ O DATĂ PE LUNĂ

1. **Rulează auditul de securitate**
   ```bash
   npm audit --production
   ```
   → verifică doar pachetele care merg în producție.

2. **Actualizează pachetele de bază (safe update)**
   ```bash
   npm update esbuild vite vitest
   ```

3. **Verifică build-ul**
   ```bash
   npm run build
   npm run lint
   ```
   Dacă nu apar erori, ești safe ✅

### 🧰 O DATĂ LA 3-6 LUNI
```bash
npx npm-check-updates -u
npm install
```
→ actualizează toate pachetele la versiuni stabile.

### 🔒 DACĂ APAR VULNERABILITĂȚI NOI
Adaugă această secțiune în `package.json`:
```json
"resolutions": {
  "esbuild": "^0.23.0",
  "vite": "^5.4.10",
  "vitest": "^1.6.0",
  "prismjs": "^1.29.0"
}
```
Apoi reinstalează:
```bash
npm install
```

---

## 🚫 4. LUCRURI DE EVITAT

❌ **Nu folosi** `npm audit fix --force` (poate rupe build-ul)  
❌ **Nu adăuga** pachete vechi (<2023) fără verificarea versiunii  
❌ **Nu ignora** erorile npm audit critice – doar pe cele moderate dev-only  

---

## 🧱 5. REGULI DE SIGURANȚĂ

✅ **Fă backup** la `package-lock.json` și `node_modules/` înainte de actualizări majore  
✅ **Ține actualizate** eslint și prettier  
✅ **Testează local** după fiecare update:
```bash
npm run lint
npm run build
npm run dev
```
✅ **Nu adăuga dependințe nefolosite** – curăță periodic cu:
```bash
npx depcheck
```

---

## 🔎 6. COMENZI UTILE DE DIAGNOSTIC

| Scop | Comandă | Frecvență |
|------|---------|-----------|
| Verificare vulnerabilități reale | `npm audit --production` | lunar |
| Actualizare patch securitate | `npm update esbuild vite vitest` | lunar |
| Actualizare completă stabilă | `npx npm-check-updates -u && npm install` | 3–6 luni |
| Testare build după update | `npm run build` | după fiecare update |
| Curățare dependințe nefolosite | `npx depcheck` | trimestrial |

---

## 📊 7. STATUS ACTUAL (Octombrie 2025)

### ✅ REZOLVATE:
- **@react-email vulnerabilități:** Eliminate prin uninstall (vor fi readăugate când implementăm email templates)
- **ESBUILD dev-only issues:** Monitorizate, risc scăzut

### 🔄 ÎN MONITORIZARE:
- **5 moderate dev-only vulnerabilities** în esbuild/vite/vitest
- **Impact:** Zero pe production build
- **Acțiune:** Update automat în următoarele releases

### 🎯 PRÓXIMI PAȘI:
1. Implementare email system cu @react-email actualizat
2. Monitoring automat lunar cu GitHub Actions
3. Dependency updates trimestriale

---

**📝 Nota:** Acest document se actualizează la fiecare verificare de securitate.
