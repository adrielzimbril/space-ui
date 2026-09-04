'use client'

import * as React from 'react'
import { sleep } from '@/registry/utils/sleep'
import { useLoadMore } from '@/registry/hooks/form/use-load-more'
import { Card, CardPanel } from '@/registry/primitives/card'
import { Button } from '@/registry/primitives/button'
import { Badge } from '@/registry/primitives/badge'
import { IconLoader2, IconPlus, IconListDetails } from '@tabler/icons-react'

export default function Demo() {
  const [items, setItems] = React.useState<string[]>([
    'Article #1: Getting Started with Space UI',
    'Article #2: Animation Patterns with Framer Motion',
    'Article #3: Building Reusable React Hooks',
  ])

  const { loadMore, loading, page } = useLoadMore(async (nextPage) => {
    await sleep(600)
    setItems((prev) => [
      ...prev,
      `Article #${prev.length + 1}: Modern Frontend Architecture (Batch ${nextPage})`,
      `Article #${prev.length + 2}: TypeScript Best Practices (Batch ${nextPage})`,
    ])
  })

  return (
    <Card className="w-full max-w-md bg-muted rounded-2xl overflow-hidden">
      <div className="flex items-center justify-between gap-3 px-3 pt-1 pb-1">
        <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
          <Badge variant="secondary" className="rounded-sm aspect-square h-full! bg-transparent">
            <IconListDetails className="size-4 text-muted-foreground" />
          </Badge>
          <span>Feed</span>
        </div>
        <Badge variant="outline" size="sm" className="font-mono tabular-nums">
          {items.length} · {page}
        </Badge>
      </div>
      <CardPanel className="flex flex-col gap-3 rounded-[0.875rem] bg-background p-3">
        <div className="flex max-h-48 flex-col gap-2 overflow-y-auto">
          {items.map((it, i) => (
            <div key={i} className="flex items-center justify-between gap-2 rounded-lg bg-muted p-2.5">
              <span className="truncate text-xs font-medium text-foreground">{it}</span>
              <span className="shrink-0 font-mono text-[.6875rem] tabular-nums text-muted-foreground">#{i + 1}</span>
            </div>
          ))}
        </div>
        <Button size="sm" onClick={() => loadMore()} disabled={loading} variant="outline" className="w-full">
          {loading ? <IconLoader2 className="size-3.5 animate-spin" /> : <IconPlus className="size-3.5" />}
          {loading ? 'Fetching' : 'Load more'}
        </Button>
      </CardPanel>
    </Card>
  )
}
