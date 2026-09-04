'use client'

import * as React from 'react'
import { useLeaveDetection } from '@/registry/hooks/lifecycle/use-leave-detection'
import { Card, CardPanel } from '@/registry/primitives/card'
import { Badge } from '@/registry/primitives/badge'
import { Button } from '@/registry/primitives/button'
import { IconPointer, IconRotateClockwise } from '@tabler/icons-react'

export default function Demo() {
  const { isOutside, leaveCount, direction, reset } = useLeaveDetection({
    detectBlur: true,
    detectVisibility: true,
  })

  const directionLabel = () => {
    switch (direction) {
      case 'top':
        return 'Top'
      case 'left':
        return 'Left'
      case 'right':
        return 'Right'
      case 'bottom':
        return 'Bottom'
      case 'blur':
        return 'Blur'
      case 'visibility':
        return 'Tab'
      default:
        return 'Inside'
    }
  }

  return (
    <Card className="w-full max-w-md bg-muted rounded-2xl overflow-hidden">
      <div className="flex items-center justify-between gap-3 px-3 pt-1 pb-1">
        <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
          <Badge variant="secondary" className="rounded-sm aspect-square h-full! bg-transparent">
            <IconPointer className="size-4 text-muted-foreground" />
          </Badge>
          <span>Leave</span>
        </div>
        <Badge variant={isOutside ? 'destructive' : 'outline'} size="sm">
          {isOutside ? 'Outside' : 'Focused'}
        </Badge>
      </div>
      <CardPanel className="flex flex-col gap-3 rounded-[0.875rem] bg-background p-3">
        <div className="grid grid-cols-2 gap-2">
          <div className="rounded-lg bg-muted p-2.5">
            <span className="block text-[.6875rem] font-semibold text-muted-foreground">Direction</span>
            <span className="mt-0.5 block truncate font-mono text-sm font-semibold text-foreground">
              {directionLabel()}
            </span>
          </div>
          <div className="rounded-lg bg-muted p-2.5">
            <span className="block text-[.6875rem] font-semibold text-muted-foreground">Exits</span>
            <span className="mt-0.5 block font-mono text-sm font-semibold tabular-nums text-foreground">
              {leaveCount}
            </span>
          </div>
        </div>
        <Button size="sm" variant="outline" onClick={reset} className="w-full">
          <IconRotateClockwise className="size-3.5" />
          Reset
        </Button>
      </CardPanel>
    </Card>
  )
}
