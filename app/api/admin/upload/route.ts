import { NextResponse } from 'next/server'
import { MAX_UPLOAD_BYTES, isAllowedImageType, saveUpload } from '@/lib/storage'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export async function POST(request: Request) {
  let formData: FormData
  try {
    formData = await request.formData()
  } catch {
    return NextResponse.json({ error: 'Caricamento non valido.' }, { status: 400 })
  }

  const file = formData.get('file')
  if (!(file instanceof File) || file.size === 0) {
    return NextResponse.json({ error: 'Nessun file selezionato.' }, { status: 400 })
  }

  if (!isAllowedImageType(file.type)) {
    return NextResponse.json(
      { error: 'Formato non supportato. Usa JPG, PNG, WEBP, AVIF o GIF.' },
      { status: 415 }
    )
  }

  if (file.size > MAX_UPLOAD_BYTES) {
    return NextResponse.json(
      { error: `Immagine troppo pesante (max ${Math.round(MAX_UPLOAD_BYTES / 1024 / 1024)} MB).` },
      { status: 413 }
    )
  }

  try {
    const url = await saveUpload(file)
    return NextResponse.json({ ok: true, url })
  } catch (error) {
    console.error('[upload] salvataggio fallito:', error)
    return NextResponse.json({ error: 'Salvataggio dell’immagine non riuscito.' }, { status: 500 })
  }
}
