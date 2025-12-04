# 🔐 Configurazione Database - Focus Ottica

> ⚠️ **IMPORTANTE:** Questo documento NON contiene credenziali sensibili. Tutte le credenziali devono essere configurate localmente tramite variabili d'ambiente.

---

## 📋 Panoramica

Focus Ottica utilizza:
- **Database:** Neon Postgres (serverless)
- **Autenticazione:** Stack Auth (opzionale)
- **Hosting:** Vercel
- **Immagini:** Statiche in `/public/products/`

---

## 🔧 Setup Locale

### 1. Crea File `.env.local`

Nella root del progetto, crea un file `.env.local`:

```env
# Neon Database API
NEXT_PUBLIC_NEON_DATA_API_URL=https://your-endpoint.neon.tech/your-database/rest/v1

# Stack Auth (opzionale)
NEXT_PUBLIC_STACK_PROJECT_ID=your-project-id
NEXT_PUBLIC_STACK_PUBLISHABLE_CLIENT_KEY=your-publishable-key
```

**Dove ottenere le credenziali:**
- Neon: [console.neon.tech](https://console.neon.tech) → Seleziona progetto → Connection Details
- Stack Auth: [stack-auth.com](https://stack-auth.com) → Dashboard → API Keys

### 2. Verifica `.gitignore`

Assicurati che `.env.local` sia ignorato:

```gitignore
# .gitignore già configurato
.env*.local
.env
```

---

## 🗄️ Schema Database

### Esegui lo Schema SQL

1. Apri [console.neon.tech](https://console.neon.tech)
2. Seleziona il tuo progetto
3. **SQL Editor** → Copia il contenuto da `database/schema.sql`
4. **Run** per creare tabelle e policies

Lo schema include:
- ✅ Tabella `products` per gli occhiali
- ✅ Row Level Security (RLS) abilitato
- ✅ Policies per lettura pubblica e scrittura autenticata
- ✅ Dati di esempio (9 occhiali Gucci)

---

## 🖼️ Immagini Prodotti

Le immagini sono in `public/products/`:

**Occhiali:**
- `gucci-2.jpg` → `gucci-10.jpg` (9 modelli)

**Sezioni:**
- `sfondo-hero.png` (Hero background)
- `Chi-siamo.png` (About section)

---

## 🚀 Deploy su Vercel

### 1. Configura Environment Variables

Vercel Dashboard → Progetto → Settings → Environment Variables

Aggiungi:
```
NEXT_PUBLIC_NEON_DATA_API_URL = your_neon_url
NEXT_PUBLIC_STACK_PROJECT_ID = your_project_id
NEXT_PUBLIC_STACK_PUBLISHABLE_CLIENT_KEY = your_key
```

### 2. Deploy Automatico

Ogni push su GitHub triggera automaticamente:
1. Build Next.js
2. Ottimizzazione immagini
3. Deploy production

---

## 🔒 Best Practices Sicurezza

### ✅ DO - Cosa Fare

- ✅ Usare sempre variabili d'ambiente
- ✅ Verificare `.gitignore` prima di commit
- ✅ Rotare credenziali periodicamente
- ✅ Usare RLS sul database
- ✅ Separare credenziali dev/prod

### ❌ DON'T - Cosa Non Fare

- ❌ Committare file `.env*`
- ❌ Hardcodare credenziali nel codice
- ❌ Condividere credenziali via chat/email
- ❌ Usare stesse credenziali per dev e prod
- ❌ Includere credenziali in documentazione

---

## 📊 Architettura Corrente

```
Focus Ottica
│
├── Frontend (Next.js 14)
│   ├── Static Gallery (dati hardcoded)
│   ├── Immagini in /public/
│   └── Deploy su Vercel
│
├── Database (Opzionale)
│   ├── Neon Postgres
│   ├── Schema in database/schema.sql
│   └── API REST endpoint
│
└── Auth (Opzionale)
    └── Stack Auth
```

**Nota:** Attualmente la gallery usa **dati statici** (hardcoded in `Gallery.tsx`). La connessione al database è opzionale e per uso futuro.

---

## 🛠️ Sviluppo Locale

```bash
# Installa dipendenze
npm install

# Avvia dev server
npm run dev

# Build production
npm run build

# Preview production
npm start
```

Sito disponibile su: `http://localhost:3000`

---

## 🆘 Troubleshooting

### Immagini non visibili

**Problema:** 404 sulle immagini  
**Soluzione:**
1. Verifica che i file siano in `public/products/`
2. Nomi file: `gucci-2.jpg` a `gucci-10.jpg`
3. Forza redeploy su Vercel se necessario

### Build fallisce su Vercel

**Problema:** Errori durante il build  
**Soluzione:**
1. Verifica ESLint locale: `npm run lint`
2. Controlla environment variables su Vercel
3. Controlla logs di build su Vercel Dashboard

### Database non risponde

**Problema:** Errori di connessione  
**Soluzione:**
1. Verifica che il progetto Neon sia attivo
2. Controlla l'URL in `.env.local`
3. Testa la connessione dal SQL Editor di Neon

---

## 📚 Risorse

- **Next.js:** [nextjs.org/docs](https://nextjs.org/docs)
- **Neon:** [neon.tech/docs](https://neon.tech/docs)
- **Vercel:** [vercel.com/docs](https://vercel.com/docs)
- **Stack Auth:** [docs.stack-auth.com](https://docs.stack-auth.com)

---

## 🔐 Sicurezza delle Credenziali

### Se le Credenziali Sono State Esposte

**Azioni immediate:**

1. **Rigenera Database Neon:**
   - console.neon.tech → Elimina progetto
   - Crea nuovo progetto con nuovo nome
   - Ottieni nuovo URL API

2. **Rigenera Stack Auth Keys:**
   - stack-auth.com → Settings → Regenerate Keys

3. **Aggiorna Configurazione:**
   - Aggiorna `.env.local` locale
   - Aggiorna Environment Variables su Vercel
   - Redeploy

4. **Verifica:**
   - Testa sito locale
   - Testa sito production
   - Monitora logs per accessi anomali

### Checklist Sicurezza

- [ ] `.env.local` in `.gitignore`
- [ ] Nessuna credenziale in DATABASE_SETUP.md
- [ ] Nessuna credenziale in schema.sql
- [ ] Environment variables configurate su Vercel
- [ ] Credenziali diverse per dev/prod
- [ ] Database con RLS abilitato

---

**Ricorda:** La sicurezza è una responsabilità continua! 🔒

**Ultimo aggiornamento:** Dicembre 2025
