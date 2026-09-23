'use client'

import { useState } from 'react'
import { ScanFace } from 'lucide-react'
import Media from './Media'
import SectionHeading from './SectionHeading'
import ProductModal from './ProductModal'
import TryOnButton from './tryon/TryOnButton'
import { TRY_ON_IMAGE_KEY, type GroupContent } from '@/lib/site-content'

/**
 * Sezione "Occhiali da sole", quella a cui punta la voce di menu.
 *
 * A differenza dei caroselli, qui le montature sono poche e tutte visibili
 * insieme, senza scorrimento orizzontale: la prova virtuale dev'essere la
 * prima cosa che si vede, non l'ultima scheda di una fila da scorrere.
 */
export default function SunglassesShowcase({ content }: { content: GroupContent }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <section id="sole" className="py-16 sm:py-20 bg-gray-50 border-y border-gray-200">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title={content.heading?.title}
          subtitle={content.heading?.subtitle}
          align="center"
        />

        <div className="grid sm:grid-cols-2 gap-6 sm:gap-8">
          {content.items.map((item, index) => {
            const tryOnImage = item[TRY_ON_IMAGE_KEY]
            const name = item.name || 'Occhiali'

            return (
              <article
                key={index}
                className="bg-white rounded-2xl overflow-hidden border border-gray-200 flex flex-col"
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(index)}
                  className="block w-full text-left group"
                  aria-label={`Apri la scheda di ${name}`}
                >
                  <div className="aspect-square overflow-hidden bg-gray-100">
                    <Media
                      src={item.image}
                      alt={name}
                      className="w-full h-full group-hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                </button>

                <div className="p-5 flex flex-col flex-1">
                  {item.brand && (
                    <p className="text-xs uppercase tracking-[0.15em] text-gray-500">{item.brand}</p>
                  )}
                  <h3 className="mt-1 text-lg font-semibold text-gray-950">{name}</h3>
                  {item.description && (
                    <p className="mt-2 text-sm text-gray-600 leading-relaxed flex-1">
                      {item.description}
                    </p>
                  )}
                  {item.price && (
                    <p className="mt-3 text-xl font-semibold text-gray-950">€ {item.price}</p>
                  )}

                  <div className="mt-5">
                    {tryOnImage ? (
                      <TryOnButton
                        variant="full"
                        imageUrl={tryOnImage}
                        productName={name}
                        brand={item.brand}
                      />
                    ) : (
                      <button
                        type="button"
                        onClick={() => setOpenIndex(index)}
                        className="w-full border border-gray-300 text-gray-900 py-3 rounded-full font-medium hover:bg-gray-50 transition-colors"
                      >
                        Vedi la scheda
                      </button>
                    )}
                  </div>
                </div>
              </article>
            )
          })}
        </div>

        <p className="mt-6 text-center text-sm text-gray-500 flex items-center justify-center gap-2">
          <ScanFace size={16} />
          Con “Provali” ti vedi gli occhiali addosso: le immagini restano sul tuo telefono.
        </p>
      </div>

      {openIndex !== null && content.items[openIndex] && (
        <ProductModal item={content.items[openIndex]} onClose={() => setOpenIndex(null)} />
      )}
    </section>
  )
}
