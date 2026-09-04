'use client'

import * as React from 'react'
import { Card, CardPanel } from '@/registry/primitives/card'
import { Badge } from '@/registry/primitives/badge'
import { Button } from '@/registry/primitives/button'
import { IconWaveSine, IconPlus, IconMinus } from '@tabler/icons-react'

export default function Demo() {
  const [val, setVal] = React.useState(100)

  return (
    <Card className="w-full max-w-md bg-muted rounded-2xl overflow-hidden">
      <div className="flex items-center justify-between gap-3 px-3 pt-1 pb-1">
        <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
          <Badge variant="secondary" className="rounded-sm aspect-square h-full! bg-transparent">
            <IconWaveSine className="size-4 text-muted-foreground" />
          </Badge>
          <span>Motion</span>
        </div>
        <Badge variant="outline" size="sm" className="font-mono tabular-nums">
          {val}
        </Badge>
      </div>
      <CardPanel className="flex items-center justify-between rounded-[0.875rem] bg-background p-3">
        <div className="rounded-lg bg-muted p-2.5">
          <span className="block text-[.6875rem] font-semibold text-muted-foreground">Value</span>
          <span className="mt-0.5 block font-mono text-xl font-semibold tabular-nums text-foreground">{val}</span>
        </div>
        <div className="flex items-center gap-2">
          <Button size="icon-sm" variant="outline" onClick={() => setVal((v) => v - 10)} aria-label="Decrease">
            <IconMinus className="size-3.5" />
          </Button>
          <Button size="icon-sm" variant="outline" onClick={() => setVal((v) => v + 10)} aria-label="Increase">
            <IconPlus className="size-3.5" />
          </Button>
        </div>
      </CardPanel>
    </Card>
  )
}
