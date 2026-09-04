'use client'

import * as React from 'react'
import { sleep } from '@/registry/utils/sleep'
import { Card, CardPanel } from '@/registry/primitives/card'
import { Button } from '@/registry/primitives/button'
import { Badge } from '@/registry/primitives/badge'
import { IconHourglass, IconLoader2 } from '@tabler/icons-react'

export default function Demo() {
  const [sleeping, setSleeping] = React.useState(false)

  const run = async () => {
    setSleeping(true)
    await sleep(1500)
    setSleeping(false)
  }

  return (
    <Card className="w-full max-w-md bg-muted rounded-2xl overflow-hidden">
      <div className="flex items-center justify-between gap-3 px-3 pt-1 pb-1">
        <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
          <Badge variant="secondary" className="rounded-sm aspect-square h-full! bg-transparent">
            <IconHourglass className="size-4 text-muted-foreground" />
          </Badge>
          <span>Sleep</span>
        </div>
        <Badge variant={sleeping ? 'default' : 'outline'} size="sm">
          {sleeping ? 'Waiting' : 'Idle'}
        </Badge>
      </div>
      <CardPanel className="flex items-center justify-between rounded-[0.875rem] bg-background p-3">
        <span className="font-mono text-xs tabular-nums text-muted-foreground">1500ms</span>
        <Button size="sm" onClick={run} disabled={sleeping}>
          {sleeping ? <IconLoader2 className="size-3.5 animate-spin" /> : null}
          {sleeping ? 'Waiting' : 'Delay'}
        </Button>
      </CardPanel>
    </Card>
  )
}
