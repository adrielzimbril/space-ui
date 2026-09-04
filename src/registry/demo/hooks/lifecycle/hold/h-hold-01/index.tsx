'use client'

import * as React from 'react'
import { useHold } from '@/registry/hooks/lifecycle/use-hold'
import { Card, CardPanel } from '@/registry/primitives/card'
import { Button } from '@/registry/primitives/button'
import { Badge } from '@/registry/primitives/badge'
import { IconHandClick } from '@tabler/icons-react'

export default function Demo() {
  const delay = 600
  const [held, setHeld] = React.useState(false)
  const bind = useHold(() => setHeld(true), { delay })

  return (
    <Card className="w-full max-w-md bg-muted rounded-2xl overflow-hidden">
      <div className="flex items-center justify-between gap-3 px-3 pt-1 pb-1">
        <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
          <Badge variant="secondary" className="rounded-sm aspect-square h-full! bg-transparent">
            <IconHandClick className="size-4 text-muted-foreground" />
          </Badge>
          <span>Hold</span>
        </div>
        <Badge variant={held ? 'success' : 'outline'} size="sm">
          {held ? 'Triggered' : 'Waiting'}
        </Badge>
      </div>
      <CardPanel className="flex flex-col gap-3 rounded-[0.875rem] bg-background p-3">
        <div className="rounded-lg bg-muted p-2.5">
          <span className="block text-[.6875rem] font-semibold text-muted-foreground">Delay</span>
          <span className="mt-0.5 block font-mono text-sm font-semibold tabular-nums text-foreground">{delay}ms</span>
        </div>
        <Button {...bind} variant={held ? 'secondary' : 'default'} className="w-full select-none">
          {held ? 'Held' : 'Hold'}
        </Button>
        {held ? (
          <Button variant="outline" size="sm" onClick={() => setHeld(false)}>
            Reset
          </Button>
        ) : null}
      </CardPanel>
    </Card>
  )
}
