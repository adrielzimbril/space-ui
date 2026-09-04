'use client'

import * as React from 'react'
import { useEventListener } from '@/registry/hooks/dom/use-event-listener'
import { Card, CardPanel } from '@/registry/primitives/card'
import { Badge } from '@/registry/primitives/badge'
import { IconKeyboard } from '@tabler/icons-react'

export default function Demo() {
  const [lastKey, setLastKey] = React.useState('None')
  useEventListener('keydown', (e: KeyboardEvent) => setLastKey(e.key))

  return (
    <Card className="w-full max-w-md bg-muted rounded-2xl overflow-hidden">
      <div className="flex items-center justify-between gap-3 px-3 pt-1 pb-1">
        <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
          <Badge variant="secondary" className="rounded-sm aspect-square h-full! bg-transparent">
            <IconKeyboard className="size-4 text-muted-foreground" />
          </Badge>
          <span>Listener</span>
        </div>
        <Badge variant="outline" size="sm">
          Live
        </Badge>
      </div>
      <CardPanel className="rounded-[0.875rem] bg-background p-3">
        <div className="rounded-lg bg-muted p-2.5">
          <span className="block text-[.6875rem] font-semibold text-muted-foreground">Last key</span>
          <span className="mt-0.5 block font-mono text-xl font-semibold tabular-nums text-foreground">{lastKey}</span>
        </div>
      </CardPanel>
    </Card>
  )
}
