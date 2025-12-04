# Configurazione Database Neon e Gallery

## 📋 Informazioni Database

- **Project Name:** purple-thunder-58179640
- **Database URL:** `https://ep-royal-breeze-ahycwxpf.apirest.c-3.us-east-1.aws.neon.tech/neondb/rest/v1`
- **Region:** AWS US East 1 (N. Virginia)

## 🔧 Setup Passo per Passo

### 1. Configura le Variabili d'Ambiente

Crea un file `.env.local` nella root del progetto con questo contenuto:

```env
# Neon Database
NEXT_PUBLIC_NEON_DATA_API_URL=https://ep-royal-breeze-ahycwxpf.apirest.c-3.us-east-1.aws.neon.tech/neondb/rest/v1

# Stack Auth (opzionale - per gestione utenti)
NEXT_PUBLIC_STACK_PROJECT_ID=96a79480-5e10-401b-ae99-bc0ef664cef8
NEXT_PUBLIC_STACK_PUBLISHABLE_CLIENT_KEY=pck_64q2fecwsd2x3e981915fjdgmavp5hxjnmmyjhqpf0r90
```

### 2. Crea lo Schema Database

Vai su [console.neon.tech](https://console.neon.tech) e esegui lo script SQL che trovi in `database/schema.sql`.

Oppure usa il Neon SQL Editor:
1. Apri il progetto "purple-thunder-58179640"
2. Vai su "SQL Editor"
3. Copia e incolla il contenuto di `database/schema.sql`
4. Esegui lo script

### 3. Carica le Immagini dei Prodotti

Hai ricevuto 9 immagini di occhiali Gucci. Salvale nella cartella `public/products/` con questi nomi:

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

### 4. Aggiorna .gitignore

Assicurati che `.env.local` sia ignorato da Git (è già nel `.gitignore`).

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
4. Aggiungi:
   - `NEXT_PUBLIC_NEON_DATA_API_URL`
   - (opzionale) Le altre variabili Stack Auth

## 📝 Note Importanti

- ✅ La gallery è già integrata nella homepage
- ✅ Il menu di navigazione include la voce "Collezione"
- ✅ Per ora usa dati statici, puoi connettere il database in seguito
- ✅ Le immagini devono essere in formato JPG o PNG
- ✅ Dimensione consigliata: 800x800px o superiore

## 🔄 Prossimi Passi (Opzionale)

Se vuoi connettere il database dinamicamente:
1. Installa il pacchetto per le chiamate API
2. Crea una route API in `app/api/products/route.ts`
3. Modifica `Gallery.tsx` per fetchare i dati dal database

Per ora, le immagini e i dati sono gestiti staticamente nel componente Gallery.

## 🆘 Troubleshooting

**Problema:** Le immagini non si vedono
- Soluzione: Controlla che i file siano in `public/products/` con i nomi corretti

**Problema:** Build fallisce su Vercel
- Soluzione: Aggiungi le variabili d'ambiente su Vercel

**Problema:** Database non risponde
- Soluzione: Verifica che il progetto Neon sia attivo su console.neon.tech

