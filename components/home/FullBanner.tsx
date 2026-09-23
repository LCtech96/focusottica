import Media from './Media'
import type { GroupContent } from '@/lib/site-content'

export default function FullBanner({ content }: { content: GroupContent }) {
  const item = content.items[0]
  if (!item) return null

  return (
    <section id="banner" className="relative bg-gray-950">
      <div className="relative h-[42vh] min-h-[320px] max-h-[520px] overflow-hidden">
        <Media src={item.image} alt={item.title || 'Focus Ottica'} className="w-full h-full" />
        <div className="absolute inset-0 bg-black/50" />

        <div className="absolute inset-0 flex items-center">
          <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 text-center">
            {item.eyebrow && (
              <p className="text-xs uppercase tracking-[0.2em] text-white/80">{item.eyebrow}</p>
            )}
            {item.title && (
              <h2 className="mt-3 text-3xl sm:text-4xl font-semibold text-white max-w-3xl mx-auto">
                {item.title}
              </h2>
            )}
            {item.description && (
              <p className="mt-4 text-white/90 max-w-2xl mx-auto">{item.description}</p>
            )}
            {item.ctaLabel && (
              <a
                href={item.href || '#contatti'}
                className="inline-block mt-7 bg-white text-gray-950 px-7 py-3.5 text-sm font-medium tracking-wide hover:bg-gray-100 transition-colors"
              >
                {item.ctaLabel}
              </a>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
