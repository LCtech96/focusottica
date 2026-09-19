import Media from './Media'
import SectionHeading from './SectionHeading'
import type { GroupContent } from '@/lib/site-content'

export default function BrandStrip({ content }: { content: GroupContent }) {
  return (
    <section id="brand" className="py-16 sm:py-20 bg-gray-50 border-y border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title={content.heading?.title}
          subtitle={content.heading?.subtitle}
          align="center"
        />

        <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-px bg-gray-200 border border-gray-200">
          {content.items.map((item, index) => {
            const inner = (
              <div className="bg-white h-24 flex items-center justify-center p-4">
                {item.image ? (
                  <Media
                    src={item.image}
                    alt={item.name || 'Brand'}
                    contain
                    className="max-h-12 max-w-full grayscale hover:grayscale-0 transition-all"
                  />
                ) : (
                  <span className="text-sm font-medium tracking-[0.12em] uppercase text-gray-600 text-center">
                    {item.name}
                  </span>
                )}
              </div>
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
