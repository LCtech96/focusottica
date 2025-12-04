'use client'

import { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
      setIsMobileMenuOpen(false)
    }
  }

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'glass-effect shadow-ios'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex-shrink-0">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-ocean-600 to-ocean-400 bg-clip-text text-transparent">
              Focus Ottica
            </h1>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <button
              onClick={() => scrollToSection('home')}
              className="text-gray-700 hover:text-ocean-600 transition-colors font-medium"
            >
              Home
            </button>
            <button
              onClick={() => scrollToSection('about')}
              className="text-gray-700 hover:text-ocean-600 transition-colors font-medium"
            >
              Chi Siamo
            </button>
            <button
              onClick={() => scrollToSection('services')}
              className="text-gray-700 hover:text-ocean-600 transition-colors font-medium"
            >
              Servizi
            </button>
            <button
              onClick={() => scrollToSection('gallery')}
              className="text-gray-700 hover:text-ocean-600 transition-colors font-medium"
            >
              Collezione
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              className="bg-ocean-600 text-white px-6 py-2 rounded-full hover:bg-ocean-700 transition-all shadow-lg hover:shadow-xl"
            >
              Contatti
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-gray-700"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden glass-effect border-t border-white/20">
          <div className="px-4 pt-2 pb-4 space-y-2">
            <button
              onClick={() => scrollToSection('home')}
              className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-ocean-50 rounded-lg transition-colors"
            >
              Home
            </button>
            <button
              onClick={() => scrollToSection('about')}
              className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-ocean-50 rounded-lg transition-colors"
            >
              Chi Siamo
            </button>
            <button
              onClick={() => scrollToSection('services')}
              className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-ocean-50 rounded-lg transition-colors"
            >
              Servizi
            </button>
            <button
              onClick={() => scrollToSection('gallery')}
              className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-ocean-50 rounded-lg transition-colors"
            >
              Collezione
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              className="block w-full text-left px-4 py-2 bg-ocean-600 text-white rounded-lg hover:bg-ocean-700 transition-colors"
            >
              Contatti
            </button>
          </div>
        </div>
      )}
    </nav>
  )
}




