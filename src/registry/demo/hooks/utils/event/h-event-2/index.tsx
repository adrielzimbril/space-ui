'use client'

import * as React from 'react'
import { dispatchWindowEvent, dispatchCustomEvent } from '@/registry/utils/event'
import { Button } from '@/registry/primitives/button'
import { Badge } from '@/registry/primitives/badge'
import { Card, CardPanel } from '@/registry/primitives/card'
import { IconBolt } from '@tabler/icons-react'

export default function Demo() {
  const [log, setLog] = React.useState<string[]>([])
  const boxRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    const onGlobal = () => setLog((l) => ['window event', ...l].slice(0, 4))
    const onLocal = () => setLog((l) => ['box event', ...l].slice(0, 4))
    window.addEventListener('demo:global', onGlobal)
    const box = boxRef.current
    box?.addEventListener('demo:local', onLocal)
    return () => {
      window.removeEventListener('demo:global', onGlobal)
      box?.removeEventListener('demo:local', onLocal)
    }
  }, [])

  return (
    <div ref={boxRef} className="w-full max-w-md">
      <Card className="w-full bg-muted rounded-2xl overflow-hidden">
        <div className="flex items-center justify-between gap-3 px-3 pt-1 pb-1">
          <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
            <Badge variant="secondary" className="rounded-sm aspect-square h-full! bg-transparent">
              <IconBolt className="size-4 text-muted-foreground" />
            </Badge>
            <span>Events</span>
          </div>
          <Badge variant="outline" size="sm" className="font-mono tabular-nums">
            {log.length}
          </Badge>
        </div>
        <CardPanel className="flex flex-col gap-3 rounded-[0.875rem] bg-background p-3">
          <div className="flex gap-2">
            <Button size="sm" onClick={() => dispatchWindowEvent('demo:global', { msg: 'Global ping!' })}>
              Window
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => boxRef.current && dispatchCustomEvent(boxRef.current, 'demo:local', { msg: 'Box ping!' })}
            >
              Box
            </Button>
          </div>
          <div className="flex min-h-8 flex-col gap-1">
            {log.length === 0 && <span className="text-xs text-muted-foreground">Events appear here</span>}
            {log.map((l, i) => (
              <div key={i} className="rounded-lg bg-muted px-2.5 py-1.5 font-mono text-xs text-foreground">
                {l}
              </div>
            ))}
          </div>
        </CardPanel>
      </Card>
    </div>
  )
}
