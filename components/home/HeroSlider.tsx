'use client'

import { useEffect, useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import Media from './Media'
import type { WindowItem } from '@/lib/site-content'

export default function HeroSlider({ items }: { items: WindowItem[] }) {
  const slides = items.filter((item) => item.image || item.title)
  const [index, setIndex] = useState(0)

  useEffect(() => {
    if (slides.length < 2) return
    const timer = setInterval(() => setIndex((i) => (i + 1) % slides.length), 6000)
    return () => clearInterval(timer)
  }, [slides.length])

  if (slides.length === 0) return null

  const go = (delta: number) =>
    setIndex((i) => (i + delta + slides.length) % slides.length)

  return (
    <section id="hero" className="relative bg-gray-950">
      <div className="relative h-[68vh] min-h-[420px] max-h-[760px] overflow-hidden">
        {slides.map((slide, i) => (
          <div
            key={i}
            className={`absolute inset-0 transition-opacity duration-700 ${
              i === index ? 'opacity-100' : 'opacity-0 pointer-events-none'
            }`}
            aria-hidden={i !== index}
          >
            <Media
              src={slide.image}
              alt={slide.title || 'Focus Ottica'}
              priority={i === 0}
              className="w-full h-full"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/25 to-black/10" />

            <div className="absolute inset-0 flex items-end">
              <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 pb-16 sm:pb-20">
                <div className="max-w-2xl text-white">
                  {slide.eyebrow && (
                    <p className="text-xs sm:text-sm uppercase tracking-[0.2em] text-white/80 mb-3">
                      {slide.eyebrow}
                    </p>
                  )}
                  {slide.title && (
                    <h1 className="text-3xl sm:text-5xl font-semibold leading-tight">{slide.title}</h1>
                  )}
                  {slide.description && (
                    <p className="mt-4 text-base sm:text-lg text-white/90 max-w-xl">
                      {slide.description}
                    </p>
                  )}
                  {slide.ctaLabel && (
                    <a
                      href={slide.href || '#novita'}
                      className="inline-block mt-7 bg-white text-gray-950 px-7 py-3.5 text-sm font-medium tracking-wide hover:bg-gray-100 transition-colors"
                    >
                      {slide.ctaLabel}
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}

        {slides.length > 1 && (
          <>
            <button
              onClick={() => go(-1)}
              aria-label="Slide precedente"
              className="absolute left-3 sm:left-5 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/25 hover:bg-white/40 backdrop-blur text-white flex items-center justify-center transition-colors"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={() => go(1)}
              aria-label="Slide successiva"
              className="absolute right-3 sm:right-5 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/25 hover:bg-white/40 backdrop-blur text-white flex items-center justify-center transition-colors"
            >
              <ChevronRight size={20} />
            </button>

            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
              {slides.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setIndex(i)}
                  aria-label={`Vai alla slide ${i + 1}`}
                  className={`h-1 rounded-full transition-all ${
                    i === index ? 'w-8 bg-white' : 'w-4 bg-white/50 hover:bg-white/80'
                  }`}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  )
}
