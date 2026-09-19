export default function SectionHeading({
  title,
  subtitle,
  align = 'left',
}: {
  title?: string
  subtitle?: string
  align?: 'left' | 'center'
}) {
  if (!title && !subtitle) return null

  return (
    <div className={`mb-8 ${align === 'center' ? 'text-center' : ''}`}>
      {title && (
        <h2 className="text-2xl sm:text-3xl font-semibold text-gray-950 tracking-tight">{title}</h2>
      )}
      {subtitle && <p className="mt-2 text-gray-600">{subtitle}</p>}
    </div>
  )
}
