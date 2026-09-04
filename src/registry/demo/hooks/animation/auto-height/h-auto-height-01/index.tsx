'use client'

import * as React from 'react'
import { useAutoHeight } from '@/registry/hooks/animation/use-auto-height'
import { Card, CardPanel } from '@/registry/primitives/card'
import { Button } from '@/registry/primitives/button'
import { Badge } from '@/registry/primitives/badge'
import { IconArrowsVertical, IconPlus, IconMinus } from '@tabler/icons-react'

export default function Demo() {
  const [items, setItems] = React.useState([
    'Item 1: Smooth CSS height interpolation',
    'Item 2: Driven by ResizeObserver & RAF',
  ])
  const { ref, height } = useAutoHeight([items])

  return (
    <Card className="w-full max-w-md bg-muted rounded-2xl overflow-hidden">
      <div className="flex items-center justify-between gap-3 px-3 pt-1 pb-1">
        <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
          <Badge variant="secondary" className="rounded-sm aspect-square h-full! bg-transparent">
            <IconArrowsVertical className="size-4 text-muted-foreground" />
          </Badge>
          <span>Height</span>
        </div>
        <Badge variant="outline" size="sm" className="font-mono tabular-nums">
          {Math.round(height)}px
        </Badge>
      </div>
      <CardPanel className="flex flex-col gap-3 rounded-[0.875rem] bg-background p-3">
        <div className="flex items-center gap-2">
          <Button
            size="sm"
            variant="outline"
            onClick={() => setItems((p) => [...p, `Item ${p.length + 1}: Dynamic list item`])}
          >
            <IconPlus className="size-3.5" />
            Add
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={() => setItems((p) => p.slice(0, -1))}
            disabled={items.length <= 1}
          >
            <IconMinus className="size-3.5" />
            Remove
          </Button>
        </div>
        <div
          style={{ height }}
          className="overflow-hidden rounded-lg bg-muted transition-[height] duration-300 ease-out"
        >
          <div ref={ref} className="flex flex-col gap-2 p-2">
            {items.map((it, i) => (
              <div key={i} className="rounded-lg bg-background p-2.5 text-sm font-medium text-foreground">
                {it}
              </div>
            ))}
          </div>
        </div>
      </CardPanel>
    </Card>
  )
}
