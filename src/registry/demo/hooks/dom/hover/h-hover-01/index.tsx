'use client'

import * as React from 'react'
import { useHover } from '@/registry/hooks/dom/use-hover'
import { Card, CardPanel } from '@/registry/primitives/card'
import { Badge } from '@/registry/primitives/badge'
import { IconPointer } from '@tabler/icons-react'

export default function Demo() {
  const [ref, isHovered] = useHover<HTMLDivElement>()

  return (
    <Card className="w-full max-w-md bg-muted rounded-2xl overflow-hidden">
      <div className="flex items-center justify-between gap-3 px-3 pt-1 pb-1">
        <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
          <Badge variant="secondary" className="rounded-sm aspect-square h-full! bg-transparent">
            <IconPointer className="size-4 text-muted-foreground" />
          </Badge>
          <span>Hover</span>
        </div>
        <Badge variant={isHovered ? 'success' : 'outline'} size="sm">
          {isHovered ? 'Hovered' : 'Idle'}
        </Badge>
      </div>
      <CardPanel className="rounded-[0.875rem] bg-background p-3">
        <div
          ref={ref}
          className="flex items-center justify-center rounded-lg bg-muted p-6 text-sm font-semibold text-muted-foreground"
        >
          {isHovered ? 'Hovering' : 'Hover here'}
        </div>
      </CardPanel>
    </Card>
  )
}
