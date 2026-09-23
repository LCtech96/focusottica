'use client'

import { useState } from 'react'
import dynamic from 'next/dynamic'
import { ScanFace } from 'lucide-react'

/**
 * Il modale porta con sé il motore di riconoscimento facciale: viene
 * caricato solo al primo clic, così la home page resta leggera.
 */
const TryOnModal = dynamic(() => import('./TryOnModal'), { ssr: false })

export default function TryOnButton({
  imageUrl,
  productName,
  brand,
}: {
  imageUrl: string
  productName: string
  brand?: string
}) {
  const [open, setOpen] = useState(false)

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="inline-flex items-center gap-1.5 bg-gray-950/90 text-white text-xs font-medium px-3 py-2 rounded-full backdrop-blur hover:bg-gray-950 transition-colors"
      >
        <ScanFace size={14} />
        Provali
      </button>

      {open && (
        <TryOnModal
          imageUrl={imageUrl}
          productName={productName}
          brand={brand}
          onClose={() => setOpen(false)}
        />
      )}
    </>
  )
}
