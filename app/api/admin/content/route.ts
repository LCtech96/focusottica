import { NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'
import { GROUPS_BY_ID, imageKeys, normalizeContent, type WindowItem } from '@/lib/site-content'
import { readContent, storageWriteBlocker, writeContent } from '@/lib/storage'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export async function GET() {
  const content = await readContent()
  return NextResponse.json(content)
}

/**
 * Salva un singolo gruppo di finestre.
 * Body: { groupId: string, heading?: {title, subtitle}, items: WindowItem[] }
 */
export async function PUT(request: Request) {
  const blocker = storageWriteBlocker()
  if (blocker) return NextResponse.json({ error: blocker }, { status: 503 })

  let body: {
    groupId?: unknown
    heading?: { title?: unknown; subtitle?: unknown }
    items?: unknown
  }

  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Richiesta non valida.' }, { status: 400 })
  }

  const groupId = typeof body.groupId === 'string' ? body.groupId : ''
  const group = GROUPS_BY_ID[groupId]
  if (!group) {
    return NextResponse.json({ error: 'Gruppo di finestre inesistente.' }, { status: 404 })
  }

  if (!Array.isArray(body.items)) {
    return NextResponse.json({ error: 'Elenco finestre mancante.' }, { status: 400 })
  }

  // Si accettano solo le chiavi previste dallo schema del gruppo.
  const allowedKeys = new Set([...imageKeys(group), ...group.fields.map((f) => f.key)])
  const items: WindowItem[] = []

  for (let i = 0; i < group.windows; i++) {
    const incoming = (body.items[i] || {}) as Record<string, unknown>
    const item: WindowItem = { image: '' }
    for (const key of Array.from(allowedKeys)) {
      const value = incoming[key]
      item[key] = typeof value === 'string' ? value.slice(0, 2000) : ''
    }
    items.push(item)
  }

  const current = await readContent()
  current.groups[groupId] = {
    heading: group.heading
      ? {
          title: String(body.heading?.title ?? group.heading.title).slice(0, 200),
          subtitle: String(body.heading?.subtitle ?? group.heading.subtitle).slice(0, 400),
        }
      : undefined,
    items,
  }

  const saved = await writeContent(normalizeContent(current))
  revalidatePath('/')

  return NextResponse.json({ ok: true, updatedAt: saved.updatedAt })
}
