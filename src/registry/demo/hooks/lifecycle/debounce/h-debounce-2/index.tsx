'use client'

import * as React from 'react'
import { useDebounce } from '@/registry/hooks/lifecycle/use-debounce'
import { Card, CardPanel } from '@/registry/primitives/card'
import { Badge } from '@/registry/primitives/badge'
import { Input } from '@/registry/primitives/input'
import { IconSearch } from '@tabler/icons-react'

const USERS = ['Alex Rivera', 'Sarah Connor', 'Adriel Zimbril', 'Marcus Vance', 'Elena Rostova', 'David Chen']

export default function Demo() {
  const [query, setQuery] = React.useState('')
  const debouncedQuery = useDebounce(query, 300)

  const filtered = React.useMemo(() => {
    if (!debouncedQuery) return USERS
    return USERS.filter((u) => u.toLowerCase().includes(debouncedQuery.toLowerCase()))
  }, [debouncedQuery])

  return (
    <Card className="w-full max-w-md bg-muted rounded-2xl overflow-hidden">
      <div className="flex items-center justify-between gap-3 px-3 pt-1 pb-1">
        <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
          <Badge variant="secondary" className="rounded-sm aspect-square h-full! bg-transparent">
            <IconSearch className="size-4 text-muted-foreground" />
          </Badge>
          <span>Search</span>
        </div>
        <Badge variant="outline" size="sm" className="font-mono tabular-nums">
          {filtered.length}
        </Badge>
      </div>
      <CardPanel className="flex flex-col gap-3 rounded-[0.875rem] bg-background p-3">
        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Filter names"
          aria-label="Search names"
          className="text-base sm:text-sm"
        />
        <div className="flex max-h-40 flex-col gap-2 overflow-y-auto">
          {filtered.map((u) => (
            <div key={u} className="rounded-lg bg-muted p-2.5">
              <span className="block truncate text-sm font-semibold text-foreground">{u}</span>
            </div>
          ))}
          {filtered.length === 0 ? (
            <span className="py-2 text-center text-sm text-muted-foreground">No matches</span>
          ) : null}
        </div>
      </CardPanel>
    </Card>
  )
}
