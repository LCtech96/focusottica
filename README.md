# Focus Ottica - Sito Web

Sito web per Focus Ottica, ottica storica di Castellammare del Golfo (TP) con 25 anni di esperienza.

## Tecnologie

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- Lucide React (icone)
- Vercel Blob (archiviazione delle foto caricate dal pannello admin)
- MediaPipe Face Landmarker (prova virtuale degli occhiali, in-browser)

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
**12 gruppi di finestre** foto, per un totale di **57 finestre**:

1. Hero — slider principale (3 finestre)
2. Categorie in evidenza (4)
3. Occhiali da sole — prova virtuale (2)
4. Novità della settimana (8)
5. Brand partner (12)
6. Editoriale doppio (2)
7. I più venduti (8)
8. Banner a tutta larghezza (1)
9. Scegli per forma (6)
10. Lookbook / Community (6)
11. Servizi e garanzie (4)
12. Newsletter / Appuntamento (1)

Tutti i gruppi sono descritti in un unico file, [`lib/site-content.ts`](lib/site-content.ts):
è la sorgente di verità da cui la home page prende la propria struttura e da cui
il pannello admin genera l'elenco dei gruppi modificabili.

## Area riservata

Foto e descrizioni si caricano da `/admin`, senza toccare il codice.
Istruzioni complete, credenziali e configurazione: **[ADMIN.md](ADMIN.md)**.

## Prova virtuale

La sezione **Occhiali da sole** (menu ☰ → *Occhiali da sole*, ancora `#sole`) è
la vetrina della funzione: due montature affiancate, entrambe con un pulsante
*Provali* in evidenza. Anche nei caroselli prodotti ogni modello con una **foto
per la prova virtuale** (PNG trasparente della sola montatura) mostra lo stesso
pulsante: il cliente si vede gli occhiali addosso usando la fotocamera.

Il riconoscimento del viso gira interamente nel browser tramite MediaPipe Face
Landmarker compilato in WebAssembly. **Il video non viene inviato a nessun
server**, e motore e modello sono serviti dal nostro dominio
(`public/mediapipe/`, ~16 MB), quindi non c'è nessuna richiesta a terze parti.
Il modello viene scaricato solo al primo clic su *Provali*, non all'apertura
del sito.

Dettagli operativi e testo per l'informativa privacy: **[ADMIN.md](ADMIN.md)**.

## Caratteristiche

- Struttura e-commerce con slider, caroselli prodotti, griglia brand e lookbook
- Prova virtuale degli occhiali via webcam, senza servizi esterni
- Pannello admin per caricare foto e descrizioni di ogni finestra
- Integrazione social media (Facebook, Instagram)
- Pulsanti WhatsApp per contatti diretti
- Mappa Google Maps
- Design responsive
