'use client'

import { MessageCircle, Phone, ArrowDown } from 'lucide-react'

export default function Hero() {
  const handleWhatsApp = () => {
    window.open('https://wa.me/393342590448', '_blank')
  }

  const handleCall = () => {
    window.location.href = 'tel:+393342590448'
  }

  const scrollToContact = () => {
    const element = document.getElementById('contact')
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background with ocean theme */}
      <div className="absolute inset-0 bg-gradient-to-br from-ocean-100 via-ocean-50 to-sand-100">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-10 w-72 h-72 bg-ocean-300 rounded-full mix-blend-multiply filter blur-xl animate-blob"></div>
          <div className="absolute top-40 right-10 w-72 h-72 bg-sand-300 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-1/2 w-72 h-72 bg-ocean-200 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000"></div>
        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="space-y-8">
          {/* Main Heading */}
          <div className="space-y-4">
            <h1 className="text-5xl md:text-7xl font-bold text-gray-900 leading-tight">
              La Tua Vista,
              <br />
              <span className="bg-gradient-to-r from-ocean-600 to-ocean-400 bg-clip-text text-transparent">
                La Nostra Passione
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto">
              Oltre 25 anni di esperienza a Castellammare del Golfo.
              <br />
              La tua ottica di fiducia nel cuore della Sicilia.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
            <button
              onClick={handleWhatsApp}
              className="group flex items-center gap-3 bg-[#25D366] text-white px-8 py-4 rounded-2xl font-semibold text-lg shadow-ios-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 w-full sm:w-auto"
            >
              <MessageCircle size={24} />
              <span>Scrivici su WhatsApp</span>
            </button>
            <button
              onClick={handleCall}
              className="group flex items-center gap-3 glass-effect text-ocean-600 px-8 py-4 rounded-2xl font-semibold text-lg shadow-ios hover:shadow-xl hover:scale-105 transition-all duration-300 w-full sm:w-auto"
            >
              <Phone size={24} />
              <span>Chiamaci Ora</span>
            </button>
          </div>

          {/* Trust Indicators */}
          <div className="pt-12 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="glass-effect p-6 rounded-2xl shadow-ios">
              <div className="text-3xl font-bold text-ocean-600">25+</div>
              <div className="text-gray-600 mt-2">Anni di Esperienza</div>
            </div>
            <div className="glass-effect p-6 rounded-2xl shadow-ios">
              <div className="text-3xl font-bold text-ocean-600">1000+</div>
              <div className="text-gray-600 mt-2">Clienti Soddisfatti</div>
            </div>
            <div className="glass-effect p-6 rounded-2xl shadow-ios">
              <div className="text-3xl font-bold text-ocean-600">24/7</div>
              <div className="text-gray-600 mt-2">Assistenza WhatsApp</div>
            </div>
          </div>

          {/* Scroll Indicator */}
          <button
            onClick={scrollToContact}
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce"
          >
            <ArrowDown className="text-ocean-600" size={32} />
          </button>
        </div>
      </div>

      <style jsx>{`
        @keyframes blob {
          0%, 100% {
            transform: translate(0, 0) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </section>
  )
}



