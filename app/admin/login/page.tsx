import { Suspense } from 'react'
import type { Metadata } from 'next'
import LoginForm from '@/components/admin/LoginForm'

export const metadata: Metadata = {
  title: 'Accesso area riservata | Focus Ottica',
  robots: { index: false, follow: false },
}

export const dynamic = 'force-dynamic'

export default function AdminLoginPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-gray-950" />}>
      <LoginForm />
    </Suspense>
  )
}
