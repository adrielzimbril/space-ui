'use client'

import * as React from 'react'
import { useOrientation } from '@/registry/hooks/browser/use-orientation'
import { Card, CardPanel } from '@/registry/primitives/card'
import { Badge } from '@/registry/primitives/badge'
import { IconDeviceMobileRotated } from '@tabler/icons-react'

export default function Demo() {
  const orientation = useOrientation()

  return (
    <Card className="w-full max-w-md bg-muted rounded-2xl overflow-hidden">
      <div className="flex items-center justify-between gap-3 px-3 pt-1 pb-1">
        <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
          <Badge variant="secondary" className="rounded-sm aspect-square h-full! bg-transparent">
            <IconDeviceMobileRotated className="size-4 text-muted-foreground" />
          </Badge>
          <span>Orientation</span>
        </div>
        <Badge variant="outline" size="sm" className="capitalize">
          {orientation.type}
        </Badge>
      </div>
      <CardPanel className="grid grid-cols-2 gap-2 rounded-[0.875rem] bg-background p-3">
        <div className="rounded-lg bg-muted p-2.5">
          <span className="block text-[.6875rem] font-semibold text-muted-foreground">Type</span>
          <span className="mt-0.5 block truncate font-mono text-sm font-semibold capitalize text-foreground">
            {orientation.type}
          </span>
        </div>
        <div className="rounded-lg bg-muted p-2.5">
          <span className="block text-[.6875rem] font-semibold text-muted-foreground">Angle</span>
          <span className="mt-0.5 block font-mono text-sm font-semibold tabular-nums text-foreground">
            {orientation.angle}°
          </span>
        </div>
      </CardPanel>
    </Card>
  )
}
