# 📊 Logs Directory

Acest folder conține log-urile aplicației Vantage Lane 2.0.

## 📝 **Tipuri de Log-uri**

### **Development Logs**
- `app.log` - Log-uri generale ale aplicației
- `audit.log` - Log-uri de audit pentru acțiuni utilizatori  
- `errors.log` - Log-uri de erori și excepții
- `api.log` - Log-uri pentru requesturile API
- `security.log` - Log-uri de securitate și autentificare

### **Format Log-uri**
Toate log-urile sunt în format **JSON structured** folosind **Pino logger**:

```json
{
  "level": 30,
  "time": 1634567890123,
  "msg": "User login successful",
  "userId": "user123",
  "ip": "192.168.1.1",
  "userAgent": "Mozilla/5.0..."
}
```

## 🔄 **Rotația Log-urilor**

Log-urile sunt rotite automat:
- **Zilnic** pentru fișierele mari (>100MB)
- **Păstrare**: 30 zile în development, 90 zile în production
- **Compresie**: Log-urile vechi sunt comprimate cu gzip

## 🚀 **Usage în Development**

```bash
# Urmărește log-urile în timp real
tail -f logs/app.log

# Filtrează doar erorile
cat logs/app.log | jq 'select(.level >= 50)'

# Caută după user ID
cat logs/audit.log | jq 'select(.userId == "user123")'
```

## 🛡️ **Securitate**

- Log-urile **NU** conțin parole, token-uri sau date sensibile
- IP-urile sunt anonimizate în production 
- Date personale sunt mascate conform GDPR

## ⚠️ **Important**

- Nu edita manual fișierele de log
- Nu commitui log-urile în Git (.gitignore le exclude)
- În production, log-urile se trimit către Sentry și monitoring systems

---

**Generat automat de:** Pino Logger v9.0.0  
**Encoding:** UTF-8  
**Time Zone:** UTC  
