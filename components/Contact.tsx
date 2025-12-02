'use client'

import { MapPin, Phone, Mail, MessageCircle, Facebook, Instagram, Clock } from 'lucide-react'

export default function Contact() {
  const handleWhatsApp = () => {
    window.open('https://wa.me/393342590448', '_blank')
  }

  const handleWhatsAppMessage = () => {
    window.open('https://wa.me/393342590448?text=Ciao! Vorrei maggiori informazioni.', '_blank')
  }

  const handleCall = () => {
    window.location.href = 'tel:+393342590448'
  }

  const handleCallFixed = () => {
    window.location.href = 'tel:0924531110'
  }

  return (
    <section id="contact" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Contattaci
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-ocean-400 to-ocean-600 mx-auto rounded-full"></div>
          <p className="text-xl text-gray-600 mt-6 max-w-3xl mx-auto">
            Siamo qui per aiutarti. Contattaci in qualsiasi momento!
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 mb-12">
          {/* Contact Info */}
          <div className="space-y-8">
            <div className="glass-effect p-8 rounded-3xl shadow-ios">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Informazioni di Contatto</h3>
              
              <div className="space-y-6">
                <a
                  href="tel:+393342590448"
                  className="flex items-center gap-4 p-4 rounded-xl hover:bg-ocean-50 transition-colors group"
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-ocean-400 to-ocean-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Phone className="text-white" size={20} />
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">Cellulare Domenico</div>
                    <div className="text-lg font-semibold text-gray-900">+39 334 259 0448</div>
                  </div>
                </a>

                <a
                  href="tel:0924531110"
                  className="flex items-center gap-4 p-4 rounded-xl hover:bg-ocean-50 transition-colors group"
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-sand-300 to-sand-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Phone className="text-white" size={20} />
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">Telefono Fisso</div>
                    <div className="text-lg font-semibold text-gray-900">0924 531110</div>
                  </div>
                </a>

                <a
                  href="mailto:domenicootticafocus@virgilio.it"
                  className="flex items-center gap-4 p-4 rounded-xl hover:bg-ocean-50 transition-colors group"
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-ocean-500 to-sand-400 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Mail className="text-white" size={20} />
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">Email</div>
                    <div className="text-lg font-semibold text-gray-900">domenicootticafocus@virgilio.it</div>
                  </div>
                </a>

                <div className="flex items-center gap-4 p-4 rounded-xl">
                  <div className="w-12 h-12 bg-gradient-to-br from-sand-200 to-sand-400 rounded-xl flex items-center justify-center">
                    <MapPin className="text-white" size={20} />
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">Indirizzo</div>
                    <div className="text-lg font-semibold text-gray-900">Castellammare del Golfo, TP</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Media */}
            <div className="glass-effect p-8 rounded-3xl shadow-ios">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Seguici sui Social</h3>
              <div className="flex gap-4">
                <a
                  href="https://www.facebook.com/focusottica?locale=it_IT"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-14 h-14 bg-[#1877F2] rounded-xl flex items-center justify-center hover:scale-110 transition-transform shadow-lg"
                >
                  <Facebook className="text-white" size={24} />
                </a>
                <a
                  href="https://www.instagram.com/ottica__focus?igsh=MXc3Zmk4dDd1NDU2bg=="
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-14 h-14 bg-gradient-to-br from-purple-500 via-pink-500 to-orange-500 rounded-xl flex items-center justify-center hover:scale-110 transition-transform shadow-lg"
                >
                  <Instagram className="text-white" size={24} />
                </a>
              </div>
              <p className="text-sm text-gray-500 mt-4">
                Pubblicazioni regolari con novità e consigli
              </p>
            </div>
          </div>

          {/* Map and CTA */}
          <div className="space-y-8">
            {/* Google Maps */}
            <div className="glass-effect p-2 rounded-3xl shadow-ios overflow-hidden">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.5!2d12.87941!3d38.02618!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzjCsDAxJzM0LjIiTiAxMsKwNTInNDUuOSJF!5e0!3m2!1sit!2sit!4v1700000000000!5m2!1sit!2sit"
                width="100%"
                height="300"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="rounded-2xl"
              ></iframe>
              <div className="p-4">
                <a
                  href="https://www.google.com/maps/dir/?api=1&destination=38.02618%2C12.87941"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-ocean-600 hover:text-ocean-700 font-semibold flex items-center gap-2"
                >
                  <MapPin size={20} />
                  <span>Ottieni indicazioni stradali</span>
                </a>
              </div>
            </div>

            {/* WhatsApp CTA */}
            <div className="bg-gradient-to-br from-[#25D366] to-[#128C7E] p-8 rounded-3xl shadow-ios-lg text-white">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center">
                  <MessageCircle size={32} />
                </div>
                <div>
                  <h3 className="text-2xl font-bold">Contattaci su WhatsApp</h3>
                  <p className="text-white/90">Rispondiamo sempre!</p>
                </div>
              </div>
              <div className="space-y-3">
                <button
                  onClick={handleWhatsAppMessage}
                  className="w-full bg-white text-[#25D366] px-6 py-4 rounded-xl font-semibold hover:bg-gray-100 transition-colors shadow-lg"
                >
                  Invia un Messaggio
                </button>
                <button
                  onClick={handleCall}
                  className="w-full bg-white/20 text-white px-6 py-4 rounded-xl font-semibold hover:bg-white/30 transition-colors border-2 border-white/30"
                >
                  Chiama Ora
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

