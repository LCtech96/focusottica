import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'
import { GROUPS_BY_ID } from '@/lib/site-content'
import { readContent } from '@/lib/storage'
import GroupEditor from '@/components/admin/GroupEditor'

export const dynamic = 'force-dynamic'

export default async function GroupPage({ params }: { params: { groupId: string } }) {
  const group = GROUPS_BY_ID[params.groupId]
  if (!group) notFound()

  const content = await readContent()
  const groupContent = content.groups[group.id]

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <Link
        href="/admin"
        className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 mb-6"
      >
        <ArrowLeft size={16} />
        Tutti i gruppi
      </Link>

      <header className="mb-8">
        <span className="inline-block text-xs font-medium text-ocean-700 bg-ocean-50 rounded-full px-2.5 py-1 mb-2">
          {group.position}
        </span>
        <h1 className="text-2xl font-semibold text-gray-900">{group.label}</h1>
        <p className="text-gray-600 mt-2 max-w-3xl">{group.hint}</p>
        <p className="text-sm text-gray-500 mt-3">
          {group.windows} {group.windows === 1 ? 'finestra' : 'finestre'} · formato consigliato{' '}
          {group.ratio} · {group.recommendedSize}
        </p>
      </header>

      <GroupEditor group={group} initialContent={groupContent} />
    </div>
  )
}
