'use client'

import * as React from 'react'
import { useLocalStorage } from '@/registry/hooks/browser/use-local-storage'
import { Card, CardPanel } from '@/registry/primitives/card'
import { Button } from '@/registry/primitives/button'
import { Badge } from '@/registry/primitives/badge'
import { IconPlus, IconMinus, IconRotateClockwise, IconDatabase } from '@tabler/icons-react'

export default function Demo() {
  const [count, setCount, removeCount] = useLocalStorage('space_demo_counter', 0)

  return (
    <Card className="w-full max-w-md bg-muted rounded-2xl overflow-hidden">
      <div className="flex items-center justify-between gap-3 px-3 pt-1 pb-1">
        <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
          <Badge variant="secondary" className="rounded-sm aspect-square h-full! bg-transparent">
            <IconDatabase className="size-4 text-muted-foreground" />
          </Badge>
          <span>Counter</span>
        </div>
        <Badge variant="outline" size="sm">
          Persisted
        </Badge>
      </div>
      <CardPanel className="flex flex-col gap-3 rounded-[0.875rem] bg-background p-3">
        <div className="rounded-lg bg-muted p-2.5">
          <span className="block text-[.6875rem] font-semibold text-muted-foreground">Count</span>
          <span className="mt-0.5 block font-mono text-sm font-semibold tabular-nums text-foreground">{count}</span>
        </div>
        <div className="flex items-center gap-2">
          <Button size="sm" variant="outline" onClick={() => setCount((c) => c - 1)} aria-label="Decrement">
            <IconMinus className="size-4" />
          </Button>
          <Button size="sm" variant="outline" onClick={() => setCount((c) => c + 1)} aria-label="Increment">
            <IconPlus className="size-4" />
          </Button>
          <Button
            size="sm"
            variant="ghost"
            onClick={removeCount}
            aria-label="Reset"
            className="ml-auto text-muted-foreground hover:text-foreground"
          >
            <IconRotateClockwise className="size-4" />
          </Button>
        </div>
      </CardPanel>
    </Card>
  )
}
