import { Clock, Eye, Glasses, ShieldCheck, Sparkles } from 'lucide-react'
import Media from './Media'
import SectionHeading from './SectionHeading'
import type { GroupContent } from '@/lib/site-content'

const ICONS: Record<string, typeof Eye> = {
  eye: Eye,
  glasses: Glasses,
  shield: ShieldCheck,
  clock: Clock,
}

export default function ServiceStrip({ content }: { content: GroupContent }) {
  return (
    <section id="servizi" className="py-16 sm:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title={content.heading?.title}
          subtitle={content.heading?.subtitle}
          align="center"
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {content.items.map((item, index) => {
            const Icon = ICONS[item.icon] || Sparkles

            return (
              <article key={index} className="text-center">
                <div className="w-16 h-16 mx-auto rounded-full overflow-hidden bg-gray-100 flex items-center justify-center">
                  {item.image ? (
                    <Media src={item.image} alt={item.title || ''} className="w-full h-full" />
                  ) : (
                    <Icon size={26} className="text-gray-700" />
                  )}
                </div>
                {item.title && (
                  <h3 className="mt-4 font-medium text-gray-950">{item.title}</h3>
                )}
                {item.description && (
                  <p className="mt-2 text-sm text-gray-600 leading-relaxed">{item.description}</p>
                )}
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
