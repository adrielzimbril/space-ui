'use client'

import * as React from 'react'
import { useToggle } from '@/registry/hooks/lifecycle/use-toggle'
import { Card, CardPanel } from '@/registry/primitives/card'
import { Badge } from '@/registry/primitives/badge'
import { Switch } from '@/registry/primitives/switch'
import { IconToggleLeft } from '@tabler/icons-react'

export default function Demo() {
  const [state, toggle] = useToggle(false)

  return (
    <Card className="w-full max-w-md bg-muted rounded-2xl overflow-hidden">
      <div className="flex items-center justify-between gap-3 px-3 pt-1 pb-1">
        <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
          <Badge variant="secondary" className="rounded-sm aspect-square h-full! bg-transparent">
            <IconToggleLeft className="size-4 text-muted-foreground" />
          </Badge>
          <span>Toggle</span>
        </div>
        <Badge variant={state ? 'success' : 'outline'} size="sm">
          {state ? 'On' : 'Off'}
        </Badge>
      </div>
      <CardPanel className="flex items-center justify-between rounded-[0.875rem] bg-background p-3">
        <span className="text-sm text-muted-foreground">Boolean state</span>
        <Switch checked={state} onCheckedChange={() => toggle()} aria-label="Toggle state" />
      </CardPanel>
    </Card>
  )
}
