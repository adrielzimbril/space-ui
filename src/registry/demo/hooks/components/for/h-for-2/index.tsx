'use client'

import * as React from 'react'
import { For } from '@/registry/hooks/components/for'
import { Card, CardPanel } from '@/registry/primitives/card'
import { Input } from '@/registry/primitives/input'
import { Badge } from '@/registry/primitives/badge'
import { IconShoppingBag, IconSearch } from '@tabler/icons-react'

const PRODUCTS = [
  { id: 1, name: 'Aurora UI Kit', price: '$49', badge: 'Pro' },
  { id: 2, name: 'Space Icons Pack', price: '$29', badge: 'New' },
  { id: 3, name: 'Motion Components', price: '$39', badge: 'Popular' },
]

export default function Demo() {
  const [filter, setFilter] = React.useState('')
  const filtered = PRODUCTS.filter((p) => p.name.toLowerCase().includes(filter.toLowerCase()))

  return (
    <Card className="w-full max-w-md bg-muted rounded-2xl overflow-hidden">
      <div className="flex items-center justify-between gap-3 px-3 pt-1 pb-1">
        <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
          <Badge variant="secondary" className="rounded-sm aspect-square h-full! bg-transparent">
            <IconShoppingBag className="size-4 text-muted-foreground" />
          </Badge>
          <span>For</span>
        </div>
        <Badge variant="outline" size="sm" className="font-mono tabular-nums">
          {filtered.length}
        </Badge>
      </div>
      <CardPanel className="flex flex-col gap-3 rounded-[0.875rem] bg-background p-3">
        <div className="relative">
          <Input
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            placeholder="Search catalog..."
            className="pl-8 text-base sm:text-sm"
            aria-label="Filter products"
          />
          <IconSearch className="pointer-events-none absolute left-2.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
        </div>
        <div className="flex flex-col gap-2">
          <For
            each={filtered}
            fallback={
              <div className="rounded-lg bg-muted p-6 text-center">
                <p className="text-xs font-semibold text-muted-foreground">No match for &quot;{filter}&quot;</p>
              </div>
            }
          >
            {(p) => (
              <div key={p.id} className="flex items-center justify-between gap-3 rounded-lg bg-muted p-2.5">
                <div className="min-w-0">
                  <span className="block text-xs font-semibold text-foreground">{p.name}</span>
                  <span className="mt-0.5 block font-mono text-[.6875rem] tabular-nums text-muted-foreground">
                    {p.price}
                  </span>
                </div>
                <Badge variant="secondary" size="sm">
                  {p.badge}
                </Badge>
              </div>
            )}
          </For>
        </div>
      </CardPanel>
    </Card>
  )
}
