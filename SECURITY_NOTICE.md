# 🔒 Avviso di Sicurezza

## ⚠️ Credenziali Esposte nella Cronologia Git

**Data:** 4 Dicembre 2025  
**Gravità:** Media

---

## 📋 Situazione

Le credenziali del database Neon e di Stack Auth sono state accidentalmente committat e nei seguenti commit:

- Commit `a893a09`: "Add product gallery with Neon database integration and Gucci collection"
- File coinvolto: `DATABASE_SETUP.md`

**Credenziali esposte:**
- ❌ URL Database Neon
- ❌ Project ID Neon
- ❌ Stack Auth Project ID
- ❌ Stack Auth Publishable Client Key

---

## ✅ Azioni Correttive Già Implementate

1. ✅ Rimosso credenziali dal file `DATABASE_SETUP.md` (commit `b83c90e`)
2. ✅ Creata nuova versione sicura della documentazione
3. ✅ Rimosso riferimenti specifici da `database/schema.sql`
4. ✅ Verificato che `.env.local` sia in `.gitignore`

---

## 🚨 AZIONI RICHIESTE IMMEDIATAMENTE

### 1. Rigenera le Credenziali Neon

```bash
# Vai su console.neon.tech
# 1. Apri il progetto
# 2. Settings → Delete Project (o crea nuovo progetto)
# 3. Crea un nuovo progetto con nuovo nome
# 4. Ottieni il nuovo URL della Data API
```

### 2. Rigenera le Chiavi Stack Auth

```bash
# Vai su stack-auth.com
# 1. Dashboard → Project Settings
# 2. Rigenera le API Keys
# 3. Copia le nuove chiavi
```

### 3. Aggiorna la Configurazione Locale

```bash
# Modifica .env.local con le NUOVE credenziali
NEXT_PUBLIC_NEON_DATA_API_URL=<nuovo_url_neon>
NEXT_PUBLIC_STACK_PROJECT_ID=<nuovo_project_id>
NEXT_PUBLIC_STACK_PUBLISHABLE_CLIENT_KEY=<nuova_chiave>
```

### 4. Aggiorna Vercel

```bash
# Dashboard Vercel → focusottica → Settings → Environment Variables
# Aggiorna tutte le variabili con i NUOVI valori
# Trigger un redeploy
```

---

## 🔐 Best Practices per il Futuro

### DO ✅
- ✅ Usare sempre `.env.local` per le credenziali
- ✅ Verificare `.gitignore` prima di committare
- ✅ Fare code review prima del push
- ✅ Usare placeholder nei file di documentazione
- ✅ Rotare le credenziali periodicamente

### DON'T ❌
- ❌ Mai committare file `.env` o `.env.local`
- ❌ Mai includere credenziali nella documentazione
- ❌ Mai condividere credenziali via chat/email
- ❌ Mai usare credenziali in nome file o commenti
- ❌ Mai usare le stesse credenziali per dev e prod

---

## 📊 Valutazione del Rischio

**Livello di Rischio:** 🟡 Medio

**Perché Medio e non Alto:**
- Le chiavi Stack Auth "publishable" sono progettate per essere pubbliche
- Le chiavi esposte NON includono secret keys
- Il database Neon ha RLS (Row Level Security) abilitato
- Il repository è probabilmente privato

**Perché non Basso:**
- Gli URL identificano risorse specifiche
- Possibile enumerazione di risorse
- Le chiavi permettono l'accesso a servizi specifici

---

## 🔄 Prossimi Passi

1. [ ] Rigenera credenziali Neon ⚠️ PRIORITÀ ALTA
2. [ ] Rigenera chiavi Stack Auth ⚠️ PRIORITÀ ALTA
3. [ ] Aggiorna `.env.local` locale
4. [ ] Aggiorna variabili su Vercel
5. [ ] Testa il sito in locale con nuove credenziali
6. [ ] Testa il sito su Vercel dopo il deploy
7. [ ] Elimina questo file dopo aver completato le azioni

---

## 📞 Supporto

**Neon Support:**
- [console.neon.tech](https://console.neon.tech)
- [Docs](https://neon.tech/docs)

**Stack Auth Support:**
- [stack-auth.com](https://stack-auth.com)
- [Docs](https://docs.stack-auth.com)

**Vercel Support:**
- [vercel.com/support](https://vercel.com/support)

---

## ✅ Checklist Completamento

Una volta completate tutte le azioni sopra:

```bash
# Elimina questo file
git rm SECURITY_NOTICE.md
git commit -m "Remove security notice after credential rotation"
git push
```

---

**Ultimo aggiornamento:** 4 Dicembre 2025  
**Stato:** 🔴 Azioni richieste

