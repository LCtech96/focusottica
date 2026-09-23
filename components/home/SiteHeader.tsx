'use client'

import { useEffect, useState } from 'react'
import { Menu, X, Phone, MapPin, Search } from 'lucide-react'

const LINKS = [
  { label: 'Novità', href: '#novita' },
  { label: 'Occhiali da sole', href: '#categorie' },
  { label: 'Occhiali da vista', href: '#bestseller' },
  { label: 'Brand', href: '#brand' },
  { label: 'Forme', href: '#forme' },
  { label: 'Chi siamo', href: '#editoriale' },
]

export default function SiteHeader() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`sticky top-0 z-50 bg-white transition-shadow ${
        scrolled ? 'shadow-[0_1px_0_rgba(0,0,0,0.08)]' : ''
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="h-16 flex items-center justify-between gap-6">
          <button
            className="lg:hidden text-gray-900"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? 'Chiudi menu' : 'Apri menu'}
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>

          <a href="#top" className="text-xl font-semibold tracking-[0.18em] uppercase text-gray-950">
            Focus Ottica
          </a>

          <nav className="hidden lg:flex items-center gap-7">
            {LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm text-gray-700 hover:text-gray-950 transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <a
              href="#forme"
              className="hidden sm:flex text-gray-700 hover:text-gray-950 transition-colors"
              aria-label="Cerca per forma"
            >
              <Search size={20} />
            </a>
            <a
              href="tel:+393342590448"
              className="hidden sm:flex text-gray-700 hover:text-gray-950 transition-colors"
              aria-label="Telefono"
            >
              <Phone size={20} />
            </a>
            <a
              href="#contatti"
              className="text-gray-700 hover:text-gray-950 transition-colors"
              aria-label="Dove siamo"
            >
              <MapPin size={20} />
            </a>
          </div>
        </div>
      </div>

      {open && (
        <nav className="lg:hidden border-t border-gray-200 bg-white">
          <div className="px-4 py-3 space-y-1">
            {LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="block px-2 py-2.5 text-gray-800 hover:bg-gray-50 rounded-lg"
              >
                {link.label}
              </a>
            ))}
          </div>
        </nav>
      )}
    </header>
  )
}
