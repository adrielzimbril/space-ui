'use client'

import * as React from 'react'
import { useSize } from '@/registry/hooks/dom/use-size'
import { Card, CardPanel } from '@/registry/primitives/card'
import { Badge } from '@/registry/primitives/badge'
import { IconDimensions } from '@tabler/icons-react'

export default function Demo() {
  const ref = React.useRef<HTMLDivElement>(null)
  const size = useSize(ref)

  return (
    <Card className="w-full max-w-md bg-muted rounded-2xl overflow-hidden">
      <div className="flex items-center justify-between gap-3 px-3 pt-1 pb-1">
        <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
          <Badge variant="secondary" className="rounded-sm aspect-square h-full! bg-transparent">
            <IconDimensions className="size-4 text-muted-foreground" />
          </Badge>
          <span>Size</span>
        </div>
        <Badge variant="outline" size="sm" className="font-mono tabular-nums">
          {Math.round(size.width)} × {Math.round(size.height)}
        </Badge>
      </div>
      <CardPanel className="rounded-[0.875rem] bg-background p-3">
        <div
          ref={ref}
          className="flex h-24 items-center justify-center rounded-lg bg-muted font-mono text-sm font-semibold tabular-nums text-foreground"
        >
          {Math.round(size.width)} × {Math.round(size.height)}
        </div>
      </CardPanel>
    </Card>
  )
}
