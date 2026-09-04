'use client'

import * as React from 'react'
import { RenderAfter } from '@/registry/hooks/components/render-after'
import { Card, CardPanel } from '@/registry/primitives/card'
import { Badge } from '@/registry/primitives/badge'
import { IconHourglass, IconCheck } from '@tabler/icons-react'

export default function Demo() {
  return (
    <Card className="w-full max-w-md bg-muted rounded-2xl overflow-hidden">
      <div className="flex items-center justify-between gap-3 px-3 pt-1 pb-1">
        <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
          <Badge variant="secondary" className="rounded-sm aspect-square h-full! bg-transparent">
            <IconHourglass className="size-4 text-muted-foreground" />
          </Badge>
          <span>After</span>
        </div>
        <Badge variant="outline" size="sm" className="font-mono tabular-nums">
          1000ms
        </Badge>
      </div>
      <CardPanel className="flex items-center justify-between rounded-[0.875rem] bg-background p-3">
        <span className="text-xs text-muted-foreground">Deferred mount</span>
        <RenderAfter
          delay={1000}
          fallback={
            <Badge variant="outline" size="sm" className="animate-pulse">
              Waiting
            </Badge>
          }
        >
          <Badge variant="success" size="sm">
            <IconCheck className="size-3" />
            Mounted
          </Badge>
        </RenderAfter>
      </CardPanel>
    </Card>
  )
}
