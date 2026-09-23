import { NextResponse } from 'next/server'
import { UPLOAD_FILENAME_PATTERN, readUpload } from '@/lib/storage'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

/**
 * Serve le foto caricate dal pannello admin, con entrambi i driver.
 *
 * Con Vercel Blob i file sono salvati come `private` e letti qui col token:
 * così funzionano anche se lo store non serve file pubblici, e restano sul
 * nostro dominio. Con il filesystem i file sono letti da `data/uploads/`,
 * dove non possono stare in `public/` perché Next fissa l'elenco dei file
 * statici all'avvio e ignorerebbe quelli caricati dopo.
 *
 * Il nome file è generato da noi (UUID + estensione) e viene validato prima
 * di toccare l'archivio: nessun percorso arbitrario può passare di qui.
 */
export async function GET(_request: Request, { params }: { params: { file: string } }) {
  const filename = params.file

  if (!UPLOAD_FILENAME_PATTERN.test(filename)) {
    return new NextResponse('Not found', { status: 404 })
  }

  try {
    const upload = await readUpload(filename)
    if (!upload) return new NextResponse('Not found', { status: 404 })

    return new NextResponse(upload.body as BodyInit, {
      headers: {
        'Content-Type': upload.contentType,
        // Il nome file cambia a ogni caricamento, quindi il contenuto di un
        // dato URL non cambia mai: si può mettere in cache per sempre.
        'Cache-Control': 'public, max-age=31536000, immutable',
      },
    })
  } catch (error) {
    console.error('[media] lettura fallita:', error)
    return new NextResponse('Not found', { status: 404 })
  }
}
