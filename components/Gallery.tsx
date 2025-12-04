'use client'

import { useState } from 'react'
import Image from 'next/image'
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface Product {
  id: number
  name: string
  brand: string
  image: string
  description: string
}

const products: Product[] = [
  {
    id: 1,
    name: 'Occhiali Esagonali',
    brand: 'GUCCI',
    image: '/products/gucci-1.jpg',
    description: 'Montatura oro con lenti sfumate marrone'
  },
  {
    id: 2,
    name: 'Occhiali Rettangolari',
    brand: 'GUCCI',
    image: '/products/gucci-2.jpg',
    description: 'Montatura oro con lenti marroni'
  },
  {
    id: 3,
    name: 'Occhiali con Dettagli',
    brand: 'GUCCI',
    image: '/products/gucci-3.jpg',
    description: 'Montatura oro con lenti viola chiaro'
  },
  {
    id: 4,
    name: 'Occhiali Gatto Rosa',
    brand: 'GUCCI',
    image: '/products/gucci-4.jpg',
    description: 'Montatura trasparente rosa con lenti specchiate'
  },
  {
    id: 5,
    name: 'Occhiali Shield',
    brand: 'GUCCI',
    image: '/products/gucci-5.jpg',
    description: 'Montatura argentata con lenti grigie'
  },
  {
    id: 6,
    name: 'Occhiali Cat-Eye Neri',
    brand: 'GUCCI',
    image: '/products/gucci-6.jpg',
    description: 'Montatura nera con aste verdi marmorizzate'
  },
  {
    id: 7,
    name: 'Occhiali Quadrati',
    brand: 'GUCCI',
    image: '/products/gucci-7.jpg',
    description: 'Montatura nera con lenti ambra'
  },
  {
    id: 8,
    name: 'Occhiali Aviator',
    brand: 'GUCCI',
    image: '/products/gucci-8.jpg',
    description: 'Montatura oro con aste tartaruga'
  },
  {
    id: 9,
    name: 'Occhiali Bianchi',
    brand: 'GUCCI',
    image: '/products/gucci-9.jpg',
    description: 'Montatura bianca marmorizzata con lenti marroni'
  }
]

export default function Gallery() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const itemsPerPage = 3

  const nextSlide = () => {
    setCurrentIndex((prev) => 
      prev + itemsPerPage >= products.length ? 0 : prev + itemsPerPage
    )
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => 
      prev - itemsPerPage < 0 ? Math.max(0, products.length - itemsPerPage) : prev - itemsPerPage
    )
  }

  const visibleProducts = products.slice(currentIndex, currentIndex + itemsPerPage)

  return (
    <section id="gallery" className="py-24 bg-gradient-to-br from-ocean-50 via-white to-sand-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Nuovi Arrivi
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-ocean-400 to-ocean-600 mx-auto rounded-full"></div>
          <p className="text-xl text-gray-600 mt-6 max-w-3xl mx-auto">
            Scopri la nostra collezione esclusiva di occhiali di lusso
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="relative">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            {visibleProducts.map((product) => (
              <div
                key={product.id}
                className="glass-effect rounded-3xl overflow-hidden shadow-ios hover:shadow-xl transition-all duration-300 hover:scale-105 group"
              >
                <div className="relative aspect-square bg-white p-8">
                  <div className="w-full h-full flex items-center justify-center">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-contain"
                      onError={(e) => {
                        // Fallback to placeholder if image fails to load
                        e.currentTarget.src = `https://placehold.co/600x600/e0f2fe/0c4a6e?text=${encodeURIComponent(product.name)}`
                      }}
                    />
                  </div>
                </div>
                <div className="p-6 bg-white/80 backdrop-blur-sm">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {product.name}
                  </h3>
                  <p className="text-gray-600 text-sm">
                    {product.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation Arrows */}
          <div className="flex justify-center gap-4">
            <button
              onClick={prevSlide}
              className="w-12 h-12 bg-ocean-600 text-white rounded-full flex items-center justify-center hover:bg-ocean-700 transition-colors shadow-lg hover:scale-110"
              aria-label="Precedente"
            >
              <ChevronLeft size={24} />
            </button>
            <button
              onClick={nextSlide}
              className="w-12 h-12 bg-ocean-600 text-white rounded-full flex items-center justify-center hover:bg-ocean-700 transition-colors shadow-lg hover:scale-110"
              aria-label="Successivo"
            >
              <ChevronRight size={24} />
            </button>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center gap-2 mt-6">
            {Array.from({ length: Math.ceil(products.length / itemsPerPage) }).map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index * itemsPerPage)}
                className={`w-2 h-2 rounded-full transition-all ${
                  Math.floor(currentIndex / itemsPerPage) === index
                    ? 'bg-ocean-600 w-8'
                    : 'bg-gray-300'
                }`}
                aria-label={`Vai al gruppo ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

