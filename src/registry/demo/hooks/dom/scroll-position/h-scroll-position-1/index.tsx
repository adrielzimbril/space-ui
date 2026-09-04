'use client'

import * as React from 'react'
import { useScrollPosition } from '@/registry/hooks/dom/use-scroll-position'
import { Card, CardPanel } from '@/registry/primitives/card'
import { Badge } from '@/registry/primitives/badge'
import { IconArrowsVertical } from '@tabler/icons-react'

export default function Demo() {
  const { scrollX, scrollY } = useScrollPosition()

  return (
    <Card className="w-full max-w-md bg-muted rounded-2xl overflow-hidden">
      <div className="flex items-center justify-between gap-3 px-3 pt-1 pb-1">
        <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
          <Badge variant="secondary" className="rounded-sm aspect-square h-full! bg-transparent">
            <IconArrowsVertical className="size-4 text-muted-foreground" />
          </Badge>
          <span>Scroll</span>
        </div>
        <Badge variant={scrollY > 0 ? 'default' : 'outline'} size="sm" className="font-mono tabular-nums">
          {scrollY > 0 ? `Y ${Math.round(scrollY)}` : 'Top'}
        </Badge>
      </div>
      <CardPanel className="grid grid-cols-2 gap-2 rounded-[0.875rem] bg-background p-3">
        <div className="rounded-lg bg-muted p-2.5">
          <span className="block text-[.6875rem] font-semibold text-muted-foreground">X</span>
          <span className="mt-0.5 block font-mono text-xl font-semibold tabular-nums text-foreground">
            {Math.round(scrollX)}
          </span>
        </div>
        <div className="rounded-lg bg-muted p-2.5">
          <span className="block text-[.6875rem] font-semibold text-muted-foreground">Y</span>
          <span className="mt-0.5 block font-mono text-xl font-semibold tabular-nums text-foreground">
            {Math.round(scrollY)}
          </span>
        </div>
      </CardPanel>
    </Card>
  )
}
