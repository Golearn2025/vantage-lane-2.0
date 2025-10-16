# 🤖 Claude AI - Prompt Template pentru Vantage Lane 2.0

**Prompt oficial pentru inițializarea Claude în proiectul Vantage Lane 2.0**

## 🎯 **PROMPT PRINCIPAL**

```
You are working on Vantage Lane 2.0, a premium luxury chauffeur booking platform.

🔒 MANDATORY GOVERNANCE COMPLIANCE:

Before ANY modification, you MUST:

1. 📚 READ these documents completely:
   - docs/AI_RULES.md
   - docs/QUALITY-GATE.md  
   - docs/FREEZE-LIST.md
   - docs/CHECKLIST.md
   - docs/ARCHITECTURE.md
   - docs/DEVELOPMENT_GUIDELINES.md

2. 🔒 CHECK FREEZE-LIST compliance:
   If modifying ANY file in FREEZE-LIST.md → ASK EXPLICIT PERMISSION:
   
   "🔒 FREEZE-LIST ALERT: 
   File [filename] is protected. 
   MAY I MODIFY IT? 
   Waiting for explicit YES/NO."

3. ✅ AFTER every change, EXECUTE:
   ```bash
   pnpm quality-gate
   ```
   
   Report results as:
   ```
   ✅ Quality Gate Status:
   - ESLint: PASSED/FAILED
   - TypeScript: PASSED/FAILED  
   - Tests: PASSED/FAILED
   - Custom Audit: PASSED/FAILED
   
   Overall: ✅ PASSED / ❌ FAILED
   ```

🚫 FAILURE PROTOCOL:
If ANY check FAILS:
1. STOP immediately
2. DELETE changes if made
3. REPORT exact failure
4. WAIT for instructions

📋 TASK COMPLETION:
End each task with:
```
📋 TASK COMPLETION CHECKLIST:
- [x] Read governance documents
- [x] Checked FREEZE-LIST compliance  
- [x] Quality Gate: ✅ PASSED
- [x] File size <250 lines: ✅ PASSED
- [x] Zero 'any' types: ✅ PASSED
- [x] Zero console.log: ✅ PASSED
- [x] Structure compliance: ✅ PASSED
- [x] Tests pass: ✅ PASSED

🎯 FINAL STATUS: ✅ TASK COMPLETED SUCCESSFULLY
```

🏗️ PROJECT CONTEXT:
- Next.js 15 + TypeScript + Tailwind CSS
- Supabase (DB + Auth) + Stripe (Payments) 
- Premium gold brand (#CBB26A)
- Tier system: Bronze → Silver → Gold → Platinum → Elite
- Target: London luxury chauffeur market

Follow this governance protocol 100%. No exceptions.
```

## 🎨 **CONTEXTUAL PROMPTS**

### **For UI Development:**
```
Focus: Creating premium UI components for luxury brand
- Use design tokens from /design-system/tokens/
- Follow brand colors (gold #CBB26A palette)
- Ensure accessibility (WCAG compliance)
- Mobile-first responsive design
- Dark theme support
```

### **For API Development:**
```
Focus: Building robust API endpoints
- Use Zod for input validation
- Implement proper error handling
- Add logging with log.info/log.error
- Include rate limiting considerations
- Follow RESTful conventions
```

### **For Database Work:**
```
Focus: Supabase PostgreSQL operations
- Use RLS (Row Level Security)
- Implement proper audit logging
- Follow database schema in ARCHITECTURE.md
- Consider performance implications
```

## 🔧 **COMMON SCENARIOS**

### **New Feature Request:**
```
I need to add [feature description] to Vantage Lane.

Please:
1. Review ARCHITECTURE.md for context
2. Check FILE_STRUCTURE.md for proper placement
3. Follow DEVELOPMENT_GUIDELINES.md patterns
4. Use CHECKLIST.md for validation
5. Respect FREEZE-LIST.md restrictions
```

### **Bug Fix Request:**
```
There's a bug with [description] in [component/file].

Please:
1. Diagnose the issue following debugging guidelines
2. Implement minimal fix respecting governance
3. Add proper error handling and logging
4. Include regression test if needed
```

### **Code Review:**
```
Please review this code for quality and compliance:

[code block]

Check against:
- DEVELOPMENT_GUIDELINES.md standards
- QUALITY-GATE.md requirements  
- Security best practices
- Performance implications
```

## 📊 **SUCCESS INDICATORS**

Claude is working correctly when:

✅ **Always reads governance docs first**  
✅ **Asks permission for FREEZE-LIST modifications**  
✅ **Runs quality-gate after changes**  
✅ **Reports detailed status**  
✅ **Follows checklist completion**  
✅ **Stops on failures and reports**  
✅ **Maintains file size limits (<250 lines)**  
✅ **Uses proper logging instead of console.log**  
✅ **Follows folder structure exactly**  

## 🚨 **RED FLAGS**

Stop and correct if Claude:

❌ **Modifies files without reading governance**  
❌ **Skips FREEZE-LIST permission requests**  
❌ **Doesn't run quality-gate after changes**  
❌ **Creates files >250 lines**  
❌ **Uses `any` types or `console.log`**  
❌ **Ignores folder structure**  
❌ **Continues after quality gate failures**  

---

## 💡 **Usage Examples**

### **Initialization:**
```
Use the PROMPT PRINCIPAL above to initialize Claude for any Vantage Lane 2.0 work.
```

### **Mid-Session Reminder:**
```
Remember: Follow AI Governance Layer protocol. 
Check docs/AI_RULES.md if uncertain about any restrictions.
```

### **Quality Check:**
```
Please run quality-gate and confirm all checks pass before we proceed.
```

---

**This prompt ensures Claude operates within the established governance framework while maintaining productivity and code quality! 🏆**
