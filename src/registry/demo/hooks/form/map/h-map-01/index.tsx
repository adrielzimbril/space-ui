'use client'

import * as React from 'react'
import { useMap } from '@/registry/hooks/form/use-map'
import { Card, CardPanel } from '@/registry/primitives/card'
import { Button } from '@/registry/primitives/button'
import { Badge } from '@/registry/primitives/badge'
import { IconPlus, IconMinus, IconTable } from '@tabler/icons-react'

export default function Demo() {
  const [map, actions] = useMap<string, number>([
    ['Apples', 5],
    ['Oranges', 10],
  ])

  return (
    <Card className="w-full max-w-md bg-muted rounded-2xl overflow-hidden">
      <div className="flex items-center justify-between gap-3 px-3 pt-1 pb-1">
        <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
          <Badge variant="secondary" className="rounded-sm aspect-square h-full! bg-transparent">
            <IconTable className="size-4 text-muted-foreground" />
          </Badge>
          <span>Map</span>
        </div>
        <Badge variant="outline" size="sm" className="font-mono tabular-nums">
          {map.size}
        </Badge>
      </div>
      <CardPanel className="flex flex-col gap-2 rounded-[0.875rem] bg-background p-3">
        {Array.from(map.entries()).map(([key, count]) => (
          <div key={key} className="flex items-center justify-between gap-3 rounded-lg bg-muted p-2.5">
            <div className="min-w-0">
              <span className="block text-[.6875rem] font-semibold text-muted-foreground">{key}</span>
              <span className="mt-0.5 block font-mono text-sm font-semibold tabular-nums text-foreground">{count}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Button
                size="icon-xs"
                variant="outline"
                onClick={() => actions.set(key, Math.max(0, count - 1))}
                aria-label={`Decrease ${key}`}
              >
                <IconMinus className="size-3" />
              </Button>
              <Button
                size="icon-xs"
                variant="outline"
                onClick={() => actions.set(key, count + 1)}
                aria-label={`Increase ${key}`}
              >
                <IconPlus className="size-3" />
              </Button>
            </div>
          </div>
        ))}
      </CardPanel>
    </Card>
  )
}
