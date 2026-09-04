import { IconCalendar, IconExternalLink, IconFileCode } from '@tabler/icons-react'
import type { DocDependency } from '@/lib/docs-metadata'
import { Badge } from '@/registry/primitives/badge'
import { Link } from '@/registry/primitives/link'

interface DocHeaderMetadataProps {
  updatedAt?: string
  createdAt?: string
  size?: string
  dependencies?: DocDependency[]
}

function formatDate(dateStr?: string): string | null {
  if (!dateStr) return null
  try {
    const d = new Date(dateStr)
    if (isNaN(d.getTime())) return dateStr
    return d.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  } catch {
    return dateStr
  }
}

export function DocHeaderMetadata({ updatedAt, createdAt, size, dependencies = [] }: DocHeaderMetadataProps) {
  const displayDate = formatDate(updatedAt || createdAt)

  return (
    <div className="flex flex-col gap-2 pt-1 not-prose">
      {(size || displayDate) && (
        <div className="inline-flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
          {size && (
            <div className="inline-flex items-center gap-1.5">
              <IconFileCode className="size-4 text-muted-foreground" />
              <span>{size}</span>
            </div>
          )}
          {size && displayDate && <span className="text-border">•</span>}
          {displayDate && (
            <div className="inline-flex items-center gap-1.5">
              <IconCalendar className="size-4 text-muted-foreground" />
              <span>Updated on {displayDate}</span>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
