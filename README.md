# Focus Ottica - Sito Web

Sito web per Focus Ottica, ottica storica di Castellammare del Golfo (TP) con 25 anni di esperienza.

## Tecnologie

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- Lucide React (icone)
- Vercel Blob (archiviazione delle foto caricate dal pannello admin)

## Installazione

```bash
npm install
cp .env.example .env.local   # poi compila i valori
```

## Sviluppo

```bash
npm run dev
```

Apri [http://localhost:3000](http://localhost:3000) nel browser.

## Build

```bash
npm run build
npm start
```

## Struttura della home page

La home page segue l'impianto di un e-commerce di occhiali ed è composta da
**11 gruppi di finestre** foto, per un totale di **55 finestre**:

1. Hero — slider principale (3 finestre)
2. Categorie in evidenza (4)
3. Novità della settimana (8)
4. Brand partner (12)
5. Editoriale doppio (2)
6. I più venduti (8)
7. Banner a tutta larghezza (1)
8. Scegli per forma (6)
9. Lookbook / Community (6)
10. Servizi e garanzie (4)
11. Newsletter / Appuntamento (1)

Tutti i gruppi sono descritti in un unico file, [`lib/site-content.ts`](lib/site-content.ts):
è la sorgente di verità da cui la home page prende la propria struttura e da cui
il pannello admin genera l'elenco dei gruppi modificabili.

## Area riservata

Foto e descrizioni si caricano da `/admin`, senza toccare il codice.
Istruzioni complete, credenziali e configurazione: **[ADMIN.md](ADMIN.md)**.

## Caratteristiche

- Struttura e-commerce con slider, caroselli prodotti, griglia brand e lookbook
- Pannello admin per caricare foto e descrizioni di ogni finestra
- Integrazione social media (Facebook, Instagram)
- Pulsanti WhatsApp per contatti diretti
- Mappa Google Maps
- Design responsive
