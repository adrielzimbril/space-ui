'use client'

import * as React from 'react'
import { useCookieListener } from '@/registry/hooks/browser/use-cookie-listener'
import { Card, CardPanel } from '@/registry/primitives/card'
import { Badge } from '@/registry/primitives/badge'
import { IconCookie } from '@tabler/icons-react'

export default function Demo() {
  const cookies = useCookieListener(1000)
  const latestValue = cookies?.['space_pref'] as string | undefined

  return (
    <Card className="w-full max-w-md bg-muted rounded-2xl overflow-hidden">
      <div className="flex items-center justify-between gap-3 px-3 pt-1 pb-1">
        <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
          <Badge variant="secondary" className="rounded-sm aspect-square h-full! bg-transparent">
            <IconCookie className="size-4 text-muted-foreground" />
          </Badge>
          <span>Listener</span>
        </div>
        <Badge variant={latestValue ? 'success' : 'outline'} size="sm">
          {latestValue ?? 'Listening'}
        </Badge>
      </div>
      <CardPanel className="grid grid-cols-2 gap-2 rounded-[0.875rem] bg-background p-3">
        <div className="rounded-lg bg-muted p-2.5">
          <span className="block text-[.6875rem] font-semibold text-muted-foreground">Key</span>
          <span className="mt-0.5 block truncate font-mono text-sm font-semibold text-foreground">space_pref</span>
        </div>
        <div className="rounded-lg bg-muted p-2.5">
          <span className="block text-[.6875rem] font-semibold text-muted-foreground">Poll</span>
          <span className="mt-0.5 block font-mono text-sm font-semibold tabular-nums text-foreground">1000ms</span>
        </div>
      </CardPanel>
    </Card>
  )
}
