'use client'

import { useRef } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import Media from './Media'
import SectionHeading from './SectionHeading'
import TryOnButton from './tryon/TryOnButton'
import { TRY_ON_IMAGE_KEY, type GroupContent } from '@/lib/site-content'

export default function ProductCarousel({
  id,
  content,
}: {
  id: string
  content: GroupContent
}) {
  const trackRef = useRef<HTMLDivElement>(null)

  const scrollBy = (direction: number) => {
    const track = trackRef.current
    if (!track) return
    track.scrollBy({ left: direction * track.clientWidth * 0.8, behavior: 'smooth' })
  }

  return (
    <section id={id} className="py-16 sm:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between gap-4">
          <SectionHeading title={content.heading?.title} subtitle={content.heading?.subtitle} />
          <div className="hidden sm:flex gap-2 mb-8">
            <button
              onClick={() => scrollBy(-1)}
              aria-label="Scorri indietro"
              className="w-10 h-10 border border-gray-300 rounded-full flex items-center justify-center hover:bg-gray-50 transition-colors"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={() => scrollBy(1)}
              aria-label="Scorri avanti"
              className="w-10 h-10 border border-gray-300 rounded-full flex items-center justify-center hover:bg-gray-50 transition-colors"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>

        <div
          ref={trackRef}
          className="flex gap-4 sm:gap-6 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-2 -mx-1 px-1"
          style={{ scrollbarWidth: 'thin' }}
        >
          {content.items.map((item, index) => (
            <article
              key={index}
              className="relative snap-start flex-shrink-0 w-[65%] sm:w-[38%] lg:w-[23%] group"
            >
              {/* Fuori dal link: un pulsante dentro un <a> non sarebbe HTML valido */}
              {item[TRY_ON_IMAGE_KEY] && (
                <div className="absolute left-3 top-3 z-10">
                  <TryOnButton
                    imageUrl={item[TRY_ON_IMAGE_KEY]}
                    productName={item.name || 'Occhiali'}
                    brand={item.brand}
                  />
                </div>
              )}

              <a href={item.href || '#contatti'} className="block">
                <div className="aspect-square overflow-hidden bg-gray-100">
                  <Media
                    src={item.image}
                    alt={item.name || 'Occhiali'}
                    className="w-full h-full group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
                <div className="pt-4">
                  {item.brand && (
                    <p className="text-xs uppercase tracking-[0.15em] text-gray-500">{item.brand}</p>
                  )}
                  {item.name && (
                    <h3 className="mt-1 font-medium text-gray-950">{item.name}</h3>
                  )}
                  {item.description && (
                    <p className="mt-1 text-sm text-gray-600 leading-relaxed">{item.description}</p>
                  )}
                  {item.price && (
                    <p className="mt-2 text-gray-950 font-semibold">
                      € {item.price}
                    </p>
                  )}
                </div>
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
