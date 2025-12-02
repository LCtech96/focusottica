'use client'

import { Eye, Sun, Contact, Sparkles, MessageCircle } from 'lucide-react'

export default function Services() {
  const handleWhatsApp = () => {
    window.open('https://wa.me/393342590448?text=Ciao! Vorrei informazioni sui vostri servizi.', '_blank')
  }

  const services = [
    {
      icon: Eye,
      title: 'Occhiali da Vista',
      description: 'Ampia selezione di montature moderne e classiche, con lenti di ultima generazione per ogni esigenza visiva.',
      color: 'from-ocean-400 to-ocean-600',
    },
    {
      icon: Sun,
      title: 'Occhiali da Sole',
      description: 'Protezione UV completa con stile. Montature firmate e lenti polarizzate per il tuo comfort al mare.',
      color: 'from-sand-300 to-sand-500',
    },
    {
      icon: Contact,
      title: 'Lenti a Contatto',
      description: 'Lenti giornaliere, mensili e annuali delle migliori marche. Consulenza personalizzata per la scelta ideale.',
      color: 'from-ocean-500 to-sand-400',
    },
    {
      icon: Sparkles,
      title: 'Servizio di Montaggio',
      description: 'Montaggio professionale e personalizzazione su misura. Assistenza post-vendita completa e garantita.',
      color: 'from-ocean-400 to-ocean-700',
    },
  ]

  return (
    <section id="services" className="py-24 bg-gradient-to-br from-ocean-50 to-sand-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            I Nostri Servizi
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-ocean-400 to-ocean-600 mx-auto rounded-full"></div>
          <p className="text-xl text-gray-600 mt-6 max-w-3xl mx-auto">
            Soluzioni complete per la cura della tua vista, con prodotti di alta qualità e servizio professionale
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {services.map((service, index) => {
            const Icon = service.icon
            return (
              <div
                key={index}
                className="glass-effect p-8 rounded-3xl shadow-ios hover:shadow-xl transition-all duration-300 hover:scale-[1.02] group"
              >
                <div className={`w-20 h-20 bg-gradient-to-br ${service.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className="text-white" size={40} />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{service.title}</h3>
                <p className="text-gray-600 text-lg leading-relaxed">{service.description}</p>
              </div>
            )
          })}
        </div>

        {/* CTA Section */}
        <div className="mt-16 glass-effect rounded-3xl p-12 shadow-ios-lg text-center">
          <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Hai Bisogno di Consulenza?
          </h3>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Contattaci su WhatsApp per una consulenza personalizzata. Siamo qui per aiutarti a trovare 
            la soluzione perfetta per le tue esigenze visive.
          </p>
          <button
            onClick={handleWhatsApp}
            className="inline-flex items-center gap-3 bg-[#25D366] text-white px-10 py-5 rounded-2xl font-semibold text-lg shadow-ios-lg hover:shadow-2xl hover:scale-105 transition-all duration-300"
          >
            <MessageCircle size={24} />
            <span>Richiedi Consulenza su WhatsApp</span>
          </button>
        </div>
      </div>
    </section>
  )
}



