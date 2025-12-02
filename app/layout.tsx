import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Focus Ottica - Castellammare del Golfo | 25 Anni di Esperienza',
  description: 'Focus Ottica, la tua ottica di fiducia a Castellammare del Golfo. Oltre 25 anni di esperienza nella cura della vista. Occhiali da vista, da sole e lenti a contatto.',
  keywords: 'ottica, castellammare del golfo, occhiali, lenti, vista, sicilia',
  openGraph: {
    title: 'Focus Ottica - Castellammare del Golfo',
    description: 'Oltre 25 anni di esperienza nella cura della vista',
    type: 'website',
    locale: 'it_IT',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="it">
      <body className={inter.className}>{children}</body>
    </html>
  )
}



