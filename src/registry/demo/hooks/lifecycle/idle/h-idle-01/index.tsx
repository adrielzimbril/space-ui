'use client'

import * as React from 'react'
import { useIdle } from '@/registry/hooks/lifecycle/use-idle'
import { Card, CardPanel } from '@/registry/primitives/card'
import { Badge } from '@/registry/primitives/badge'
import { IconMoon, IconActivity } from '@tabler/icons-react'

export default function Demo() {
  const timeout = 3000
  const isIdle = useIdle(timeout)
  const [remaining, setRemaining] = React.useState(timeout)

  React.useEffect(() => {
    if (isIdle) {
      setRemaining(0)
      return
    }

    let started = Date.now()
    const reset = () => {
      started = Date.now()
      setRemaining(timeout)
    }
    const events = ['mousemove', 'mousedown', 'keydown', 'touchstart', 'scroll']
    events.forEach((name) => window.addEventListener(name, reset, { passive: true }))

    const id = window.setInterval(() => {
      setRemaining(Math.max(0, timeout - (Date.now() - started)))
    }, 50)

    return () => {
      window.clearInterval(id)
      events.forEach((name) => window.removeEventListener(name, reset))
    }
  }, [isIdle, timeout])

  return (
    <Card className="w-full max-w-md bg-muted rounded-2xl overflow-hidden">
      <div className="flex items-center justify-between gap-3 px-3 pt-1 pb-1">
        <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
          <Badge variant="secondary" className="rounded-sm aspect-square h-full! bg-transparent">
            {isIdle ? (
              <IconMoon className="size-4 text-muted-foreground" />
            ) : (
              <IconActivity className="size-4 text-muted-foreground" />
            )}
          </Badge>
          <span>Idle</span>
        </div>
        <Badge variant={isIdle ? 'warning' : 'success'} size="sm">
          {isIdle ? 'Idle' : 'Active'}
        </Badge>
      </div>
      <CardPanel className="grid grid-cols-2 gap-2 rounded-[0.875rem] bg-background p-3">
        <div className="rounded-lg bg-muted p-2.5">
          <span className="block text-[.6875rem] font-semibold text-muted-foreground">Threshold</span>
          <span className="mt-0.5 block font-mono text-sm font-semibold tabular-nums text-foreground">{timeout}ms</span>
        </div>
        <div className="rounded-lg bg-muted p-2.5">
          <span className="block text-[.6875rem] font-semibold text-muted-foreground">Remaining</span>
          <span className="mt-0.5 block font-mono text-sm font-semibold tabular-nums text-foreground">
            {remaining}ms
          </span>
        </div>
      </CardPanel>
    </Card>
  )
}
