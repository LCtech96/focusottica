import Media from './Media'
import SectionHeading from './SectionHeading'
import type { GroupContent } from '@/lib/site-content'

export default function CategoryTiles({ content }: { content: GroupContent }) {
  return (
    <section id="categorie" className="py-16 sm:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading title={content.heading?.title} subtitle={content.heading?.subtitle} />

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {content.items.map((item, index) => (
            <a
              key={index}
              href={item.href || '#novita'}
              className="group block"
            >
              <div className="relative aspect-[3/4] overflow-hidden bg-gray-100">
                <Media
                  src={item.image}
                  alt={item.title || 'Categoria'}
                  className="w-full h-full group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/55 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5 text-white">
                  <h3 className="text-lg font-semibold">{item.title}</h3>
                </div>
              </div>
              {item.description && (
                <p className="mt-3 text-sm text-gray-600 leading-relaxed">{item.description}</p>
              )}
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
