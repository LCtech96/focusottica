'use client'

import { useEffect } from 'react'
import { Construction, MapPin, MessageCircle, Phone } from 'lucide-react'

/**
 * Schermata di blocco "Lavori in corso".
 *
 * ⚠️ NON RIMUOVERE, NON RENDERE RICHIUDIBILE, NON AGGIUNGERE SCADENZE.
 *
 * Il titolare ha chiesto che il sito resti inutilizzabile fino a sua diversa
 * indicazione. Per questo la schermata non ha pulsante di chiusura, non si
 * nasconde da sola, non ricorda nulla nel browser e non è modificabile dal
 * pannello admin: si toglie solo cancellando questo componente dalla home
 * page, e solo su richiesta esplicita del titolare.
 *
 * Copre la sola home page: `/admin` resta raggiungibile, altrimenti il
 * negozio non potrebbe più gestire i contenuti.
 */

const WHATSAPP = 'https://wa.me/393342590448'

export default function SiteGate() {
  // Blocca lo scorrimento della pagina sotto la schermata.
  useEffect(() => {
    const { body, documentElement } = document
    const precedenti = { body: body.style.overflow, html: documentElement.style.overflow }
    body.style.overflow = 'hidden'
    documentElement.style.overflow = 'hidden'
    return () => {
      body.style.overflow = precedenti.body
      documentElement.style.overflow = precedenti.html
    }
  }, [])

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Sito in manutenzione"
      className="fixed inset-0 z-[9999] flex items-center justify-center overflow-y-auto bg-gray-950/85 backdrop-blur-md px-4 py-8"
    >
      <div className="w-full max-w-lg rounded-2xl bg-white p-7 sm:p-9 text-center shadow-2xl">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-amber-400">
          <Construction size={30} className="text-gray-950" aria-hidden="true" />
        </div>

        <p className="mt-6 text-xs uppercase tracking-[0.2em] text-gray-500">Focus Ottica</p>
        <h1 className="mt-2 text-3xl font-semibold text-gray-950">Lavori in corso</h1>

        <p className="mt-4 text-gray-600 leading-relaxed">
          Stiamo lavorando al nuovo sito. Torneremo online a breve con il catalogo
          completo e la prova virtuale degli occhiali.
        </p>

        <p className="mt-4 text-gray-600 leading-relaxed">
          Nel frattempo il negozio è aperto come sempre: per informazioni,
          appuntamenti e disponibilità scrivici o chiamaci.
        </p>

        <div className="mt-7 space-y-3">
          <a
            href={WHATSAPP}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 rounded-full bg-[#25D366] py-3.5 font-medium text-white transition-colors hover:bg-[#128C7E]"
          >
            <MessageCircle size={18} />
            Scrivici su WhatsApp
          </a>
          <a
            href="tel:+393342590448"
            className="flex items-center justify-center gap-2 rounded-full bg-gray-950 py-3.5 font-medium text-white transition-colors hover:bg-gray-800"
          >
            <Phone size={18} />
            +39 334 259 0448
          </a>
        </div>

        <p className="mt-6 flex items-center justify-center gap-2 text-sm text-gray-500">
          <MapPin size={16} />
          Castellammare del Golfo (TP)
        </p>
      </div>
    </div>
  )
}
