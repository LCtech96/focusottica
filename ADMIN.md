# Pannello Admin — Gestione foto della home page

Il sito ha un'area riservata dalla quale si caricano le foto della home page e si
scrivono le relative descrizioni, senza toccare il codice.

---

## 1. Accesso

| | |
|---|---|
| Indirizzo | `https://<il-tuo-sito>/admin` |
| Email | `shop@otticafocus.com` |
| Password | `123ottica.comfocus/26` |

La sessione dura 8 ore, poi viene chiesto di nuovo il login.

> ⚠️ **Cambia la password prima di andare online.**
> Le credenziali qui sopra sono i valori di default scritti nel codice: chiunque
> legga il repository le conosce. Si sostituiscono con le variabili d'ambiente
> `ADMIN_EMAIL` e `ADMIN_PASSWORD` (vedi punto 4), senza modificare i file.
> Finché i default sono attivi, il pannello mostra un avviso giallo.

---

## 2. Come funziona

La home page è composta da **11 gruppi di finestre**, per un totale di
**55 finestre foto**. Ogni gruppo corrisponde a una sezione del sito:

| # | Gruppo | Finestre | Cosa contiene ogni finestra |
|---|--------|----------|------------------------------|
| 1 | Hero — Slider principale | 3 | foto + etichetta, titolo, descrizione, pulsante |
| 2 | Categorie in evidenza | 4 | foto + titolo, descrizione, link |
| 3 | Novità della settimana | 8 | foto + brand, modello, descrizione, prezzo |
| 4 | Brand partner | 12 | logo + nome brand |
| 5 | Editoriale doppio | 2 | foto + etichetta, titolo, descrizione, pulsante |
| 6 | I più venduti | 8 | foto + brand, modello, descrizione, prezzo |
| 7 | Banner a tutta larghezza | 1 | foto + etichetta, titolo, descrizione, pulsante |
| 8 | Scegli per forma | 6 | foto + nome forma, descrizione |
| 9 | Lookbook / Community | 6 | foto + didascalia |
| 10 | Servizi e garanzie | 4 | foto facoltativa + titolo, descrizione, icona |
| 11 | Newsletter / Appuntamento | 1 | foto + titolo, descrizione, pulsante |

La **dashboard** (`/admin`) elenca tutti i gruppi in ordine di apparizione, con il
numero di finestre, quante hanno già una foto e le miniature.

Aprendo un gruppo si vede **una scheda per ogni finestra**: a sinistra la foto
(con i pulsanti *Carica foto* / *Sostituisci* / cestino), a destra i campi di
testo. In fondo alla pagina il pulsante **Salva e pubblica** rende le modifiche
visibili immediatamente sul sito.

Formati accettati: **JPG, PNG, WEBP, AVIF, GIF**, fino a **8 MB** per foto.
Il formato consigliato di ogni gruppo è indicato in cima alla sua pagina.

---

## 3. Cambiare il numero di finestre

Il numero di finestre di ogni gruppo è definito in un unico file:
[`lib/site-content.ts`](lib/site-content.ts), campo `windows`.

Modificando quel numero si aggiornano **insieme** la home page e il pannello
admin: non serve toccare altro.

---

## 4. Configurazione (variabili d'ambiente)

Su Vercel: *Settings → Environment Variables*. In locale: file `.env.local`
(vedi [`.env.example`](.env.example)).

| Variabile | Obbligatoria | A cosa serve |
|---|---|---|
| `ADMIN_EMAIL` | consigliata | Email di accesso (default: `shop@otticafocus.com`) |
| `ADMIN_PASSWORD` | **sì in produzione** | Password di accesso |
| `AUTH_SECRET` | **sì in produzione** | Chiave con cui viene firmato il cookie di sessione. Una stringa casuale lunga: `openssl rand -base64 32` |
| `BLOB_READ_WRITE_TOKEN` | **sì su Vercel** | Token di Vercel Blob, dove finiscono le foto caricate |

### Perché `BLOB_READ_WRITE_TOKEN` è necessario su Vercel

Su Vercel il disco delle funzioni è di sola lettura ed effimero: senza Vercel
Blob le foto caricate dal pannello **vengono perse al deploy successivo**.

Attivazione: Vercel Dashboard → *Storage* → *Create Database* → **Blob** →
collegalo al progetto. Vercel aggiunge la variabile da solo; poi fai un redeploy.

Senza quel token il progetto usa il **filesystem locale** (`data/site-content.json`
e `data/uploads/`), comodo in sviluppo o su un server Node tradizionale. Il
pannello indica sempre quale dei due driver è attivo.

---

## 5. Domande frequenti

**Ho caricato una foto ma sul sito non si vede.**
Controlla di aver premuto *Salva e pubblica* in fondo alla pagina del gruppo.

**Posso lasciare una finestra vuota?**
Sì. Al posto della foto mancante compare un segnaposto grigio e il layout resta
invariato. Nei gruppi *Brand partner* e *Servizi e garanzie* la foto è proprio
facoltativa: senza immagine vengono mostrati rispettivamente il nome del brand e
un'icona.

**Come si esce?**
Pulsante *Esci* in alto a destra nella dashboard.
