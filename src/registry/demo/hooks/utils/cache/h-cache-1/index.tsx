'use client'

import * as React from 'react'
import { MemoryCache } from '@/registry/utils/cache'
import { Card, CardPanel } from '@/registry/primitives/card'
import { Button } from '@/registry/primitives/button'
import { Badge } from '@/registry/primitives/badge'
import { IconDatabase } from '@tabler/icons-react'

const memo = new MemoryCache<number>()

export default function Demo() {
  const [hits, setHits] = React.useState(0)
  const [result, setResult] = React.useState<number | null>(null)

  const compute = (x: number) => {
    const cached = memo.get(String(x))
    if (cached !== undefined) {
      setResult(cached)
      return
    }
    setHits((h) => h + 1)
    const res = x * 42
    memo.set(String(x), res)
    setResult(res)
  }

  return (
    <Card className="w-full max-w-md bg-muted rounded-2xl overflow-hidden">
      <div className="flex items-center justify-between gap-3 px-3 pt-1 pb-1">
        <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
          <Badge variant="secondary" className="rounded-sm aspect-square h-full! bg-transparent">
            <IconDatabase className="size-4 text-muted-foreground" />
          </Badge>
          <span>Cache</span>
        </div>
        <Badge variant="outline" size="sm" className="font-mono tabular-nums">
          {hits}
        </Badge>
      </div>
      <CardPanel className="flex flex-col gap-3 rounded-[0.875rem] bg-background p-3">
        <div className="rounded-lg bg-muted p-2.5">
          <span className="block text-[.6875rem] font-semibold text-muted-foreground">fn(5)</span>
          <span className="mt-0.5 block font-mono text-sm font-semibold tabular-nums text-foreground">
            {result !== null ? result : '—'}
          </span>
        </div>
        <Button size="sm" onClick={() => compute(5)} className="w-full">
          Compute
        </Button>
      </CardPanel>
    </Card>
  )
}
