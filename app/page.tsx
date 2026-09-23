import TopBar from '@/components/home/TopBar'
import SiteHeader from '@/components/home/SiteHeader'
import HeroSlider from '@/components/home/HeroSlider'
import CategoryTiles from '@/components/home/CategoryTiles'
import ProductCarousel from '@/components/home/ProductCarousel'
import BrandStrip from '@/components/home/BrandStrip'
import EditorialDuo from '@/components/home/EditorialDuo'
import FullBanner from '@/components/home/FullBanner'
import ShapeGrid from '@/components/home/ShapeGrid'
import Lookbook from '@/components/home/Lookbook'
import ServiceStrip from '@/components/home/ServiceStrip'
import NewsletterBand from '@/components/home/NewsletterBand'
import SiteFooter from '@/components/home/SiteFooter'
import WhatsAppFloat from '@/components/WhatsAppFloat'
import { readContent } from '@/lib/storage'

// I contenuti arrivano dal pannello admin, quindi la pagina viene generata
// a ogni richiesta invece che al momento del build.
export const dynamic = 'force-dynamic'

export default async function Home() {
  const { groups } = await readContent()

  return (
    <main id="top" className="min-h-screen bg-white">
      <TopBar />
      <SiteHeader />

      {/* 1 */} <HeroSlider items={groups.hero.items} />
      {/* 2 */} <CategoryTiles content={groups.categorie} />
      {/* 3 */} <ProductCarousel id="novita" content={groups.novita} />
      {/* 4 */} <BrandStrip content={groups.brand} />
      {/* 5 */} <EditorialDuo content={groups.editoriale} />
      {/* 6 */} <ProductCarousel id="bestseller" content={groups.bestseller} />
      {/* 7 */} <FullBanner content={groups.banner} />
      {/* 8 */} <ShapeGrid content={groups.forme} />
      {/* 9 */} <Lookbook content={groups.lookbook} />
      {/* 10 */} <ServiceStrip content={groups.servizi} />
      {/* 11 */} <NewsletterBand content={groups.newsletter} />

      <SiteFooter />
      <WhatsAppFloat />
    </main>
  )
}
