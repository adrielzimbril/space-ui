'use client'

import * as React from 'react'
import { rangeMap } from '@/registry/utils/range-map'
import { Card, CardPanel } from '@/registry/primitives/card'
import { Badge } from '@/registry/primitives/badge'
import { IconGridDots } from '@tabler/icons-react'

export default function Demo() {
  const items = rangeMap(6, (i) => `Slot #${i + 1}`)

  return (
    <Card className="w-full max-w-md bg-muted rounded-2xl overflow-hidden">
      <div className="flex items-center justify-between gap-3 px-3 pt-1 pb-1">
        <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
          <Badge variant="secondary" className="rounded-sm aspect-square h-full! bg-transparent">
            <IconGridDots className="size-4 text-muted-foreground" />
          </Badge>
          <span>Range</span>
        </div>
        <Badge variant="outline" size="sm" className="font-mono tabular-nums">
          6
        </Badge>
      </div>
      <CardPanel className="grid grid-cols-3 gap-2 rounded-[0.875rem] bg-background p-3">
        {items.map((it, i) => (
          <div key={i} className="rounded-lg bg-muted p-2.5 text-center">
            <span className="block text-xs font-semibold text-foreground">{it}</span>
          </div>
        ))}
      </CardPanel>
    </Card>
  )
}
