'use client'

import * as React from 'react'
import { useSessionStorage } from '@/registry/hooks/browser/use-session-storage'
import { Card, CardPanel } from '@/registry/primitives/card'
import { Button } from '@/registry/primitives/button'
import { Badge } from '@/registry/primitives/badge'
import { IconDeviceFloppy, IconPlus, IconRotateClockwise } from '@tabler/icons-react'

export default function Demo() {
  const [views, setViews] = useSessionStorage('space_session_views', 1)

  return (
    <Card className="w-full max-w-md bg-muted rounded-2xl overflow-hidden">
      <div className="flex items-center justify-between gap-3 px-3 pt-1 pb-1">
        <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
          <Badge variant="secondary" className="rounded-sm aspect-square h-full! bg-transparent">
            <IconDeviceFloppy className="size-4 text-muted-foreground" />
          </Badge>
          <span>Session</span>
        </div>
        <Badge variant="outline" size="sm">
          Volatile
        </Badge>
      </div>
      <CardPanel className="flex flex-col gap-3 rounded-[0.875rem] bg-background p-3">
        <div className="rounded-lg bg-muted p-2.5">
          <span className="block text-[.6875rem] font-semibold text-muted-foreground">Views</span>
          <span className="mt-0.5 block font-mono text-sm font-semibold tabular-nums text-foreground">{views}</span>
        </div>
        <div className="flex items-center gap-2">
          <Button size="sm" onClick={() => setViews((v) => v + 1)} className="flex-1">
            <IconPlus className="size-3.5" />
            Increment
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={() => setViews(1)}
            aria-label="Reset"
            className="shrink-0 text-muted-foreground hover:text-foreground"
          >
            <IconRotateClockwise className="size-4" />
          </Button>
        </div>
      </CardPanel>
    </Card>
  )
}
