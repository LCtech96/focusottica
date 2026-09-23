import { ImageIcon } from 'lucide-react'

/**
 * Immagine di una "finestra" della home page.
 * Se la foto non è ancora stata caricata dal pannello admin mostra un
 * segnaposto discreto, così il layout resta identico.
 */
export default function Media({
  src,
  alt,
  className = '',
  priority = false,
  contain = false,
}: {
  src: string
  alt: string
  className?: string
  priority?: boolean
  contain?: boolean
}) {
  if (!src) {
    return (
      <div
        className={`bg-gray-100 flex flex-col items-center justify-center text-gray-300 ${className}`}
        aria-hidden="true"
      >
        <ImageIcon size={28} />
      </div>
    )
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      loading={priority ? 'eager' : 'lazy'}
      className={`${contain ? 'object-contain' : 'object-cover'} ${className}`}
    />
  )
}
