import Link from 'next/link'
import { cookies } from 'next/headers'
import { AlertTriangle, ArrowRight, ImageIcon, ExternalLink, ScanFace } from 'lucide-react'
import { GROUPS, TOTAL_WINDOWS, filledWindows, tryOnReadyWindows } from '@/lib/site-content'
import { readContent, storageDriverName, usingBlobStorage } from '@/lib/storage'
import { SESSION_COOKIE, usingDefaultCredentials, verifySessionToken } from '@/lib/auth'
import LogoutButton from '@/components/admin/LogoutButton'

export const dynamic = 'force-dynamic'

export default async function AdminDashboard() {
  const content = await readContent()
  const session = await verifySessionToken(cookies().get(SESSION_COOKIE)?.value)

  const totalFilled = GROUPS.reduce((sum, group) => sum + filledWindows(content, group.id), 0)

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Intestazione */}
      <header className="flex flex-wrap items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Gestione foto della home page</h1>
          <p className="text-gray-600 mt-1">
            Accesso come <span className="font-medium">{session?.email}</span>
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href="/"
            target="_blank"
            className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 border border-gray-300 rounded-lg px-3 py-2 transition-colors"
          >
            <ExternalLink size={16} />
            Vedi il sito
          </Link>
          <LogoutButton />
        </div>
      </header>

      {/* Avvisi di configurazione */}
      <div className="space-y-3 mb-8">
        {usingDefaultCredentials() && (
          <div className="flex gap-3 bg-amber-50 border border-amber-200 text-amber-900 rounded-xl px-4 py-3 text-sm">
            <AlertTriangle size={18} className="flex-shrink-0 mt-0.5" />
            <p>
              Stai usando le credenziali predefinite. Imposta le variabili d’ambiente{' '}
              <code className="font-mono">ADMIN_PASSWORD</code> e{' '}
              <code className="font-mono">AUTH_SECRET</code> per proteggere davvero l’area riservata.
            </p>
          </div>
        )}
        {!usingBlobStorage() && (
          <div className="flex gap-3 bg-sky-50 border border-sky-200 text-sky-900 rounded-xl px-4 py-3 text-sm">
            <AlertTriangle size={18} className="flex-shrink-0 mt-0.5" />
            <p>
              Archiviazione attuale: <strong>{storageDriverName()}</strong>. In produzione su Vercel
              configura <code className="font-mono">BLOB_READ_WRITE_TOKEN</code>, altrimenti le foto
              caricate vanno perse a ogni nuovo deploy.
            </p>
          </div>
        )}
      </div>

      {/* Riepilogo */}
      <div className="grid sm:grid-cols-3 gap-4 mb-10">
        <SummaryCard value={GROUPS.length} label="Gruppi di finestre" />
        <SummaryCard value={TOTAL_WINDOWS} label="Finestre foto totali" />
        <SummaryCard value={`${totalFilled}/${TOTAL_WINDOWS}`} label="Finestre con foto caricata" />
      </div>

      {/* Elenco gruppi */}
      <h2 className="text-lg font-semibold text-gray-900 mb-4">
        Gruppi di finestre presenti nella home page
      </h2>
      <p className="text-gray-600 mb-6 max-w-3xl">
        Ogni riquadro qui sotto corrisponde a una sezione della home page, nello stesso ordine in cui
        appare sul sito. Apri un gruppo per caricare le foto e scrivere le descrizioni delle sue finestre.
      </p>

      <div className="grid md:grid-cols-2 gap-5">
        {GROUPS.map((group) => {
          const filled = filledWindows(content, group.id)
          const tryOnReady = group.extraImages ? tryOnReadyWindows(content, group.id) : null
          const items = content.groups[group.id]?.items || []

          return (
            <Link
              key={group.id}
              href={`/admin/gruppi/${group.id}`}
              className="group bg-white rounded-2xl border border-gray-200 p-5 hover:border-ocean-400 hover:shadow-lg transition-all"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <span className="inline-block text-xs font-medium text-ocean-700 bg-ocean-50 rounded-full px-2.5 py-1 mb-2">
                    {group.position}
                  </span>
                  <h3 className="font-semibold text-gray-900">{group.label}</h3>
                  <p className="text-sm text-gray-600 mt-1">{group.hint}</p>
                </div>
                <ArrowRight
                  size={20}
                  className="flex-shrink-0 text-gray-400 group-hover:text-ocean-600 group-hover:translate-x-1 transition-all"
                />
              </div>

              <div className="flex items-center gap-2 mt-4 text-sm">
                <ImageIcon size={16} className="text-gray-400" />
                <span className="text-gray-700">
                  <strong>{group.windows}</strong> {group.windows === 1 ? 'finestra' : 'finestre'}
                </span>
                <span className="text-gray-400">·</span>
                <span className={filled === group.windows ? 'text-green-700' : 'text-amber-700'}>
                  {filled} con foto
                </span>
                {group.optionalImage && (
                  <>
                    <span className="text-gray-400">·</span>
                    <span className="text-gray-500">foto facoltativa</span>
                  </>
                )}
              </div>

              {tryOnReady !== null && (
                <div className="flex items-center gap-2 mt-2 text-sm">
                  <ScanFace size={16} className="text-gray-400" />
                  <span className={tryOnReady > 0 ? 'text-green-700' : 'text-gray-500'}>
                    {tryOnReady} con prova virtuale attiva
                  </span>
                </div>
              )}

              {/* Anteprime */}
              <div className="flex gap-2 mt-4 overflow-hidden">
                {items.slice(0, 6).map((item, index) => (
                  <div
                    key={index}
                    className="w-12 h-12 rounded-lg bg-gray-100 border border-gray-200 overflow-hidden flex-shrink-0"
                  >
                    {item.image ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={item.image} alt="" className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-300">
                        <ImageIcon size={16} />
                      </div>
                    )}
                  </div>
                ))}
                {items.length > 6 && (
                  <div className="w-12 h-12 rounded-lg bg-gray-50 border border-gray-200 flex items-center justify-center text-xs text-gray-500 flex-shrink-0">
                    +{items.length - 6}
                  </div>
                )}
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}

function SummaryCard({ value, label }: { value: string | number; label: string }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-5">
      <p className="text-3xl font-semibold text-gray-900">{value}</p>
      <p className="text-sm text-gray-600 mt-1">{label}</p>
    </div>
  )
}
