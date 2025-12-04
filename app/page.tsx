import Hero from '@/components/Hero'
import About from '@/components/About'
import Services from '@/components/Services'
import Gallery from '@/components/Gallery'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'
import Navigation from '@/components/Navigation'
import WhatsAppFloat from '@/components/WhatsAppFloat'

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navigation />
      <Hero />
      <About />
      <Services />
      <Gallery />
      <Contact />
      <Footer />
      <WhatsAppFloat />
    </main>
  )
}

