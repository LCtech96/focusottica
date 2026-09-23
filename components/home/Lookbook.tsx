'use client'

import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { X } from 'lucide-react'
import Media from './Media'
import SectionHeading from './SectionHeading'
import type { GroupContent, WindowItem } from '@/lib/site-content'

export default function Lookbook({ content }: { content: GroupContent }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const open = openIndex !== null ? content.items[openIndex] : null

  return (
    <section id="lookbook" className="py-16 sm:py-20 bg-gray-50 border-y border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title={content.heading?.title}
          subtitle={content.heading?.subtitle}
          align="center"
        />

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          {content.items.map((item, index) => (
            <button
              key={index}
              type="button"
              onClick={() => setOpenIndex(index)}
              className="block w-full text-left"
              aria-label={item.caption ? `Ingrandisci: ${item.caption}` : 'Ingrandisci la foto'}
            >
              <div className="aspect-square overflow-hidden bg-gray-100">
                <Media
                  src={item.image}
                  alt={item.caption || 'Focus Ottica'}
                  className="w-full h-full hover:scale-105 transition-transform duration-700"
                />
              </div>
              {item.caption && (
                <p className="mt-2 text-xs text-gray-600 text-center">{item.caption}</p>
              )}
            </button>
          ))}
        </div>
      </div>

      {open && <Lightbox item={open} onClose={() => setOpenIndex(null)} />}
    </section>
  )
}

function Lightbox({ item, onClose }: { item: WindowItem; onClose: () => void }) {
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
      className="fixed inset-0 z-[90] bg-black/90 flex flex-col items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-label={item.caption || 'Foto'}
      onClick={onClose}
    >
      <button
        onClick={onClose}
        aria-label="Chiudi"
        className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/90 hover:bg-white text-gray-900 flex items-center justify-center transition-colors"
      >
        <X size={20} />
      </button>

      <Media
        src={item.image}
        alt={item.caption || 'Focus Ottica'}
        priority
        contain
        className="max-w-full max-h-[80vh]"
      />
      {item.caption && <p className="mt-4 text-white/85 text-sm">{item.caption}</p>}

      {item.href && (
        <a
          href={item.href}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(event) => event.stopPropagation()}
          className="mt-3 text-sm text-white underline hover:text-white/80 transition-colors"
        >
          Scopri di più →
        </a>
      )}
    </div>,
    document.body
  )
}
