'use client'

import * as React from 'react'
import { For } from '@/registry/hooks/components/for'
import { Card, CardPanel } from '@/registry/primitives/card'
import { Button } from '@/registry/primitives/button'
import { Badge } from '@/registry/primitives/badge'
import { IconListNumbers, IconPlus, IconTrash } from '@tabler/icons-react'

export default function Demo() {
  const [items, setItems] = React.useState(['Next.js 15', 'React 19', 'Space UI', 'TypeScript 5'])

  return (
    <Card className="w-full max-w-md bg-muted rounded-2xl overflow-hidden">
      <div className="flex items-center justify-between gap-3 px-3 pt-1 pb-1">
        <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
          <Badge variant="secondary" className="rounded-sm aspect-square h-full! bg-transparent">
            <IconListNumbers className="size-4 text-muted-foreground" />
          </Badge>
          <span>For</span>
        </div>
        <Button
          size="sm"
          variant="outline"
          onClick={() => setItems(items.length > 0 ? [] : ['Next.js 15', 'React 19', 'Space UI', 'TypeScript 5'])}
        >
          {items.length > 0 ? <IconTrash className="size-3.5" /> : <IconPlus className="size-3.5" />}
          {items.length > 0 ? 'Clear' : 'Populate'}
        </Button>
      </div>
      <CardPanel className="flex max-h-48 flex-col gap-2 overflow-y-auto rounded-[0.875rem] bg-background p-3">
        <For
          each={items}
          fallback={<div className="rounded-lg bg-muted p-2.5 text-center text-xs text-muted-foreground">No items</div>}
        >
          {(item, i) => (
            <div key={i} className="flex items-center justify-between gap-2 rounded-lg bg-muted p-2.5">
              <span className="text-xs font-medium text-foreground">{item}</span>
              <span className="font-mono text-[.6875rem] tabular-nums text-muted-foreground">#{i + 1}</span>
            </div>
          )}
        </For>
      </CardPanel>
    </Card>
  )
}
