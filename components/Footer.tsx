'use client'

import { MessageCircle, Phone, Mail, Facebook, Instagram, MapPin } from 'lucide-react'

export default function Footer() {
  const handleWhatsApp = () => {
    window.open('https://wa.me/393342590448', '_blank')
  }

  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-ocean-400 to-sand-400 bg-clip-text text-transparent">
              Focus Ottica
            </h3>
            <p className="text-gray-400 mb-4">
              La tua ottica di fiducia a Castellammare del Golfo. Oltre 25 anni di esperienza nella cura della vista.
            </p>
            <div className="flex gap-4">
              <a
                href="https://www.facebook.com/focusottica?locale=it_IT"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-[#1877F2] rounded-lg flex items-center justify-center hover:scale-110 transition-transform"
              >
                <Facebook size={20} />
              </a>
              <a
                href="https://www.instagram.com/ottica__focus?igsh=MXc3Zmk4dDd1NDU2bg=="
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gradient-to-br from-purple-500 via-pink-500 to-orange-500 rounded-lg flex items-center justify-center hover:scale-110 transition-transform"
              >
                <Instagram size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Link Rapidi</h4>
            <ul className="space-y-2">
              <li>
                <a href="#home" className="text-gray-400 hover:text-white transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="#about" className="text-gray-400 hover:text-white transition-colors">
                  Chi Siamo
                </a>
              </li>
              <li>
                <a href="#services" className="text-gray-400 hover:text-white transition-colors">
                  Servizi
                </a>
              </li>
              <li>
                <a href="#contact" className="text-gray-400 hover:text-white transition-colors">
                  Contatti
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contatti</h4>
            <ul className="space-y-3 text-gray-400">
              <li className="flex items-center gap-2">
                <Phone size={18} />
                <a href="tel:+393342590448" className="hover:text-white transition-colors">
                  +39 334 259 0448
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Phone size={18} />
                <a href="tel:0924531110" className="hover:text-white transition-colors">
                  0924 531110
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail size={18} />
                <a href="mailto:domenicootticafocus@virgilio.it" className="hover:text-white transition-colors">
                  domenicootticafocus@virgilio.it
                </a>
              </li>
              <li className="flex items-center gap-2">
                <MapPin size={18} />
                <span>Castellammare del Golfo, TP</span>
              </li>
            </ul>
          </div>
        </div>

        {/* WhatsApp CTA */}
        <div className="border-t border-gray-700 pt-8 mt-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-center md:text-left">
              <p className="text-gray-400">
                © {new Date().getFullYear()} Focus Ottica. Tutti i diritti riservati.
              </p>
              <p className="text-gray-500 text-sm mt-2">
                Created by{' '}
                <a
                  href="https://facevoice.ai"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-ocean-400 hover:text-ocean-300 transition-colors font-medium"
                >
                  Facevoice.ai
                </a>
              </p>
            </div>
            <button
              onClick={handleWhatsApp}
              className="flex items-center gap-2 bg-[#25D366] text-white px-6 py-3 rounded-xl font-semibold hover:bg-[#128C7E] transition-colors shadow-lg"
            >
              <MessageCircle size={20} />
              <span>Scrivici su WhatsApp</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  )
}



