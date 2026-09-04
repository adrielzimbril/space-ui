'use client'

import * as React from 'react'
import { Badge } from '@/registry/primitives/badge'
import * as TablerIcons from '@tabler/icons-react'
import * as LucideIcons from 'lucide-react'

export interface IconPreviewProps {
  library: 'tabler' | 'lucide'
  name: string
}

export function IconPreview({ library, name }: IconPreviewProps) {
  const IconComponent = library === 'tabler' ? (TablerIcons as any)[name] : (LucideIcons as any)[name]

  return (
    <span className="inline-flex items-center gap-2 align-middle">
      <Badge variant="outline" square size="lg">
        <IconComponent className="size-4 text-foreground" strokeWidth={1.8} />
      </Badge>
      <Badge className="bg-muted text-foreground text-[11px]">{name}</Badge>
    </span>
  )
}
