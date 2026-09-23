'use client'

import { useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Check, ImageIcon, LoaderCircle, Trash2, Upload } from 'lucide-react'
import type { GroupContent, GroupDef, WindowItem } from '@/lib/site-content'

interface Props {
  group: GroupDef
  initialContent: GroupContent
}

type Status = { type: 'idle' | 'saving' | 'saved' | 'error'; message?: string }

export default function GroupEditor({ group, initialContent }: Props) {
  const router = useRouter()
  const [heading, setHeading] = useState(initialContent.heading)
  const [items, setItems] = useState<WindowItem[]>(initialContent.items)
  const [status, setStatus] = useState<Status>({ type: 'idle' })
  // "<indice finestra>:<chiave foto>", es. "2:tryOnImage"
  const [uploadingIndex, setUploadingIndex] = useState<string | null>(null)

  function updateItem(index: number, key: string, value: string) {
    setItems((current) =>
      current.map((item, i) => (i === index ? { ...item, [key]: value } : item))
    )
    setStatus({ type: 'idle' })
  }

  async function handleUpload(index: number, imageKey: string, file: File) {
    setUploadingIndex(`${index}:${imageKey}`)
    setStatus({ type: 'idle' })

    try {
      const formData = new FormData()
      formData.append('file', file)
      const response = await fetch('/api/admin/upload', { method: 'POST', body: formData })
      const data = await response.json()

      if (!response.ok) {
        setStatus({ type: 'error', message: data.error || 'Caricamento non riuscito.' })
        return
      }
      updateItem(index, imageKey, data.url)
    } catch {
      setStatus({ type: 'error', message: 'Caricamento non riuscito. Controlla la connessione.' })
    } finally {
      setUploadingIndex(null)
    }
  }

  async function handleSave() {
    setStatus({ type: 'saving' })
    try {
      const response = await fetch('/api/admin/content', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ groupId: group.id, heading, items }),
      })
      const data = await response.json()

      if (!response.ok) {
        setStatus({ type: 'error', message: data.error || 'Salvataggio non riuscito.' })
        return
      }
      setStatus({ type: 'saved', message: 'Modifiche pubblicate sulla home page.' })
      router.refresh()
    } catch {
      setStatus({ type: 'error', message: 'Salvataggio non riuscito. Controlla la connessione.' })
    }
  }

  return (
    <div className="space-y-6">
      {/* Titolo della sezione */}
      {heading && (
        <section className="bg-white rounded-2xl border border-gray-200 p-5">
          <h2 className="font-semibold text-gray-900 mb-4">Titolo della sezione</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            <Field
              label="Titolo"
              value={heading.title}
              onChange={(value) => {
                setHeading({ ...heading, title: value })
                setStatus({ type: 'idle' })
              }}
            />
            <Field
              label="Sottotitolo"
              value={heading.subtitle}
              onChange={(value) => {
                setHeading({ ...heading, subtitle: value })
                setStatus({ type: 'idle' })
              }}
            />
          </div>
        </section>
      )}

      {/* Finestre */}
      {items.map((item, index) => (
        <section key={index} className="bg-white rounded-2xl border border-gray-200 p-5">
          <h2 className="font-semibold text-gray-900 mb-4">
            Finestra {index + 1}
            <span className="text-gray-400 font-normal"> / {group.windows}</span>
          </h2>

          <div className="grid md:grid-cols-[220px_1fr] gap-6">
            <div className="space-y-5">
              <ImageSlot
                value={item.image}
                uploading={uploadingIndex === `${index}:image`}
                optional={group.optionalImage}
                onUpload={(file) => handleUpload(index, 'image', file)}
                onClear={() => updateItem(index, 'image', '')}
              />

              {(group.extraImages || []).map((extra) => (
                <div key={extra.key} className="pt-5 border-t border-gray-200">
                  <p className="text-sm font-medium text-gray-700 mb-1">{extra.label}</p>
                  <p className="text-xs text-gray-500 mb-3 leading-relaxed">{extra.hint}</p>
                  <ImageSlot
                    value={item[extra.key] || ''}
                    uploading={uploadingIndex === `${index}:${extra.key}`}
                    optional
                    checkered
                    onUpload={(file) => handleUpload(index, extra.key, file)}
                    onClear={() => updateItem(index, extra.key, '')}
                  />
                  <p className="text-xs text-gray-500 mt-2">{extra.recommendedSize}</p>
                </div>
              ))}
            </div>

            <div className="space-y-4">
              {group.fields.map((field) => (
                <Field
                  key={field.key}
                  label={field.label}
                  type={field.type}
                  placeholder={field.placeholder}
                  value={item[field.key] || ''}
                  onChange={(value) => updateItem(index, field.key, value)}
                />
              ))}
            </div>
          </div>
        </section>
      ))}

      {/* Barra di salvataggio */}
      <div className="sticky bottom-0 bg-white/90 backdrop-blur border border-gray-200 rounded-2xl p-4 flex flex-wrap items-center justify-between gap-3 shadow-lg">
        <p className="text-sm">
          {status.type === 'saved' && (
            <span className="text-green-700 flex items-center gap-2">
              <Check size={16} /> {status.message}
            </span>
          )}
          {status.type === 'error' && <span className="text-red-600">{status.message}</span>}
          {status.type === 'idle' && (
            <span className="text-gray-500">Le modifiche sono visibili sul sito dopo il salvataggio.</span>
          )}
        </p>
        <button
          onClick={handleSave}
          disabled={status.type === 'saving' || uploadingIndex !== null}
          className="bg-ocean-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-ocean-700 transition-colors disabled:opacity-60 flex items-center gap-2"
        >
          {status.type === 'saving' && <LoaderCircle size={18} className="animate-spin" />}
          {status.type === 'saving' ? 'Salvataggio…' : 'Salva e pubblica'}
        </button>
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */

function ImageSlot({
  value,
  uploading,
  optional,
  checkered,
  onUpload,
  onClear,
}: {
  value: string
  uploading: boolean
  optional?: boolean
  /** scacchiera di sfondo, per giudicare la trasparenza di un PNG */
  checkered?: boolean
  onUpload: (file: File) => void
  onClear: () => void
}) {
  const inputRef = useRef<HTMLInputElement>(null)

  return (
    <div>
      <div
        className="aspect-square w-full rounded-xl bg-gray-100 border border-gray-200 overflow-hidden flex items-center justify-center"
        style={
          checkered
            ? {
                backgroundImage:
                  'linear-gradient(45deg, #e5e7eb 25%, transparent 25%), linear-gradient(-45deg, #e5e7eb 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #e5e7eb 75%), linear-gradient(-45deg, transparent 75%, #e5e7eb 75%)',
                backgroundSize: '16px 16px',
                backgroundPosition: '0 0, 0 8px, 8px -8px, -8px 0px',
              }
            : undefined
        }
      >
        {uploading ? (
          <LoaderCircle size={28} className="animate-spin text-gray-400" />
        ) : value ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={value}
            alt="Anteprima"
            className={`w-full h-full ${checkered ? 'object-contain' : 'object-cover'}`}
          />
        ) : (
          <div className="text-center text-gray-400 px-3">
            <ImageIcon size={28} className="mx-auto mb-2" />
            <p className="text-xs">{optional ? 'Nessuna foto (facoltativa)' : 'Nessuna foto'}</p>
          </div>
        )}
      </div>

      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp,image/avif,image/gif"
        className="hidden"
        onChange={(event) => {
          const file = event.target.files?.[0]
          if (file) onUpload(file)
          event.target.value = ''
        }}
      />

      <div className="flex gap-2 mt-3">
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={uploading}
          className="flex-1 flex items-center justify-center gap-2 text-sm border border-gray-300 rounded-lg px-3 py-2 hover:bg-gray-50 transition-colors disabled:opacity-60"
        >
          <Upload size={16} />
          {value ? 'Sostituisci' : 'Carica foto'}
        </button>
        {value && (
          <button
            type="button"
            onClick={onClear}
            className="text-sm border border-gray-300 rounded-lg px-3 py-2 text-red-600 hover:bg-red-50 transition-colors"
            aria-label="Rimuovi foto"
          >
            <Trash2 size={16} />
          </button>
        )}
      </div>
    </div>
  )
}

function Field({
  label,
  value,
  onChange,
  type = 'text',
  placeholder,
}: {
  label: string
  value: string
  onChange: (value: string) => void
  type?: string
  placeholder?: string
}) {
  const shared =
    'w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-ocean-500 focus:border-transparent text-sm'

  return (
    <label className="block">
      <span className="block text-sm font-medium text-gray-700 mb-1.5">{label}</span>
      {type === 'textarea' ? (
        <textarea
          rows={3}
          value={value}
          placeholder={placeholder}
          onChange={(e) => onChange(e.target.value)}
          className={shared}
        />
      ) : (
        <input
          type="text"
          inputMode={type === 'price' ? 'decimal' : undefined}
          value={value}
          placeholder={placeholder}
          onChange={(e) => onChange(e.target.value)}
          className={shared}
        />
      )}
    </label>
  )
}
