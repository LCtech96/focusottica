import Media from './Media'
import SectionHeading from './SectionHeading'
import type { GroupContent } from '@/lib/site-content'

export default function ShapeGrid({ content }: { content: GroupContent }) {
  return (
    <section id="forme" className="py-16 sm:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title={content.heading?.title}
          subtitle={content.heading?.subtitle}
          align="center"
        />

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-5">
          {content.items.map((item, index) => (
            <a key={index} href={item.href || '#novita'} className="group text-center">
              <div className="aspect-square overflow-hidden rounded-full bg-gray-100">
                <Media
                  src={item.image}
                  alt={item.name || 'Forma montatura'}
                  className="w-full h-full group-hover:scale-105 transition-transform duration-700"
                />
              </div>
              {item.name && (
                <h3 className="mt-3 text-sm font-medium text-gray-950">{item.name}</h3>
              )}
              {item.description && (
                <p className="mt-1 text-xs text-gray-600 leading-relaxed">{item.description}</p>
              )}
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
