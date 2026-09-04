'use client'

import * as React from 'react'
import { useIntersectionObserver } from '@/registry/hooks/dom/use-intersection-observer'
import { Card, CardPanel } from '@/registry/primitives/card'
import { Badge } from '@/registry/primitives/badge'
import { IconEye, IconScan } from '@tabler/icons-react'

export default function Demo() {
  const ref = React.useRef<HTMLDivElement>(null)
  const entry = useIntersectionObserver(ref, { threshold: 0.5 })
  const isIntersecting = !!entry?.isIntersecting

  return (
    <Card className="w-full max-w-md bg-muted rounded-2xl overflow-hidden">
      <div className="flex items-center justify-between gap-3 px-3 pt-1 pb-1">
        <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
          <Badge variant="secondary" className="rounded-sm aspect-square h-full! bg-transparent">
            <IconScan className="size-4 text-muted-foreground" />
          </Badge>
          <span>Intersect</span>
        </div>
        <Badge variant={isIntersecting ? 'success' : 'outline'} size="sm">
          {isIntersecting ? 'In view' : 'Hidden'}
        </Badge>
      </div>
      <CardPanel className="rounded-[0.875rem] bg-background p-3">
        <div className="h-32 overflow-y-auto rounded-lg bg-muted p-2">
          <div className="flex h-12 items-center justify-center text-[.6875rem] font-semibold text-muted-foreground">
            Scroll down
          </div>
          <div
            ref={ref}
            className="flex items-center justify-between rounded-lg bg-background p-2.5 text-sm font-semibold text-foreground"
          >
            <span>Target</span>
            <IconEye className="size-4 text-muted-foreground" />
          </div>
          <div className="flex h-12 items-center justify-center text-[.6875rem] font-semibold text-muted-foreground">
            Scroll up
          </div>
        </div>
      </CardPanel>
    </Card>
  )
}
