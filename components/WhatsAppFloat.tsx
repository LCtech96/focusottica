'use client'

import { MessageCircle, X } from 'lucide-react'
import { useState } from 'react'

export default function WhatsAppFloat() {
  const [isOpen, setIsOpen] = useState(false)

  const handleWhatsApp = () => {
    window.open('https://wa.me/393342590448', '_blank')
    setIsOpen(false)
  }

  const handleWhatsAppMessage = (message: string) => {
    window.open(`https://wa.me/393342590448?text=${encodeURIComponent(message)}`, '_blank')
    setIsOpen(false)
  }

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 w-16 h-16 bg-[#25D366] text-white rounded-full shadow-ios-lg hover:shadow-2xl hover:scale-110 transition-all duration-300 flex items-center justify-center group"
        aria-label="Apri WhatsApp"
      >
        {isOpen ? (
          <X size={28} className="group-hover:rotate-90 transition-transform" />
        ) : (
          <MessageCircle size={28} />
        )}
      </button>

      {/* Popup Menu */}
      {isOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
            onClick={() => setIsOpen(false)}
          />
          <div className="fixed bottom-24 right-6 z-50 glass-effect rounded-3xl shadow-ios-lg p-6 w-80 transform transition-all duration-300 ease-out">
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              Contattaci su WhatsApp
            </h3>
            <div className="space-y-3">
              <button
                onClick={() => handleWhatsAppMessage('Ciao! Vorrei informazioni sui vostri servizi.')}
                className="w-full text-left px-4 py-3 bg-ocean-50 hover:bg-ocean-100 rounded-xl transition-colors text-gray-700 font-medium"
              >
                📋 Richiedi informazioni
              </button>
              <button
                onClick={() => handleWhatsAppMessage('Ciao! Vorrei prenotare un appuntamento.')}
                className="w-full text-left px-4 py-3 bg-ocean-50 hover:bg-ocean-100 rounded-xl transition-colors text-gray-700 font-medium"
              >
                📅 Prenota appuntamento
              </button>
              <button
                onClick={() => handleWhatsAppMessage('Ciao! Vorrei un preventivo.')}
                className="w-full text-left px-4 py-3 bg-ocean-50 hover:bg-ocean-100 rounded-xl transition-colors text-gray-700 font-medium"
              >
                💰 Richiedi preventivo
              </button>
              <button
                onClick={handleWhatsApp}
                className="w-full px-4 py-3 bg-[#25D366] text-white rounded-xl hover:bg-[#128C7E] transition-colors font-semibold flex items-center justify-center gap-2"
              >
                <MessageCircle size={20} />
                <span>Apri WhatsApp</span>
              </button>
            </div>
          </div>
        </>
      )}
    </>
  )
}

