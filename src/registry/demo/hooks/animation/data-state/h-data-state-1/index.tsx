'use client'

import * as React from 'react'
import { useDataState } from '@/registry/hooks/animation/use-data-state'
import { Card, CardPanel } from '@/registry/primitives/card'
import { Badge } from '@/registry/primitives/badge'
import { Button } from '@/registry/primitives/button'
import { IconCode } from '@tabler/icons-react'

export default function Demo() {
  const [open, setOpen] = React.useState(false)
  const dataState = useDataState(open)

  return (
    <Card className="w-full max-w-md bg-muted rounded-2xl overflow-hidden">
      <div className="flex items-center justify-between gap-3 px-3 pt-1 pb-1">
        <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
          <Badge variant="secondary" className="rounded-sm aspect-square h-full! bg-transparent">
            <IconCode className="size-4 text-muted-foreground" />
          </Badge>
          <span>Data State</span>
        </div>
        <Badge variant={open ? 'default' : 'outline'} size="sm">
          {dataState}
        </Badge>
      </div>
      <CardPanel className="flex items-center justify-between rounded-[0.875rem] bg-background p-3">
        <span className="font-mono text-sm font-semibold tabular-nums text-foreground">{dataState}</span>
        <Button size="sm" variant="outline" onClick={() => setOpen((o) => !o)}>
          Toggle
        </Button>
      </CardPanel>
    </Card>
  )
}
