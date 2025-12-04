# Configurazione Database Neon e Gallery

⚠️ **IMPORTANTE: Non condividere mai le credenziali del database pubblicamente!**

## 🔒 Sicurezza

Le credenziali reali devono essere configurate **SOLO** nel file `.env.local` (che è già escluso da Git).

**Mai committare:**
- ❌ URL del database
- ❌ API Keys
- ❌ Project IDs
- ❌ Qualsiasi credenziale

---

## 🔧 Setup

### 1. Configura le Variabili d'Ambiente

Crea un file `.env.local` nella root del progetto:

```env
# Neon Database
NEXT_PUBLIC_NEON_DATA_API_URL=your_neon_database_url_here

# Stack Auth (opzionale - per gestione utenti)
NEXT_PUBLIC_STACK_PROJECT_ID=your_stack_project_id_here
NEXT_PUBLIC_STACK_PUBLISHABLE_CLIENT_KEY=your_publishable_key_here
```

**Dove trovare le credenziali:**
- Vai su [console.neon.tech](https://console.neon.tech)
- Seleziona il tuo progetto
- Copia l'URL della Data API
- Per Stack Auth: [stack-auth.com](https://stack-auth.com)

### 2. Verifica .gitignore

Il file `.env.local` è già in `.gitignore`:

```gitignore
# local env files
.env*.local
.env
```

### 3. Crea lo Schema Database

1. Vai su [console.neon.tech](https://console.neon.tech)
2. Apri il tuo progetto
3. SQL Editor → Copia il contenuto di `database/schema.sql`
4. Esegui lo script

### 4. Carica le Immagini

Salva le immagini degli occhiali in `public/products/`:

- `gucci-1.jpg` → `gucci-9.jpg` (occhiali)
- `sfondo-hero.png` (hero section)
- `Chi-siamo.png` (about section)

---

## 🚀 Deploy su Vercel

1. Dashboard Vercel → Progetto → Settings → Environment Variables
2. Aggiungi le stesse variabili del tuo `.env.local`
3. ⚠️ Mai fare commit di `.env.local`!

---

## 🛡️ Se le Credenziali Sono State Esposte

**Azioni immediate:**

1. **Rigenera le credenziali su Neon:**
   - [console.neon.tech](https://console.neon.tech) → Elimina e ricrea API keys

2. **Rigenera le chiavi Stack Auth:**
   - [stack-auth.com](https://stack-auth.com) → Rigenera le chiavi

3. **Aggiorna `.env.local`** con le nuove credenziali

4. **Aggiorna Vercel:**
   - Environment Variables → Sostituisci con le nuove credenziali

---

## 📝 Utilizzo

### Test Locale
```bash
npm run dev
```

Visita `http://localhost:3000`

### Connessione Database (Opzionale)

Per collegare dinamicamente il database:
1. Installa il client Neon
2. Crea API route in `app/api/products/route.ts`
3. Aggiorna `Gallery.tsx` per fetchare dal database

Attualmente la gallery usa dati statici (più semplice e veloce).

---

## 🆘 Troubleshooting

**Immagini non visibili:**
- Verifica che i file siano in `public/products/`
- Controlla i nomi dei file

**Build fallisce su Vercel:**
- Aggiungi environment variables su Vercel
- Verifica che non ci siano errori di sintassi

**Database non risponde:**
- Verifica che il progetto Neon sia attivo
- Controlla che l'URL sia corretto in `.env.local`

---

## ✅ Checklist Sicurezza

- [x] `.env.local` in `.gitignore`
- [x] Mai committare credenziali
- [x] Usare environment variables su Vercel
- [x] Rigenerare chiavi se esposte pubblicamente
- [x] Documentazione senza credenziali

---

**Ricorda:** La sicurezza delle credenziali è fondamentale! 🔒
