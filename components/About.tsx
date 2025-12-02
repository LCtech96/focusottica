'use client'

import { Award, Users, Heart, MapPin } from 'lucide-react'

export default function About() {
  return (
    <section id="about" className="py-24 bg-white/50 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Chi Siamo
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-ocean-400 to-ocean-600 mx-auto rounded-full"></div>
          <p className="text-xl text-gray-600 mt-6 max-w-3xl mx-auto">
            La storia di Focus Ottica inizia oltre 25 anni fa, nel cuore di Castellammare del Golfo
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          {/* Text Content */}
          <div className="space-y-6">
            <p className="text-lg text-gray-700 leading-relaxed">
              Siamo un'ottica storica nel cuore della Sicilia, con oltre <strong className="text-ocean-600">25 anni di esperienza</strong> nella cura della vista. 
              La nostra passione per l'eccellenza e l'attenzione al dettaglio ci hanno reso un punto di riferimento 
              per migliaia di clienti soddisfatti.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              Situati in una delle zone più belle della Sicilia, combiniamo la tradizione artigianale italiana 
              con le tecnologie più avanzate nel campo dell'ottica. Ogni occhiale che vendiamo è scelto con cura 
              e ogni montatura è personalizzata per il tuo stile e le tue esigenze.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              La nostra missione è aiutarti a vedere il mondo con chiarezza, offrendoti soluzioni su misura 
              e un servizio attento e professionale.
            </p>
          </div>

          {/* Image Placeholder with ocean theme */}
          <div className="relative">
            <div className="aspect-square rounded-3xl overflow-hidden shadow-ios-lg">
              <div className="w-full h-full bg-gradient-to-br from-ocean-400 via-ocean-500 to-sand-400 flex items-center justify-center">
                <div className="text-center text-white p-8">
                  <Award size={64} className="mx-auto mb-4 opacity-80" />
                  <p className="text-2xl font-bold">25+ Anni</p>
                  <p className="text-lg mt-2">di Esperienza</p>
                </div>
              </div>
            </div>
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-sand-200 rounded-full opacity-50 blur-2xl"></div>
          </div>
        </div>

        {/* Values Grid */}
        <div className="grid md:grid-cols-3 gap-8 mt-16">
          <div className="glass-effect p-8 rounded-2xl shadow-ios hover:shadow-xl transition-all duration-300 hover:scale-105">
            <div className="w-16 h-16 bg-gradient-to-br from-ocean-400 to-ocean-600 rounded-2xl flex items-center justify-center mb-6">
              <Award className="text-white" size={32} />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">Esperienza</h3>
            <p className="text-gray-600">
              Oltre 25 anni di competenza nel settore ottico, garantendo sempre la massima qualità
            </p>
          </div>

          <div className="glass-effect p-8 rounded-2xl shadow-ios hover:shadow-xl transition-all duration-300 hover:scale-105">
            <div className="w-16 h-16 bg-gradient-to-br from-sand-300 to-sand-500 rounded-2xl flex items-center justify-center mb-6">
              <Heart className="text-white" size={32} />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">Passione</h3>
            <p className="text-gray-600">
              Amiamo il nostro lavoro e ci prendiamo cura di ogni cliente con dedizione e attenzione
            </p>
          </div>

          <div className="glass-effect p-8 rounded-2xl shadow-ios hover:shadow-xl transition-all duration-300 hover:scale-105">
            <div className="w-16 h-16 bg-gradient-to-br from-ocean-500 to-sand-400 rounded-2xl flex items-center justify-center mb-6">
              <Users className="text-white" size={32} />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">Fiducia</h3>
            <p className="text-gray-600">
              Migliaia di clienti soddisfatti ci hanno scelto come loro ottica di fiducia
            </p>
          </div>
        </div>

        {/* Location Badge */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center gap-3 glass-effect px-8 py-4 rounded-full shadow-ios">
            <MapPin className="text-ocean-600" size={24} />
            <span className="text-lg font-semibold text-gray-700">
              Castellammare del Golfo, Sicilia
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}



