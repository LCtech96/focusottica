import { Facebook, Instagram, Mail, MapPin, Phone } from 'lucide-react'

const QUICK_LINKS = [
  { label: 'Novità della settimana', href: '#novita' },
  { label: 'Categorie', href: '#categorie' },
  { label: 'I più venduti', href: '#bestseller' },
  { label: 'Scegli per forma', href: '#forme' },
  { label: 'Chi siamo', href: '#editoriale' },
  { label: 'Servizi', href: '#servizi' },
]

export default function SiteFooter() {
  return (
    <footer id="contatti" className="bg-gray-950 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <h3 className="text-white text-lg font-semibold tracking-[0.18em] uppercase">
              Focus Ottica
            </h3>
            <p className="mt-4 text-sm leading-relaxed text-gray-400">
              La tua ottica di fiducia a Castellammare del Golfo. Oltre 25 anni di esperienza nella
              cura della vista.
            </p>
            <div className="flex gap-3 mt-5">
              <a
                href="https://www.facebook.com/focusottica?locale=it_IT"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="w-9 h-9 border border-gray-700 rounded-full flex items-center justify-center hover:border-white hover:text-white transition-colors"
              >
                <Facebook size={16} />
              </a>
              <a
                href="https://www.instagram.com/ottica__focus?igsh=MXc3Zmk4dDd1NDU2bg=="
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-9 h-9 border border-gray-700 rounded-full flex items-center justify-center hover:border-white hover:text-white transition-colors"
              >
                <Instagram size={16} />
              </a>
            </div>
          </div>

          {/* Link rapidi */}
          <div>
            <h4 className="text-white text-sm font-semibold uppercase tracking-wider mb-4">
              Naviga
            </h4>
            <ul className="space-y-2.5 text-sm">
              {QUICK_LINKS.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="text-gray-400 hover:text-white transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contatti */}
          <div>
            <h4 className="text-white text-sm font-semibold uppercase tracking-wider mb-4">
              Contatti
            </h4>
            <ul className="space-y-3 text-sm text-gray-400">
              <li className="flex items-start gap-2">
                <Phone size={16} className="mt-0.5 flex-shrink-0" />
                <a href="tel:+393342590448" className="hover:text-white transition-colors">
                  +39 334 259 0448
                </a>
              </li>
              <li className="flex items-start gap-2">
                <Phone size={16} className="mt-0.5 flex-shrink-0" />
                <a href="tel:0924531110" className="hover:text-white transition-colors">
                  0924 531110
                </a>
              </li>
              <li className="flex items-start gap-2">
                <Mail size={16} className="mt-0.5 flex-shrink-0" />
                <a
                  href="mailto:domenicootticafocus@virgilio.it"
                  className="hover:text-white transition-colors break-all"
                >
                  domenicootticafocus@virgilio.it
                </a>
              </li>
              <li className="flex items-start gap-2">
                <MapPin size={16} className="mt-0.5 flex-shrink-0" />
                <span>Castellammare del Golfo (TP)</span>
              </li>
            </ul>
          </div>

          {/* Mappa */}
          <div>
            <h4 className="text-white text-sm font-semibold uppercase tracking-wider mb-4">
              Dove siamo
            </h4>
            <div className="rounded-lg overflow-hidden border border-gray-800">
              <iframe
                title="Mappa Focus Ottica"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.5!2d12.87941!3d38.02618!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzjCsDAxJzM0LjIiTiAxMsKwNTInNDUuOSJF!5e0!3m2!1sit!2sit!4v1700000000000!5m2!1sit!2sit"
                width="100%"
                height="160"
                style={{ border: 0 }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
            <a
              href="https://www.google.com/maps/dir/?api=1&destination=38.02618%2C12.87941"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-3 text-sm text-gray-400 hover:text-white transition-colors"
            >
              Ottieni indicazioni →
            </a>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-gray-500">
          <p>© {new Date().getFullYear()} Focus Ottica. Tutti i diritti riservati.</p>
          <p>
            Created by{' '}
            <a
              href="https://facevoice.ai"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-300 hover:text-white transition-colors"
            >
              Facevoice.ai
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}
