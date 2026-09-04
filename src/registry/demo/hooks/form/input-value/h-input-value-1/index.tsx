'use client'

import * as React from 'react'
import { useInputValue } from '@/registry/hooks/form/use-input-value'
import { Card, CardPanel } from '@/registry/primitives/card'
import { Input } from '@/registry/primitives/input'
import { Button } from '@/registry/primitives/button'
import { Badge } from '@/registry/primitives/badge'
import { IconRefresh, IconX, IconForms } from '@tabler/icons-react'

export default function Demo() {
  const [val, bind, { reset, clear }] = useInputValue('Space UI')

  return (
    <Card className="w-full max-w-md bg-muted rounded-2xl overflow-hidden">
      <div className="flex items-center justify-between gap-3 px-3 pt-1 pb-1">
        <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
          <Badge variant="secondary" className="rounded-sm aspect-square h-full! bg-transparent">
            <IconForms className="size-4 text-muted-foreground" />
          </Badge>
          <span>Input</span>
        </div>
        <Badge variant="outline" size="sm" className="font-mono tabular-nums">
          {val.length}
        </Badge>
      </div>
      <CardPanel className="flex flex-col gap-3 rounded-[0.875rem] bg-background p-3">
        <div className="flex items-center gap-2">
          <Input {...bind} placeholder="Type something..." className="text-base sm:text-sm" />
          <Button size="icon-sm" variant="ghost" onClick={clear} aria-label="Clear">
            <IconX className="size-4" />
          </Button>
          <Button size="icon-sm" variant="outline" onClick={reset} aria-label="Reset">
            <IconRefresh className="size-4" />
          </Button>
        </div>
        <div className="rounded-lg bg-muted p-2.5">
          <span className="block text-[.6875rem] font-semibold text-muted-foreground">Value</span>
          <span className="mt-0.5 block truncate font-mono text-sm font-semibold text-foreground">{val || '—'}</span>
        </div>
      </CardPanel>
    </Card>
  )
}
