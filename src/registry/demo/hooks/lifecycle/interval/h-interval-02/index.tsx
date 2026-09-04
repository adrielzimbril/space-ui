'use client'

import * as React from 'react'
import { useInterval } from '@/registry/hooks/lifecycle/use-interval'
import { Card, CardPanel } from '@/registry/primitives/card'
import { Badge } from '@/registry/primitives/badge'
import { Button } from '@/registry/primitives/button'
import { IconServer } from '@tabler/icons-react'

export default function Demo() {
  const [requests, setRequests] = React.useState(0)
  const [delay, setDelay] = React.useState<number | null>(1500)
  const [lastSync, setLastSync] = React.useState<string>('Never')

  const { start, stop } = useInterval(() => {
    setRequests((r) => r + 1)
    setLastSync(new Date().toLocaleTimeString())
  }, delay ?? 1500)

  return (
    <Card className="w-full max-w-md bg-muted rounded-2xl overflow-hidden">
      <div className="flex items-center justify-between gap-3 px-3 pt-1 pb-1">
        <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
          <Badge variant="secondary" className="rounded-sm aspect-square h-full! bg-transparent">
            <IconServer className="size-4 text-muted-foreground" />
          </Badge>
          <span>Polling</span>
        </div>
        <Badge variant={delay ? 'default' : 'outline'} size="sm" className="font-mono tabular-nums">
          {delay ? `${delay}ms` : 'Paused'}
        </Badge>
      </div>
      <CardPanel className="flex flex-col gap-3 rounded-[0.875rem] bg-background p-3">
        <div className="grid grid-cols-2 gap-2">
          <div className="rounded-lg bg-muted p-2.5">
            <span className="block text-[.6875rem] font-semibold text-muted-foreground">Requests</span>
            <span className="mt-0.5 block font-mono text-sm font-semibold tabular-nums text-foreground">
              {requests}
            </span>
          </div>
          <div className="rounded-lg bg-muted p-2.5">
            <span className="block text-[.6875rem] font-semibold text-muted-foreground">Last sync</span>
            <span className="mt-0.5 block font-mono text-sm font-semibold tabular-nums text-foreground">
              {lastSync}
            </span>
          </div>
        </div>
        <div className="flex gap-2">
          <Button
            size="sm"
            variant={delay === 1000 ? 'default' : 'outline'}
            onClick={() => {
              setDelay(1000)
              start(1000)
            }}
            className="flex-1"
          >
            Poll 1s
          </Button>
          <Button
            size="sm"
            variant={delay === 3000 ? 'default' : 'outline'}
            onClick={() => {
              setDelay(3000)
              start(3000)
            }}
            className="flex-1"
          >
            Poll 3s
          </Button>
          <Button
            size="sm"
            variant="destructive"
            onClick={() => {
              setDelay(null)
              stop()
            }}
            className="flex-1"
          >
            Pause
          </Button>
        </div>
      </CardPanel>
    </Card>
  )
}
