'use client'

import * as React from 'react'
import { useNetwork } from '@/registry/hooks/browser/use-network'
import { Card, CardPanel } from '@/registry/primitives/card'
import { Badge } from '@/registry/primitives/badge'
import { IconWifi, IconWifiOff } from '@tabler/icons-react'

export default function Demo() {
  const network = useNetwork()

  return (
    <Card className="w-full max-w-md bg-muted rounded-2xl overflow-hidden">
      <div className="flex items-center justify-between gap-3 px-3 pt-1 pb-1">
        <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
          <Badge variant="secondary" className="rounded-sm aspect-square h-full! bg-transparent">
            {network.isOnline ? (
              <IconWifi className="size-4 text-muted-foreground" />
            ) : (
              <IconWifiOff className="size-4 text-muted-foreground" />
            )}
          </Badge>
          <span>Network</span>
        </div>
        <Badge variant={network.isOnline ? 'success' : 'destructive'} size="sm">
          {network.isOnline ? 'Online' : 'Offline'}
        </Badge>
      </div>
      <CardPanel className="grid grid-cols-3 gap-2 rounded-[0.875rem] bg-background p-3">
        <div className="rounded-lg bg-muted p-2.5">
          <span className="block text-[.6875rem] font-semibold text-muted-foreground">Type</span>
          <span className="mt-0.5 block font-mono text-sm font-semibold uppercase tabular-nums text-foreground">
            {network.effectiveType || '—'}
          </span>
        </div>
        <div className="rounded-lg bg-muted p-2.5">
          <span className="block text-[.6875rem] font-semibold text-muted-foreground">Downlink</span>
          <span className="mt-0.5 block font-mono text-sm font-semibold tabular-nums text-foreground">
            {network.downlink ? `${network.downlink} Mbps` : '—'}
          </span>
        </div>
        <div className="rounded-lg bg-muted p-2.5">
          <span className="block text-[.6875rem] font-semibold text-muted-foreground">RTT</span>
          <span className="mt-0.5 block font-mono text-sm font-semibold tabular-nums text-foreground">
            {network.rtt ? `${network.rtt} ms` : '—'}
          </span>
        </div>
      </CardPanel>
    </Card>
  )
}
