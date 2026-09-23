'use client'

import { useEffect } from 'react'
import { createPortal } from 'react-dom'
import { MessageCircle, Phone, X } from 'lucide-react'
import Media from './Media'
import TryOnButton from './tryon/TryOnButton'
import { TRY_ON_IMAGE_KEY, type WindowItem } from '@/lib/site-content'

const WHATSAPP_NUMBER = '393342590448'

/**
 * Scheda di dettaglio del prodotto: si apre cliccando una foto del carosello.
 *
 * Sta sotto alla prova virtuale come livello (z-90 contro z-100), così se dal
 * dettaglio si apre "Provali" la fotocamera resta comunque in primo piano.
 */
export default function ProductModal({
  item,
  onClose,
}: {
  item: WindowItem
  onClose: () => void
}) {
  const name = item.name || 'Occhiali'
  const tryOnImage = item[TRY_ON_IMAGE_KEY]

  const whatsappHref = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    `Ciao! Vorrei informazioni su: ${[item.brand, name].filter(Boolean).join(' ')}`
  )}`

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => event.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = previous
    }
  }, [onClose])

  return createPortal(
    <div
      className="fixed inset-0 z-[90] bg-black/80 flex items-end sm:items-center justify-center sm:p-4 overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-label={name}
      onClick={onClose}
    >
      <div
        className="relative w-full sm:max-w-3xl bg-white rounded-t-2xl sm:rounded-2xl overflow-hidden my-0 sm:my-8"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          onClick={onClose}
          aria-label="Chiudi"
          className="absolute top-3 right-3 z-10 w-10 h-10 rounded-full bg-white/90 hover:bg-white text-gray-900 flex items-center justify-center shadow transition-colors"
        >
          <X size={20} />
        </button>

        <div className="grid sm:grid-cols-2">
          <div className="aspect-square bg-gray-100">
            <Media src={item.image} alt={name} priority className="w-full h-full" />
          </div>

          <div className="p-6 sm:p-8 flex flex-col">
            {item.brand && (
              <p className="text-xs uppercase tracking-[0.2em] text-gray-500">{item.brand}</p>
            )}
            <h2 className="mt-1 text-2xl font-semibold text-gray-950">{name}</h2>

            {item.description && (
              <p className="mt-3 text-gray-600 leading-relaxed">{item.description}</p>
            )}

            {item.price && (
              <p className="mt-4 text-2xl font-semibold text-gray-950">€ {item.price}</p>
            )}

            <p className="mt-4 text-sm text-gray-500 leading-relaxed">
              Disponibile in negozio a Castellammare del Golfo. Scrivici o chiamaci per
              verificare la disponibilità del modello e provarlo di persona.
            </p>

            <div className="mt-6 space-y-3">
              {tryOnImage && (
                <div className="[&>button]:w-full [&>button]:justify-center [&>button]:py-3 [&>button]:text-sm">
                  <TryOnButton
                    imageUrl={tryOnImage}
                    productName={name}
                    brand={item.brand}
                  />
                </div>
              )}

              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 bg-[#25D366] text-white py-3 rounded-full font-medium hover:bg-[#128C7E] transition-colors"
              >
                <MessageCircle size={18} />
                Chiedi su WhatsApp
              </a>

              <a
                href="tel:+393342590448"
                className="flex items-center justify-center gap-2 border border-gray-300 text-gray-900 py-3 rounded-full font-medium hover:bg-gray-50 transition-colors"
              >
                <Phone size={18} />
                Chiama il negozio
              </a>

              {item.href && !item.href.startsWith('#') && (
                <a
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-center text-sm text-gray-600 hover:text-gray-900 transition-colors pt-1"
                >
                  Scopri di più →
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>,
    document.body
  )
}
