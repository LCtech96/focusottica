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
> `ADMIN_EMAIL` e `ADMIN_PASSWORD` (vedi punto 5), senza modificare i file.
> Finché i default sono attivi, il pannello mostra un avviso giallo.

---

## 2. Come funziona

La home page è composta da **11 gruppi di finestre**, per un totale di
**55 finestre foto**. Ogni gruppo corrisponde a una sezione del sito:

| # | Gruppo | Finestre | Cosa contiene ogni finestra |
|---|--------|----------|------------------------------|
| 1 | Hero — Slider principale | 3 | foto + etichetta, titolo, descrizione, pulsante |
| 2 | Categorie in evidenza | 4 | foto + titolo, descrizione, link |
| 3 | Novità della settimana | 8 | foto + brand, modello, descrizione, prezzo + **foto prova virtuale** |
| 4 | Brand partner | 12 | logo + nome brand |
| 5 | Editoriale doppio | 2 | foto + etichetta, titolo, descrizione, pulsante |
| 6 | I più venduti | 8 | foto + brand, modello, descrizione, prezzo + **foto prova virtuale** |
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

## 3. Prova virtuale ("Provali")

Nei due caroselli prodotti ogni finestra ha, sotto la foto principale, un
secondo slot: **Foto per la prova virtuale**. Se lo compili, sulla scheda di
quel modello compare il pulsante **Provali**; se lo lasci vuoto, il pulsante
non compare. Si attiva quindi un modello alla volta, con i tuoi tempi.

### Com'è fatta la foto giusta

- **PNG con sfondo trasparente** (non JPG: il JPG non ha trasparenza)
- Solo la **montatura**, vista **frontale e dritta**
- Aste ripiegate dietro o tagliate via
- La montatura deve toccare i bordi destro e sinistro dell'immagine: il
  software la scala sulla larghezza, quindi il margine bianco falsa la misura
- Indicativamente 1000 × 400 px

> **La frontalità è il punto critico.** Le foto di catalogo sono quasi sempre
> scatti di tre quarti, con l'asta che sporge di lato. Sovrapposte a un viso le
> due lenti si aprono a "V" e si vede che qualcosa non torna, e la prospettiva
> non è correggibile a posteriori. Su nove foto del nostro catalogo, solo una
> era abbastanza frontale (1° di inclinazione) da dare un risultato buono.
>
> Come scattarla bene, basta un telefono: montatura aperta appoggiata su un
> foglio bianco, telefono **parallelo** al foglio, esattamente sopra, senza
> inclinazione. Poi si scontorna il fondo bianco.

Nell'anteprima dell'admin questo slot ha lo sfondo a scacchi: se vedi il
bianco invece degli scacchi, la foto **non** è trasparente e sul viso apparirà
un rettangolo bianco.

### Come funziona per il cliente

Apre il pulsante *Provali*, legge l'avviso, autorizza la fotocamera e si vede
con gli occhiali addosso. Può regolare **dimensione** e **altezza** con due
cursori, scattare una foto e scriverti su WhatsApp.

Due limiti da conoscere, perché è una sovrapposizione 2D e non un modello 3D:
- di fronte la resa è buona, girando la testa di lato si nota che è piatta
- la montatura non viene occlusa dal viso o dai capelli

### Privacy — da sistemare prima di andare online

Il video **non lascia il browser del cliente**: il riconoscimento avviene sul
suo dispositivo e non inviamo né salviamo alcuna immagine. Anche il motore di
riconoscimento e il modello sono ospitati sul nostro dominio
(`public/mediapipe/`), quindi la prova non genera richieste verso servizi
esterni: nessun dato del visitatore raggiunge terze parti.

Resta comunque da **aggiungere un paragrafo all'informativa privacy**. Testo
pronto da adattare con il vostro consulente:

