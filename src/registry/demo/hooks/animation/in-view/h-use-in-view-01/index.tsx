'use client'

import * as React from 'react'
import { useInView } from '@/registry/hooks/animation/use-in-view'
import { Card, CardPanel } from '@/registry/primitives/card'
import { Badge } from '@/registry/primitives/badge'
import { IconEye } from '@tabler/icons-react'

export default function Demo() {
  const [ref, inView] = useInView({ threshold: 0.5 })

  return (
    <Card className="w-full max-w-md bg-muted rounded-2xl overflow-hidden">
      <div className="flex items-center justify-between gap-3 px-3 pt-1 pb-1">
        <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
          <Badge variant="secondary" className="rounded-sm aspect-square h-full! bg-transparent">
            <IconEye className="size-4 text-muted-foreground" />
          </Badge>
          <span>In View</span>
        </div>
        <Badge variant={inView ? 'success' : 'outline'} size="sm">
          {inView ? 'In view' : 'Hidden'}
        </Badge>
      </div>
      <CardPanel className="rounded-[0.875rem] bg-background p-3">
        <div
          ref={ref}
          className="flex items-center justify-center rounded-lg bg-muted p-6 text-sm font-semibold text-muted-foreground"
        >
          {inView ? 'Visible' : 'Offscreen'}
        </div>
      </CardPanel>
    </Card>
  )
}
