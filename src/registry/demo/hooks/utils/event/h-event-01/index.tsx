'use client'

import * as React from 'react'
import { bindEvent, unbindEvent } from '@/registry/utils/event'
import { Card, CardPanel } from '@/registry/primitives/card'
import { Badge } from '@/registry/primitives/badge'
import { IconPointer } from '@tabler/icons-react'

export default function Demo() {
  const [clicks, setClicks] = React.useState(0)

  React.useEffect(() => {
    const handler = () => setClicks((c) => c + 1)
    bindEvent(window, 'click', handler)
    return () => unbindEvent(window, 'click', handler)
  }, [])

  return (
    <Card className="w-full max-w-md bg-muted rounded-2xl overflow-hidden">
      <div className="flex items-center justify-between gap-3 px-3 pt-1 pb-1">
        <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
          <Badge variant="secondary" className="rounded-sm aspect-square h-full! bg-transparent">
            <IconPointer className="size-4 text-muted-foreground" />
          </Badge>
          <span>Bind</span>
        </div>
        <Badge variant="outline" size="sm" className="font-mono tabular-nums">
          {clicks}
        </Badge>
      </div>
      <CardPanel className="flex items-center justify-between rounded-[0.875rem] bg-background p-3">
        <span className="text-xs text-muted-foreground">Window clicks</span>
        <span className="font-mono text-sm font-semibold tabular-nums text-foreground">{clicks}</span>
      </CardPanel>
    </Card>
  )
}
