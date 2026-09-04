'use client'

import * as React from 'react'
import { useDebounce } from '@/registry/hooks/lifecycle/use-debounce'
import { Card, CardPanel } from '@/registry/primitives/card'
import { Badge } from '@/registry/primitives/badge'
import { Input } from '@/registry/primitives/input'
import { IconHourglass } from '@tabler/icons-react'

interface DemoProps {
  delay?: number
}

export default function Demo({ delay = 400 }: DemoProps) {
  const [value, setValue] = React.useState('')
  const debounced = useDebounce(value, delay)

  return (
    <Card className="w-full max-w-md bg-muted rounded-2xl overflow-hidden">
      <div className="flex items-center justify-between gap-3 px-3 pt-1 pb-1">
        <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
          <Badge variant="secondary" className="rounded-sm aspect-square h-full! bg-transparent">
            <IconHourglass className="size-4 text-muted-foreground" />
          </Badge>
          <span>Debounce</span>
        </div>
        <Badge variant="outline" size="sm" className="font-mono tabular-nums">
          {delay}ms
        </Badge>
      </div>
      <CardPanel className="flex flex-col gap-3 rounded-[0.875rem] bg-background p-3">
        <Input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Type to debounce"
          aria-label="Value to debounce"
          className="text-base sm:text-sm"
        />
        <div className="grid grid-cols-2 gap-2">
          <div className="rounded-lg bg-muted p-2.5">
            <span className="block text-[.6875rem] font-semibold text-muted-foreground">Immediate</span>
            <span className="mt-0.5 block truncate font-mono text-sm font-semibold text-foreground">
              {value || '—'}
            </span>
          </div>
          <div className="rounded-lg bg-muted p-2.5">
            <span className="block text-[.6875rem] font-semibold text-muted-foreground">Debounced</span>
            <span className="mt-0.5 block truncate font-mono text-sm font-semibold text-foreground">
              {debounced || '—'}
            </span>
          </div>
        </div>
      </CardPanel>
    </Card>
  )
}
