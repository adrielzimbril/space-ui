'use client'

import * as React from 'react'
import { usePerformanceMode } from '@/registry/hooks/lifecycle/use-performance-mode'
import { Card, CardPanel } from '@/registry/primitives/card'
import { Badge } from '@/registry/primitives/badge'
import { IconCpu, IconLeaf } from '@tabler/icons-react'

export default function Demo() {
  const isEco = usePerformanceMode()

  return (
    <Card className="w-full max-w-md bg-muted rounded-2xl overflow-hidden">
      <div className="flex items-center justify-between gap-3 px-3 pt-1 pb-1">
        <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
          <Badge variant="secondary" className="rounded-sm aspect-square h-full! bg-transparent">
            {isEco ? (
              <IconLeaf className="size-4 text-muted-foreground" />
            ) : (
              <IconCpu className="size-4 text-muted-foreground" />
            )}
          </Badge>
          <span>Performance</span>
        </div>
        <Badge variant={isEco ? 'secondary' : 'default'} size="sm">
          {isEco ? 'Eco' : 'Full'}
        </Badge>
      </div>
      <CardPanel className="flex items-center justify-between rounded-[0.875rem] bg-background p-3">
        <span className="text-sm text-muted-foreground">Power profile</span>
        <span className="text-sm font-semibold text-foreground">{isEco ? 'Low power' : 'Full'}</span>
      </CardPanel>
    </Card>
  )
}
