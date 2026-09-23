'use client'

import { useEffect, useState } from 'react'

const MESSAGES = [
  'Controllo della vista gratuito su appuntamento',
  'Montature originali con garanzia ufficiale',
  'Castellammare del Golfo (TP) — da 25 anni al tuo fianco',
]

export default function TopBar() {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => setIndex((i) => (i + 1) % MESSAGES.length), 4500)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="bg-gray-950 text-white text-xs sm:text-sm">
      <div className="max-w-7xl mx-auto px-4 h-9 flex items-center justify-center text-center">
        <p className="truncate tracking-wide">{MESSAGES[index]}</p>
      </div>
    </div>
  )
}
