/**
 * Schema unico della home page.
 *
 * Questo file è la "sorgente di verità": descrive ogni gruppo di finestre
 * (blocchi foto) presente nella home page. La home page legge da qui,
 * e il pannello admin genera automaticamente la stessa lista di gruppi.
 *
 * Per cambiare il numero di finestre di un gruppo basta modificare
 * `windows` qui sotto: home page e admin si aggiornano da soli.
 */

export type FieldType = 'text' | 'textarea' | 'link' | 'price'

export interface FieldDef {
  key: string
  label: string
  type: FieldType
  placeholder?: string
}

export type GroupLayout =
  | 'slider'
  | 'tiles'
  | 'products'
  | 'logos'
  | 'editorial'
  | 'banner'
  | 'shapes'
  | 'lookbook'
  | 'newsletter'
  | 'services'

export interface GroupDef {
  /** id tecnico, usato nelle rotte admin e nel JSON dei contenuti */
  id: string
  /** nome mostrato nel pannello admin */
  label: string
  /** spiegazione breve per chi carica le foto */
  hint: string
  /** posizione nella home page, es. "1ª sezione" */
  position: string
  layout: GroupLayout
  /** numero di finestre foto del gruppo */
  windows: number
  /** formato consigliato dell'immagine */
  ratio: string
  /** dimensione consigliata in pixel */
  recommendedSize: string
  /** true se l'immagine è facoltativa (il blocco funziona anche senza) */
  optionalImage?: boolean
  /** campi testo di ogni finestra */
  fields: FieldDef[]
  /** titolo/sottotitolo della sezione, modificabili da admin */
  heading?: { title: string; subtitle: string }
}

const productFields: FieldDef[] = [
  { key: 'brand', label: 'Brand', type: 'text', placeholder: 'Es. GUCCI' },
  { key: 'name', label: 'Nome modello', type: 'text', placeholder: 'Es. Occhiali Esagonali' },
  {
    key: 'description',
    label: 'Descrizione',
    type: 'textarea',
    placeholder: 'Es. Montatura oro con lenti sfumate marrone',
  },
  { key: 'price', label: 'Prezzo', type: 'price', placeholder: 'Es. 450' },
  { key: 'href', label: 'Link (facoltativo)', type: 'link', placeholder: '#contact' },
]

