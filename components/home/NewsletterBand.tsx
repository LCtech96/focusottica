import { MessageCircle, Phone } from 'lucide-react'
import Media from './Media'
import type { GroupContent } from '@/lib/site-content'

export default function NewsletterBand({ content }: { content: GroupContent }) {
  const item = content.items[0]
  if (!item) return null

  return (
    <section id="newsletter" className="relative bg-gray-950">
      <div className="relative min-h-[340px] overflow-hidden">
        <Media src={item.image} alt="" className="absolute inset-0 w-full h-full opacity-40" />

        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 py-20 text-center text-white">
          {item.title && <h2 className="text-3xl sm:text-4xl font-semibold">{item.title}</h2>}
          {item.description && <p className="mt-4 text-white/85">{item.description}</p>}

          <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href={item.href || 'https://wa.me/393342590448'}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-[#25D366] text-white px-7 py-3.5 text-sm font-medium hover:bg-[#128C7E] transition-colors"
            >
              <MessageCircle size={18} />
              {item.ctaLabel || 'Contattaci ora'}
            </a>
            <a
              href="tel:+393342590448"
              className="inline-flex items-center justify-center gap-2 bg-white text-gray-950 px-7 py-3.5 text-sm font-medium hover:bg-gray-100 transition-colors"
            >
              <Phone size={18} />
              +39 334 259 0448
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
