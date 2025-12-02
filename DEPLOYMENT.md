# Guida al Deployment

## Setup Iniziale

1. Clona il repository:
```bash
git clone https://github.com/LCtech96/focusottica.git
cd focusottica
```

2. Installa le dipendenze:
```bash
npm install
```

3. Avvia il server di sviluppo:
```bash
npm run dev
```

Il sito sarà disponibile su [http://localhost:3000](http://localhost:3000)

## Build per Produzione

```bash
npm run build
npm start
```

## Deployment su Vercel (Consigliato)

1. Vai su [vercel.com](https://vercel.com)
2. Connetti il tuo repository GitHub
3. Vercel rileverà automaticamente Next.js e configurerà tutto
4. Il sito sarà live in pochi minuti!

## Deployment su Netlify

1. Vai su [netlify.com](https://netlify.com)
2. Connetti il repository GitHub
3. Imposta:
   - Build command: `npm run build`
   - Publish directory: `.next`
4. Deploy!

## Note

- Il sito è completamente statico e può essere deployato ovunque
- Assicurati che le variabili d'ambiente siano configurate se necessario
- Google Maps richiede una chiave API se vuoi usare funzionalità avanzate



