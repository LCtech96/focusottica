import { normalizeContent, type SiteContent } from './site-content'

/**
 * Contenuto iniziale della home page.
 *
 * Serve solo come punto di partenza: appena il titolare carica le proprie
 * foto dal pannello admin, questo contenuto viene sostituito dal salvataggio.
 */
const seed = {
  updatedAt: new Date(0).toISOString(),
  groups: {
    hero: {
      items: [
        {
          image: '/products/sfondo-hero.png',
          eyebrow: 'Focus Ottica — Castellammare del Golfo',
          title: 'Lo sguardo che ti somiglia',
          description:
            'Oltre 25 anni di esperienza nella cura della vista, con una selezione di montature originali scelte una a una.',
          ctaLabel: 'Scopri la collezione',
          href: '#novita',
        },
        {
          image: '/products/Chi-siamo.png',
          eyebrow: 'Esame della vista',
          title: 'Un controllo accurato, senza fretta',
          description:
            'Strumentazione professionale e un ottico che ti segue passo dopo passo, dalla misurazione alla consegna.',
          ctaLabel: 'Prenota un appuntamento',
          href: '#newsletter',
        },
        {
          image: '/products/gucci-5.jpg',
          eyebrow: 'Collezione sole',
          title: 'Protezione e stile, tutto l’anno',
          description:
            'Lenti certificate e montature dei migliori brand, per il sole della Sicilia e per ogni giornata all’aperto.',
          ctaLabel: 'Vedi gli occhiali da sole',
          href: '#categorie',
        },
      ],
    },
    categorie: {
      items: [
        {
          image: '/products/gucci-1.jpg',
          title: 'Occhiali da sole',
          description: 'Montature originali con lenti protettive certificate UV400.',
          href: '#novita',
        },
        {
          image: '/products/gucci-4.jpg',
          title: 'Occhiali da vista',
          description: 'Lenti su misura e montature per ogni forma di viso.',
          href: '#bestseller',
        },
        {
          image: '/products/gucci-8.jpg',
          title: 'Lenti a contatto',
          description: 'Applicazione guidata e controllo periodico incluso.',
          href: '#servizi',
        },
        {
          image: '/products/gucci-6.jpg',
          title: 'Bambino',
          description: 'Montature resistenti e leggere, pensate per i più piccoli.',
          href: '#servizi',
        },
      ],
    },
    novita: {
      items: [
        {
          image: '/products/gucci-1.jpg',
          brand: 'GUCCI',
          name: 'Occhiali Esagonali',
          description: 'Montatura oro con lenti sfumate marrone.',
          price: '450',
          href: '#newsletter',
        },
        {
          image: '/products/gucci-2.jpg',
          brand: 'GUCCI',
          name: 'Occhiali Rettangolari',
          description: 'Montatura oro con lenti marroni.',
          price: '420',
          href: '#newsletter',
        },
        {
          image: '/products/gucci-3.jpg',
          brand: 'GUCCI',
          name: 'Occhiali con Dettagli',
          description: 'Montatura oro con lenti viola chiaro.',
          price: '480',
          href: '#newsletter',
        },
        {
          image: '/products/gucci-4.jpg',
          brand: 'GUCCI',
          name: 'Occhiali Gatto Rosa',
          description: 'Montatura trasparente rosa con lenti specchiate.',
          price: '460',
          href: '#newsletter',
        },
        {
          image: '/products/gucci-5.jpg',
          brand: 'GUCCI',
          name: 'Occhiali Shield',
          description: 'Montatura argentata con lenti grigie.',
          price: '490',
          href: '#newsletter',
        },
        {
          image: '/products/gucci-6.jpg',
          brand: 'GUCCI',
          name: 'Occhiali Cat-Eye Neri',
          description: 'Montatura nera con aste verdi marmorizzate.',
          price: '440',
          href: '#newsletter',
        },
        {
          image: '/products/gucci-7.jpg',
          brand: 'GUCCI',
          name: 'Occhiali Quadrati',
          description: 'Montatura nera con lenti ambra.',
          price: '430',
          href: '#newsletter',
        },
        {
          image: '/products/gucci-8.jpg',
          tryOnImage: '/products/tryon/gucci-8.png',
          brand: 'GUCCI',
          name: 'Occhiali Aviator',
          description: 'Montatura oro con aste tartaruga.',
          price: '470',
          href: '#newsletter',
        },
      ],
    },
    brand: {
      items: [
        { image: '', name: 'Gucci', href: '' },
        { image: '', name: 'Ray-Ban', href: '' },
        { image: '', name: 'Persol', href: '' },
        { image: '', name: 'Oakley', href: '' },
        { image: '', name: 'Prada', href: '' },
        { image: '', name: 'Dolce & Gabbana', href: '' },
        { image: '', name: 'Versace', href: '' },
        { image: '', name: 'Tom Ford', href: '' },
        { image: '', name: 'Police', href: '' },
        { image: '', name: 'Vogue Eyewear', href: '' },
        { image: '', name: 'Carrera', href: '' },
        { image: '', name: 'Marc Jacobs', href: '' },
      ],
    },
    editoriale: {
      items: [
        {
          image: '/products/Chi-siamo.png',
          eyebrow: 'Chi siamo',
          title: '25 anni a Castellammare del Golfo',
          description:
            'Un negozio di famiglia dove ogni cliente ha un nome. Ti seguiamo dalla prima misurazione fino alla manutenzione degli occhiali, negli anni.',
          ctaLabel: 'Scopri la nostra storia',
          href: '#servizi',
        },
        {
          image: '/products/gucci-9.jpg',
          eyebrow: 'Lenti su misura',
          title: 'La lente giusta fa la differenza',
          description:
            'Progressive, antiriflesso, fotocromatiche o per il lavoro al computer: scegliamo insieme la soluzione adatta alle tue giornate.',
          ctaLabel: 'Parlane con noi',
          href: '#newsletter',
        },
      ],
    },
    bestseller: {
      items: [
        {
          image: '/products/gucci-2.jpg',
          brand: 'GUCCI',
          name: 'Occhiali Rettangolari',
          description: 'Montatura oro con lenti marroni.',
          price: '420',
          href: '#newsletter',
        },
        {
          image: '/products/gucci-3.jpg',
          brand: 'GUCCI',
          name: 'Occhiali con Dettagli',
          description: 'Montatura oro con lenti viola chiaro.',
          price: '480',
          href: '#newsletter',
        },
        {
          image: '/products/gucci-4.jpg',
          brand: 'GUCCI',
          name: 'Occhiali Gatto Rosa',
          description: 'Montatura trasparente rosa con lenti specchiate.',
          price: '460',
          href: '#newsletter',
        },
        {
          image: '/products/gucci-5.jpg',
          brand: 'GUCCI',
          name: 'Occhiali Shield',
          description: 'Montatura argentata con lenti grigie.',
          price: '490',
          href: '#newsletter',
        },
        {
          image: '/products/gucci-6.jpg',
          brand: 'GUCCI',
          name: 'Occhiali Cat-Eye Neri',
          description: 'Montatura nera con aste verdi marmorizzate.',
          price: '440',
          href: '#newsletter',
        },
        {
          image: '/products/gucci-7.jpg',
          brand: 'GUCCI',
          name: 'Occhiali Quadrati',
          description: 'Montatura nera con lenti ambra.',
          price: '430',
          href: '#newsletter',
        },
        {
          image: '/products/gucci-8.jpg',
          tryOnImage: '/products/tryon/gucci-8.png',
          brand: 'GUCCI',
          name: 'Occhiali Aviator',
          description: 'Montatura oro con aste tartaruga.',
          price: '470',
          href: '#newsletter',
        },
        {
          image: '/products/gucci-9.jpg',
          brand: 'GUCCI',
          name: 'Occhiali Bianchi',
          description: 'Montatura bianca marmorizzata con lenti marroni.',
          price: '450',
          href: '#newsletter',
        },
      ],
    },
    banner: {
      items: [
        {
          image: '/products/sfondo-hero.png',
          eyebrow: 'Servizio gratuito',
          title: 'Controllo della vista su appuntamento',
          description:
            'Prenota il tuo controllo: ti aspettiamo in negozio, senza attese e con tutto il tempo necessario.',
          ctaLabel: 'Scrivici su WhatsApp',
          href: 'https://wa.me/393342590448',
        },
      ],
    },
    forme: {
      items: [
        { image: '/products/gucci-1.jpg', name: 'Esagonali', description: 'Geometrici e contemporanei.', href: '#novita' },
        { image: '/products/gucci-7.jpg', name: 'Quadrati', description: 'Linee decise, carattere forte.', href: '#novita' },
        { image: '/products/gucci-6.jpg', name: 'Cat-Eye', description: 'Femminili e sempre attuali.', href: '#novita' },
        { image: '/products/gucci-8.jpg', name: 'Aviator', description: 'Un classico che non stanca.', href: '#novita' },
        { image: '/products/gucci-2.jpg', name: 'Rettangolari', description: 'Sobri, adatti a ogni viso.', href: '#novita' },
        { image: '/products/gucci-5.jpg', name: 'Oversize', description: 'Massima protezione e presenza.', href: '#novita' },
      ],
    },
    lookbook: {
      items: [
        { image: '/products/gucci-3.jpg', caption: 'Dettagli oro', href: '' },
        { image: '/products/gucci-4.jpg', caption: 'Tonalità rosa', href: '' },
        { image: '/products/gucci-5.jpg', caption: 'Linea shield', href: '' },
        { image: '/products/gucci-6.jpg', caption: 'Cat-eye', href: '' },
        { image: '/products/gucci-7.jpg', caption: 'Nero assoluto', href: '' },
        { image: '/products/gucci-9.jpg', caption: 'Bianco marmo', href: '' },
      ],
    },
    servizi: {
      items: [
        {
          image: '',
          title: 'Esame della vista',
          description: 'Controllo completo con strumentazione professionale, su appuntamento.',
          icon: 'eye',
        },
        {
          image: '',
          title: 'Montature originali',
          description: 'Solo prodotti autentici, con garanzia ufficiale del marchio.',
          icon: 'glasses',
        },
        {
          image: '',
          title: 'Assistenza post-vendita',
          description: 'Regolazioni, pulizia e piccole riparazioni sempre incluse.',
          icon: 'shield',
        },
        {
          image: '',
          title: 'Consegna rapida',
          description: 'Lenti pronte in pochi giorni, con avviso appena arrivano.',
          icon: 'clock',
        },
      ],
    },
    newsletter: {
      items: [
        {
          image: '/products/sfondo-hero.png',
          title: 'Vieni a trovarci in negozio',
          description:
            'Siamo a Castellammare del Golfo (TP). Scrivici su WhatsApp o chiamaci: ti rispondiamo noi, non un centralino.',
          ctaLabel: 'Contattaci ora',
          href: 'https://wa.me/393342590448',
        },
      ],
    },
  },
}

export const DEFAULT_CONTENT: SiteContent = normalizeContent(seed as unknown as SiteContent)
