'use client'

import * as React from 'react'
import { useSingleEffect } from '@/registry/hooks/lifecycle/use-single-effect'
import { Card, CardPanel } from '@/registry/primitives/card'
import { Badge } from '@/registry/primitives/badge'
import { IconShieldCheck } from '@tabler/icons-react'

export default function Demo() {
  const [times, setTimes] = React.useState(0)
  useSingleEffect(() => {
    setTimes((t) => t + 1)
  })

  return (
    <Card className="w-full max-w-md bg-muted rounded-2xl overflow-hidden">
      <div className="flex items-center justify-between gap-3 px-3 pt-1 pb-1">
        <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
          <Badge variant="secondary" className="rounded-sm aspect-square h-full! bg-transparent">
            <IconShieldCheck className="size-4 text-muted-foreground" />
          </Badge>
          <span>Single</span>
        </div>
        <Badge variant="default" size="sm" className="font-mono tabular-nums">
          {times}x
        </Badge>
      </div>
      <CardPanel className="flex items-center justify-between rounded-[0.875rem] bg-background p-3">
        <span className="text-sm text-muted-foreground">StrictMode runs</span>
        <span className="font-mono text-sm font-semibold tabular-nums text-foreground">{times}</span>
      </CardPanel>
    </Card>
  )
}