export const GROUPS: GroupDef[] = [
  {
    id: 'hero',
    label: 'Hero — Slider principale',
    hint: 'Le grandi immagini a tutto schermo in cima alla home page. Si alternano automaticamente.',
    position: '1ª sezione',
    layout: 'slider',
    windows: 3,
    ratio: '16:9 (orizzontale)',
    recommendedSize: '1920 × 1080 px',
    fields: [
      { key: 'eyebrow', label: 'Etichetta piccola', type: 'text', placeholder: 'Es. Nuova collezione' },
      { key: 'title', label: 'Titolo', type: 'text', placeholder: 'Es. Lo sguardo che ti somiglia' },
      { key: 'description', label: 'Descrizione', type: 'textarea' },
      { key: 'ctaLabel', label: 'Testo pulsante', type: 'text', placeholder: 'Es. Scopri la collezione' },
      { key: 'href', label: 'Link pulsante', type: 'link', placeholder: '#collezione' },
    ],
  },
  {
    id: 'categorie',
    label: 'Categorie in evidenza',
    hint: 'I quattro riquadri subito sotto lo slider: sole, vista, lenti a contatto, bambino.',
    position: '2ª sezione',
    layout: 'tiles',
    windows: 4,
    ratio: '3:4 (verticale)',
    recommendedSize: '900 × 1200 px',
    heading: { title: 'Scopri per categoria', subtitle: 'Trova subito quello che cerchi' },
    fields: [
      { key: 'title', label: 'Titolo categoria', type: 'text', placeholder: 'Es. Occhiali da sole' },
      { key: 'description', label: 'Descrizione', type: 'textarea' },
      { key: 'href', label: 'Link', type: 'link', placeholder: '#collezione' },
    ],
  },
  {
    id: 'novita',
    label: 'Novità della settimana',
    hint: 'Carosello di prodotti nuovi in negozio. Otto finestre foto con brand, modello, descrizione e prezzo.',
    position: '3ª sezione',
    layout: 'products',
    windows: 8,
    ratio: '1:1 (quadrata)',
    recommendedSize: '1000 × 1000 px',
    heading: { title: 'Novità della settimana', subtitle: 'Gli arrivi più recenti nel nostro negozio' },
    fields: productFields,
  },
  {
    id: 'brand',
    label: 'Brand partner',
    hint: 'Striscia con i loghi dei marchi trattati. Usa immagini con sfondo trasparente (PNG).',
    position: '4ª sezione',
    layout: 'logos',
    windows: 12,
    ratio: 'Libero (orizzontale)',
    recommendedSize: '400 × 200 px, PNG trasparente',
    optionalImage: true,
    heading: { title: 'I nostri brand', subtitle: 'Solo montature originali, garantite e certificate' },
    fields: [
      { key: 'name', label: 'Nome brand', type: 'text', placeholder: 'Es. Ray-Ban' },
      { key: 'href', label: 'Link (facoltativo)', type: 'link' },
    ],
  },
  {
    id: 'editoriale',
    label: 'Editoriale doppio',
    hint: 'Due grandi riquadri affiancati con foto, titolo e testo di approfondimento.',
    position: '5ª sezione',
    layout: 'editorial',
    windows: 2,
    ratio: '4:5 (verticale)',
    recommendedSize: '1200 × 1500 px',
    fields: [
      { key: 'eyebrow', label: 'Etichetta piccola', type: 'text' },
      { key: 'title', label: 'Titolo', type: 'text' },
      { key: 'description', label: 'Descrizione', type: 'textarea' },
      { key: 'ctaLabel', label: 'Testo pulsante', type: 'text' },
      { key: 'href', label: 'Link pulsante', type: 'link' },
    ],
  },
  {
    id: 'bestseller',
    label: 'I più venduti',
    hint: 'Secondo carosello prodotti, identico per struttura a "Novità della settimana".',
    position: '6ª sezione',
    layout: 'products',
    windows: 8,
    ratio: '1:1 (quadrata)',
    recommendedSize: '1000 × 1000 px',
    heading: { title: 'I più venduti', subtitle: 'I modelli preferiti dai nostri clienti' },
    fields: productFields,
  },
  {
    id: 'banner',
    label: 'Banner a tutta larghezza',
    hint: 'Una sola immagine panoramica con messaggio promozionale e pulsante.',
    position: '7ª sezione',
    layout: 'banner',
    windows: 1,
    ratio: '21:9 (panoramica)',
    recommendedSize: '2100 × 900 px',
    fields: [
      { key: 'eyebrow', label: 'Etichetta piccola', type: 'text' },
      { key: 'title', label: 'Titolo', type: 'text' },
      { key: 'description', label: 'Descrizione', type: 'textarea' },
      { key: 'ctaLabel', label: 'Testo pulsante', type: 'text' },
      { key: 'href', label: 'Link pulsante', type: 'link' },
    ],
  },
  {
    id: 'forme',
    label: 'Scegli per forma',
    hint: 'Sei riquadri con le forme di montatura (rotonda, quadrata, cat-eye…).',
    position: '8ª sezione',
    layout: 'shapes',
    windows: 6,
    ratio: '1:1 (quadrata)',
    recommendedSize: '800 × 800 px',
    heading: { title: 'Scegli per forma', subtitle: 'Ogni viso ha la sua montatura ideale' },
    fields: [
      { key: 'name', label: 'Nome forma', type: 'text', placeholder: 'Es. Rotondi' },
      { key: 'description', label: 'Descrizione', type: 'textarea' },
      { key: 'href', label: 'Link', type: 'link' },
    ],
  },
  {
    id: 'lookbook',
    label: 'Lookbook / Community',
    hint: 'Griglia di sei foto in stile Instagram: clienti, vetrine, dettagli del negozio.',
    position: '9ª sezione',
    layout: 'lookbook',
    windows: 6,
    ratio: '1:1 (quadrata)',
    recommendedSize: '1080 × 1080 px',
    heading: { title: '#FocusOttica', subtitle: 'Il nostro mondo, giorno dopo giorno' },
    fields: [
      { key: 'caption', label: 'Didascalia', type: 'text' },
      { key: 'href', label: 'Link (facoltativo)', type: 'link' },
    ],
  },
  {
    id: 'servizi',
    label: 'Servizi e garanzie',
    hint: 'Quattro riquadri con i servizi del negozio. La foto è facoltativa: senza foto viene mostrata un’icona.',
    position: '10ª sezione',
    layout: 'services',
    windows: 4,
    ratio: '1:1 (quadrata)',
    recommendedSize: '600 × 600 px',
    optionalImage: true,
    heading: { title: 'Perché sceglierci', subtitle: '25 anni di esperienza al servizio della tua vista' },
    fields: [
      { key: 'title', label: 'Titolo servizio', type: 'text' },
      { key: 'description', label: 'Descrizione', type: 'textarea' },
      { key: 'icon', label: 'Icona (eye, glasses, shield, clock)', type: 'text', placeholder: 'eye' },
    ],
  },
  {
    id: 'newsletter',
    label: 'Newsletter / Appuntamento',
    hint: 'Una sola immagine di sfondo per la fascia finale con invito al contatto.',
    position: '11ª sezione',
    layout: 'newsletter',
    windows: 1,
    ratio: '16:6 (panoramica)',
    recommendedSize: '1920 × 720 px',
    fields: [
      { key: 'title', label: 'Titolo', type: 'text' },
      { key: 'description', label: 'Descrizione', type: 'textarea' },
      { key: 'ctaLabel', label: 'Testo pulsante', type: 'text' },
      { key: 'href', label: 'Link pulsante', type: 'link' },
    ],
  },
]

