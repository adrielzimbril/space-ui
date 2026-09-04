'use client'

import * as React from 'react'
import { useBatteryStatus } from '@/registry/hooks/browser/use-battery-status'
import { Card, CardPanel } from '@/registry/primitives/card'
import { Badge } from '@/registry/primitives/badge'
import { Progress } from '@/registry/primitives/progress'
import { IconBattery, IconBatteryCharging } from '@tabler/icons-react'

export default function Demo() {
  const battery = useBatteryStatus()
  const levelPercent = Math.round((battery.level ?? 1) * 100)

  return (
    <Card className="w-full max-w-md bg-muted rounded-2xl overflow-hidden">
      <div className="flex items-center justify-between gap-3 px-3 pt-1 pb-1">
        <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
          <Badge variant="secondary" className="rounded-sm aspect-square h-full! bg-transparent">
            {battery.charging ? (
              <IconBatteryCharging className="size-4 text-muted-foreground" />
            ) : (
              <IconBattery className="size-4 text-muted-foreground" />
            )}
          </Badge>
          <span>Battery</span>
        </div>
        <Badge variant={battery.charging ? 'warning' : 'outline'} size="sm">
          {battery.charging ? 'Charging' : `${levelPercent}%`}
        </Badge>
      </div>
      <CardPanel className="flex flex-col gap-3 rounded-[0.875rem] bg-background p-3">
        <div className="rounded-lg bg-muted p-2.5">
          <span className="block text-[.6875rem] font-semibold text-muted-foreground">Level</span>
          <span className="mt-0.5 block font-mono text-sm font-semibold tabular-nums text-foreground">
            {battery.supported ? `${levelPercent}%` : '100%'}
          </span>
          <Progress value={battery.supported ? levelPercent : 100} className="mt-2" />
        </div>
        <div className="grid grid-cols-2 gap-2">
          <div className="rounded-lg bg-muted p-2.5">
            <span className="block text-[.6875rem] font-semibold text-muted-foreground">Discharge</span>
            <span className="mt-0.5 block font-mono text-sm font-semibold tabular-nums text-foreground">
              {battery.dischargingTime === Infinity || !battery.dischargingTime
                ? '—'
                : `${Math.round(battery.dischargingTime / 60)} min`}
            </span>
          </div>
          <div className="rounded-lg bg-muted p-2.5">
            <span className="block text-[.6875rem] font-semibold text-muted-foreground">API</span>
            <span className="mt-0.5 block font-mono text-sm font-semibold text-foreground">
              {battery.supported ? 'Native' : 'Fallback'}
            </span>
          </div>
        </div>
      </CardPanel>
    </Card>
  )
}
