import { promises as fs } from 'fs'
import { NextResponse } from 'next/server'
import {
  CONTENT_TYPE_BY_EXTENSION,
  UPLOAD_FILENAME_PATTERN,
  uploadFilePath,
} from '@/lib/storage'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

/**
 * Serve le foto caricate dal pannello admin quando si usa il driver
 * filesystem. Non si possono mettere in `public/`: Next.js costruisce
 * l'elenco dei file statici all'avvio e ignorerebbe quelli aggiunti dopo.
 *
 * Con Vercel Blob questa route non viene usata: le immagini hanno già
 * un URL pubblico sul CDN.
 */
export async function GET(_request: Request, { params }: { params: { file: string } }) {
  const filename = params.file

  if (!UPLOAD_FILENAME_PATTERN.test(filename)) {
    return new NextResponse('Not found', { status: 404 })
  }

  try {
    const data = await fs.readFile(uploadFilePath(filename))
    const extension = filename.split('.').pop() as string

    return new NextResponse(new Uint8Array(data), {
      headers: {
        'Content-Type': CONTENT_TYPE_BY_EXTENSION[extension] || 'application/octet-stream',
        'Cache-Control': 'public, max-age=31536000, immutable',
      },
    })
  } catch {
    return new NextResponse('Not found', { status: 404 })
  }
}