> **Prova virtuale degli occhiali.** Se scegli di usare la funzione "Provali",
> il sito richiede l'accesso alla fotocamera del tuo dispositivo. Le immagini
> riprese sono elaborate esclusivamente in locale, all'interno del tuo browser,
> per il tempo della sessione: non vengono trasmesse ai nostri server né a
> terzi, non vengono registrate e non vengono conservate. L'eventuale foto che
> scegli di salvare resta unicamente sul tuo dispositivo. Puoi interrompere in
> qualsiasi momento chiudendo la finestra: la fotocamera si spegne
> immediatamente. Base giuridica: consenso, che presti attivando la fotocamera.

> ⚠️ Non sono un consulente legale: fai validare il testo da chi segue la
> vostra privacy policy.

---

## 4. Cambiare il numero di finestre

Il numero di finestre di ogni gruppo è definito in un unico file:
[`lib/site-content.ts`](lib/site-content.ts), campo `windows`.

Modificando quel numero si aggiornano **insieme** la home page e il pannello
admin: non serve toccare altro.

---

## 5. Configurazione (variabili d'ambiente)

Su Vercel: *Settings → Environment Variables*. In locale: file `.env.local`
(vedi [`.env.example`](.env.example)).

| Variabile | Obbligatoria | A cosa serve |
|---|---|---|
| `ADMIN_EMAIL` | consigliata | Email di accesso (default: `shop@otticafocus.com`) |
| `ADMIN_PASSWORD` | **sì in produzione** | Password di accesso |
| `AUTH_SECRET` | **sì in produzione** | Chiave con cui viene firmato il cookie di sessione. Una stringa casuale lunga: `openssl rand -base64 32` |
| `BLOB_READ_WRITE_TOKEN` | **sì su Vercel** | Token di Vercel Blob, dove finiscono foto e testi |

### Perché `BLOB_READ_WRITE_TOKEN` è necessario su Vercel

Su Vercel il disco delle funzioni è **di sola lettura** (tranne `/tmp`). Senza
Vercel Blob il pannello admin quindi **non riesce a salvare nulla**: né le foto
né i testi. Non è una perdita di dati al deploy successivo — è proprio il
salvataggio che non parte.

Il sito pubblico continua a funzionare normalmente (mostra i contenuti di
default) e il pannello resta navigabile, ma ogni *Salva e pubblica* risponde con
un errore esplicito, e la dashboard mostra un avviso rosso.

Attivazione: Vercel Dashboard → *Storage* → *Create Database* → **Blob** →
collegalo al progetto. Vercel aggiunge la variabile da solo; poi **fai un
redeploy**, altrimenti il sito già online continua a girare senza il token.

Lo store può essere indifferentemente **Private** o pubblico: salviamo i file
come `private` e li serviamo dalla route `/media/[file]` del sito, mai con
l'URL diretto dello store. Così le foto stanno sul vostro dominio e non
dipendono dalla modalità scelta.

Senza quel token il progetto usa il **filesystem locale** (`data/site-content.json`
e `data/uploads/`), comodo in sviluppo o su un server Node tradizionale. Il
pannello indica sempre quale dei due driver è attivo.

---

## 6. Domande frequenti

**Ho caricato una foto ma sul sito non si vede.**
Controlla di aver premuto *Salva e pubblica* in fondo alla pagina del gruppo.

**Posso lasciare una finestra vuota?**
Sì. Al posto della foto mancante compare un segnaposto grigio e il layout resta
invariato. Nei gruppi *Brand partner* e *Servizi e garanzie* la foto è proprio
facoltativa: senza immagine vengono mostrati rispettivamente il nome del brand e
un'icona.

**Come si esce?**
Pulsante *Esci* in alto a destra nella dashboard.

**Il pulsante "Provali" non compare su un modello.**
Manca la foto per la prova virtuale su quella finestra, oppure non è stata
salvata. Controlla il contatore "con prova virtuale attiva" nella dashboard.

**La montatura appare storta o sproporzionata nella prova.**
Quasi sempre la foto ha margini vuoti attorno alla montatura, o non è dritta.
Ritagliala stretta sui bordi della montatura e ricaricala.
