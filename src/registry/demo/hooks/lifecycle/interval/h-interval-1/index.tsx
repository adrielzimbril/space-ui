'use client'

import * as React from 'react'
import { useInterval } from '@/registry/hooks/lifecycle/use-interval'
import { Card, CardPanel } from '@/registry/primitives/card'
import { Button } from '@/registry/primitives/button'
import { Badge } from '@/registry/primitives/badge'
import { IconPlayerPlay, IconPlayerPause, IconRotateClockwise, IconClock } from '@tabler/icons-react'

export default function Demo() {
  const [count, setCount] = React.useState(0)
  const [running, setRunning] = React.useState(true)
  const { start, stop } = useInterval(() => setCount((c) => c + 1), 1000)

  const toggle = () => {
    if (running) {
      stop()
      setRunning(false)
    } else {
      start(1000)
      setRunning(true)
    }
  }

  return (
    <Card className="w-full max-w-md bg-muted rounded-2xl overflow-hidden">
      <div className="flex items-center justify-between gap-3 px-3 pt-1 pb-1">
        <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
          <Badge variant="secondary" className="rounded-sm aspect-square h-full! bg-transparent">
            <IconClock className="size-4 text-muted-foreground" />
          </Badge>
          <span>Interval</span>
        </div>
        <Badge variant={running ? 'success' : 'outline'} size="sm">
          {running ? 'Running' : 'Paused'}
        </Badge>
      </div>
      <CardPanel className="flex flex-col gap-3 rounded-[0.875rem] bg-background p-3">
        <div className="flex items-center justify-between rounded-lg bg-muted p-2.5">
          <div>
            <span className="block text-[.6875rem] font-semibold text-muted-foreground">Elapsed</span>
            <span className="mt-0.5 block font-mono text-xl font-semibold tabular-nums text-foreground">{count}s</span>
          </div>
          <div className="flex items-center gap-2">
            <Button size="sm" onClick={toggle} variant={running ? 'secondary' : 'default'}>
              {running ? <IconPlayerPause className="size-3.5" /> : <IconPlayerPlay className="size-3.5" />}
              {running ? 'Pause' : 'Start'}
            </Button>
            <Button size="icon-sm" variant="outline" onClick={() => setCount(0)} aria-label="Reset">
              <IconRotateClockwise className="size-4" />
            </Button>
          </div>
        </div>
      </CardPanel>
    </Card>
  )
}
