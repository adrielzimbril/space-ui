'use client'

import * as React from 'react'
import { useLockBodyScroll } from '@/registry/hooks/dom/use-lock-body-scroll'
import { Card, CardPanel } from '@/registry/primitives/card'
import { Badge } from '@/registry/primitives/badge'
import { Switch } from '@/registry/primitives/switch'
import { IconLock } from '@tabler/icons-react'

export default function Demo() {
  const { isLocked, toggle } = useLockBodyScroll(false)

  return (
    <Card className="w-full max-w-md bg-muted rounded-2xl overflow-hidden">
      <div className="flex items-center justify-between gap-3 px-3 pt-1 pb-1">
        <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
          <Badge variant="secondary" className="rounded-sm aspect-square h-full! bg-transparent">
            <IconLock className="size-4 text-muted-foreground" />
          </Badge>
          <span>Lock</span>
        </div>
        <Badge variant={isLocked ? 'destructive' : 'outline'} size="sm">
          {isLocked ? 'Locked' : 'Unlocked'}
        </Badge>
      </div>
      <CardPanel className="flex items-center justify-between rounded-[0.875rem] bg-background p-3">
        <span className="text-sm text-muted-foreground">Body scroll</span>
        <Switch checked={isLocked} onCheckedChange={toggle} aria-label="Lock body scroll" />
      </CardPanel>
    </Card>
  )
}
