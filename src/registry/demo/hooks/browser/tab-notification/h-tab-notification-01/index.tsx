'use client'

import * as React from 'react'
import { useTabNotification } from '@/registry/hooks/browser/use-tab-notification'
import { Card, CardPanel } from '@/registry/primitives/card'
import { Button } from '@/registry/primitives/button'
import { Badge } from '@/registry/primitives/badge'
import { IconBell, IconPlus, IconRotateClockwise } from '@tabler/icons-react'

export default function Demo() {
  const [badge, setBadge] = React.useState(0)
  useTabNotification(badge > 0 ? `(${badge}) Space UI` : 'Space UI')

  return (
    <Card className="w-full max-w-md bg-muted rounded-2xl overflow-hidden">
      <div className="flex items-center justify-between gap-3 px-3 pt-1 pb-1">
        <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
          <Badge variant="secondary" className="rounded-sm aspect-square h-full! bg-transparent">
            <IconBell className="size-4 text-muted-foreground" />
          </Badge>
          <span>Tab</span>
        </div>
        <Badge variant={badge > 0 ? 'success' : 'outline'} size="sm" className="font-mono tabular-nums">
          {badge}
        </Badge>
      </div>
      <CardPanel className="flex items-center gap-2 rounded-[0.875rem] bg-background p-3">
        <Button size="sm" onClick={() => setBadge((b) => b + 1)} className="flex-1">
          <IconPlus className="size-3.5" />
          Notify
        </Button>
        <Button
          size="sm"
          variant="outline"
          onClick={() => setBadge(0)}
          aria-label="Reset"
          className="shrink-0 text-muted-foreground hover:text-foreground"
        >
          <IconRotateClockwise className="size-4" />
        </Button>
      </CardPanel>
    </Card>
  )
}
