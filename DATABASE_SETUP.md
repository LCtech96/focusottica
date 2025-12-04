# Configurazione Database Neon e Gallery

## 📋 Informazioni Database

⚠️ **IMPORTANTE: Non condividere mai le credenziali del database pubblicamente!**

Le credenziali reali devono essere configurate solo nel file `.env.local` (che è già escluso da Git).

## 🔧 Setup Passo per Passo

### 1. Configura le Variabili d'Ambiente

Crea un file `.env.local` nella root del progetto con questo contenuto:

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
- Per Stack Auth, vai su [stack-auth.com](https://stack-auth.com) e copia le chiavi del tuo progetto

### 2. Crea lo Schema Database

Vai su [console.neon.tech](https://console.neon.tech) e esegui lo script SQL che trovi in `database/schema.sql`.

Oppure usa il Neon SQL Editor:
1. Apri il tuo progetto Neon
2. Vai su "SQL Editor"
3. Copia e incolla il contenuto di `database/schema.sql`
4. Esegui lo script

### 3. Carica le Immagini dei Prodotti

Salva le immagini degli occhiali nella cartella `public/products/` con questi nomi:

- `gucci-1.jpg` - Occhiali esagonali oro
- `gucci-2.jpg` - Occhiali rettangolari oro  
- `gucci-3.jpg` - Occhiali con dettagli viola
- `gucci-4.jpg` - Occhiali cat-eye rosa
- `gucci-5.jpg` - Occhiali shield argento
- `gucci-6.jpg` - Occhiali cat-eye neri
- `gucci-7.jpg` - Occhiali quadrati neri
- `gucci-8.jpg` - Occhiali aviator
- `gucci-9.jpg` - Occhiali bianchi marmorizzati

**Come fare:**
1. Salva ogni immagine ricevuta
2. Rinominale secondo la lista sopra
3. Mettile tutte in `public/products/`

### 4. Verifica .gitignore

Assicurati che `.env.local` sia ignorato da Git (è già nel `.gitignore`).

```gitignore
# local env files
.env*.local
.env
```

### 5. Testa in Locale

```bash
npm run dev
```

Vai su `http://localhost:3000` e scorri fino alla sezione "Nuovi Arrivi" per vedere la gallery.

### 6. Deploy su Vercel

Quando fai il push su GitHub, aggiungi le variabili d'ambiente su Vercel:

1. Vai su Vercel Dashboard
2. Seleziona il progetto "focusottica"
3. Settings → Environment Variables
4. Aggiungi le stesse variabili che hai in `.env.local`

⚠️ **Mai fare commit di file `.env.local` o credenziali!**

## 📝 Note Importanti

- ✅ La gallery è già integrata nella homepage
- ✅ Il menu di navigazione include la voce "Collezione"
- ✅ Per ora usa placeholder temporanei per le immagini
- ✅ Le immagini devono essere in formato JPG o PNG
- ✅ Dimensione consigliata: 800x800px o superiore
- 🔒 Tutte le credenziali devono essere in `.env.local`, MAI nel codice

## 🔄 Prossimi Passi (Opzionale)

Se vuoi connettere il database dinamicamente:
1. Installa il pacchetto per le chiamate API
2. Crea una route API in `app/api/products/route.ts`
3. Modifica `Gallery.tsx` per fetchare i dati dal database

Per ora, le immagini e i dati sono gestiti staticamente nel componente Gallery.

## 🆘 Troubleshooting

**Problema:** Le immagini non si vedono
- Soluzione: Controlla che i file siano in `public/products/` con i nomi corretti
- Per ora vedrai placeholder colorati

**Problema:** Build fallisce su Vercel
- Soluzione: Aggiungi le variabili d'ambiente su Vercel Dashboard

**Problema:** Database non risponde
- Soluzione: Verifica che il progetto Neon sia attivo su console.neon.tech

## 🔐 Sicurezza

**IMPORTANTE:**
- ✅ `.env.local` è già nel `.gitignore`
- ❌ Mai fare commit di credenziali
- ❌ Mai condividere URL del database pubblicamente
- ✅ Usa variabili d'ambiente su Vercel per production
- ✅ Rigenera le chiavi se sono state esposte pubblicamente

Se hai accidentalmente fatto commit di credenziali:
1. Rigenera immediatamente le chiavi su Neon e Stack Auth
2. Aggiorna `.env.local` con le nuove credenziali
3. Aggiorna le variabili d'ambiente su Vercel
