'use client'

import * as React from 'react'
import { useIsMounted } from '@/registry/hooks/lifecycle/use-is-mounted'
import { Card, CardPanel } from '@/registry/primitives/card'
import { Badge } from '@/registry/primitives/badge'
import { IconCheck } from '@tabler/icons-react'

export default function Demo() {
  const isMounted = useIsMounted()

  return (
    <Card className="w-full max-w-md bg-muted rounded-2xl overflow-hidden">
      <div className="flex items-center justify-between gap-3 px-3 pt-1 pb-1">
        <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
          <Badge variant="secondary" className="rounded-sm aspect-square h-full! bg-transparent">
            <IconCheck className="size-4 text-muted-foreground" />
          </Badge>
          <span>Mounted</span>
        </div>
        <Badge variant={isMounted() ? 'success' : 'outline'} size="sm">
          {isMounted() ? 'Mounted' : 'Unmounted'}
        </Badge>
      </div>
      <CardPanel className="flex items-center justify-between rounded-[0.875rem] bg-background p-3">
        <span className="text-sm text-muted-foreground">Async-safe check</span>
        <span className="text-sm font-semibold text-foreground">{isMounted() ? 'True' : 'False'}</span>
      </CardPanel>
    </Card>
  )
}
