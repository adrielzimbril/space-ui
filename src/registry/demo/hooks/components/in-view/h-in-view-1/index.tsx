'use client'

import * as React from 'react'
import { InView } from '@/registry/hooks/components/in-view'
import { Card, CardPanel } from '@/registry/primitives/card'
import { Badge } from '@/registry/primitives/badge'
import { IconEye } from '@tabler/icons-react'

export default function Demo() {
  return (
    <Card className="w-full max-w-md bg-muted rounded-2xl overflow-hidden">
      <div className="flex items-center justify-between gap-3 px-3 pt-1 pb-1">
        <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
          <Badge variant="secondary" className="rounded-sm aspect-square h-full! bg-transparent">
            <IconEye className="size-4 text-muted-foreground" />
          </Badge>
          <span>InView</span>
        </div>
        <Badge variant="outline" size="sm">
          Observer
        </Badge>
      </div>
      <CardPanel className="flex min-h-[100px] items-center justify-center rounded-[0.875rem] bg-background p-3">
        <InView>
          {({ inView, ref }) => (
            <div ref={ref} className="rounded-lg bg-muted p-2.5">
              <span className="block text-[.6875rem] font-semibold text-muted-foreground">Intersecting</span>
              <span className="mt-0.5 block text-sm font-semibold text-foreground">
                {inView ? 'Visible' : 'Hidden'}
              </span>
            </div>
          )}
        </InView>
      </CardPanel>
    </Card>
  )
}
