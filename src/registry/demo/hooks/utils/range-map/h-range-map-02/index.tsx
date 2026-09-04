'use client'

import * as React from 'react'
import { mapRange } from '@/registry/utils/range-map'
import { Card, CardPanel } from '@/registry/primitives/card'
import { Badge } from '@/registry/primitives/badge'
import { IconAdjustmentsHorizontal } from '@tabler/icons-react'

export default function Demo() {
  const [val, setVal] = React.useState(50)
  const mapped = mapRange(val, 0, 100, 0, 1)

  return (
    <Card className="w-full max-w-md bg-muted rounded-2xl overflow-hidden">
      <div className="flex items-center justify-between gap-3 px-3 pt-1 pb-1">
        <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
          <Badge variant="secondary" className="rounded-sm aspect-square h-full! bg-transparent">
            <IconAdjustmentsHorizontal className="size-4 text-muted-foreground" />
          </Badge>
          <span>Map</span>
        </div>
        <Badge variant="outline" size="sm" className="font-mono tabular-nums">
          {mapped.toFixed(2)}
        </Badge>
      </div>
      <CardPanel className="flex flex-col gap-3 rounded-[0.875rem] bg-background p-3">
        <input
          type="range"
          min="0"
          max="100"
          value={val}
          onChange={(e) => setVal(Number(e.target.value))}
          className="w-full"
          aria-label="Map range"
        />
        <div className="grid grid-cols-2 gap-2">
          <div className="rounded-lg bg-muted p-2.5">
            <span className="block text-[.6875rem] font-semibold text-muted-foreground">Input</span>
            <span className="mt-0.5 block font-mono text-sm font-semibold tabular-nums text-foreground">{val}%</span>
          </div>
          <div className="rounded-lg bg-muted p-2.5">
            <span className="block text-[.6875rem] font-semibold text-muted-foreground">0–1</span>
            <span className="mt-0.5 block font-mono text-sm font-semibold tabular-nums text-foreground">
              {mapped.toFixed(2)}
            </span>
          </div>
        </div>
      </CardPanel>
    </Card>
  )
}