export const GROUPS_BY_ID: Record<string, GroupDef> = Object.fromEntries(
  GROUPS.map((g) => [g.id, g])
)

export const TOTAL_WINDOWS = GROUPS.reduce((sum, g) => sum + g.windows, 0)

export interface WindowItem {
  image: string
  [key: string]: string
}

export interface GroupContent {
  heading?: { title: string; subtitle: string }
  items: WindowItem[]
}

export interface SiteContent {
  updatedAt: string
  groups: Record<string, GroupContent>
}

function emptyItem(group: GroupDef): WindowItem {
  const item: WindowItem = { image: '' }
  for (const field of group.fields) item[field.key] = ''
  return item
}

/** Normalizza un contenuto salvato rispetto allo schema corrente. */
export function normalizeContent(raw: Partial<SiteContent> | null | undefined): SiteContent {
  const groups: Record<string, GroupContent> = {}

  for (const group of GROUPS) {
    const saved = raw?.groups?.[group.id]
    const items: WindowItem[] = []

    for (let i = 0; i < group.windows; i++) {
      const savedItem = saved?.items?.[i]
      const item = emptyItem(group)
      if (savedItem) {
        item.image = typeof savedItem.image === 'string' ? savedItem.image : ''
        for (const field of group.fields) {
          const value = savedItem[field.key]
          item[field.key] = typeof value === 'string' ? value : ''
        }
      }
      items.push(item)
    }

    groups[group.id] = {
      heading: group.heading
        ? {
            title: saved?.heading?.title || group.heading.title,
            subtitle: saved?.heading?.subtitle ?? group.heading.subtitle,
          }
        : undefined,
      items,
    }
  }

  return { updatedAt: raw?.updatedAt || new Date(0).toISOString(), groups }
}

/** Numero di finestre con foto caricata, per gruppo. */
export function filledWindows(content: SiteContent, groupId: string): number {
  return (content.groups[groupId]?.items || []).filter((item) => !!item.image).length
}
