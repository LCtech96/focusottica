import Media from './Media'
import type { GroupContent } from '@/lib/site-content'

export default function EditorialDuo({ content }: { content: GroupContent }) {
  return (
    <section id="editoriale" className="py-16 sm:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-6 lg:gap-10">
          {content.items.map((item, index) => (
            <article key={index} className="group">
              <div className="aspect-[4/5] overflow-hidden bg-gray-100">
                <Media
                  src={item.image}
                  alt={item.title || 'Focus Ottica'}
                  className="w-full h-full group-hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div className="pt-6">
                {item.eyebrow && (
                  <p className="text-xs uppercase tracking-[0.2em] text-gray-500">{item.eyebrow}</p>
                )}
                {item.title && (
                  <h3 className="mt-2 text-2xl font-semibold text-gray-950">{item.title}</h3>
                )}
                {item.description && (
                  <p className="mt-3 text-gray-600 leading-relaxed">{item.description}</p>
                )}
                {item.ctaLabel && (
                  <a
                    href={item.href || '#contatti'}
                    className="inline-block mt-5 text-sm font-medium text-gray-950 border-b border-gray-950 pb-1 hover:text-gray-600 hover:border-gray-600 transition-colors"
                  >
                    {item.ctaLabel}
                  </a>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
