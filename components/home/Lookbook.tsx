import Media from './Media'
import SectionHeading from './SectionHeading'
import type { GroupContent } from '@/lib/site-content'

export default function Lookbook({ content }: { content: GroupContent }) {
  return (
    <section id="lookbook" className="py-16 sm:py-20 bg-gray-50 border-y border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title={content.heading?.title}
          subtitle={content.heading?.subtitle}
          align="center"
        />

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          {content.items.map((item, index) => {
            const inner = (
              <>
                <div className="aspect-square overflow-hidden bg-gray-100">
                  <Media
                    src={item.image}
                    alt={item.caption || 'Focus Ottica'}
                    className="w-full h-full hover:scale-105 transition-transform duration-700"
                  />
                </div>
                {item.caption && (
                  <p className="mt-2 text-xs text-gray-600 text-center">{item.caption}</p>
                )}
              </>
            )

            return item.href ? (
              <a key={index} href={item.href} className="block">
                {inner}
              </a>
            ) : (
              <div key={index}>{inner}</div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
