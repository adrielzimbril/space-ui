'use client'

import * as React from 'react'
import { useFirstVisit } from '@/registry/hooks/lifecycle/use-first-visit'
import { Card, CardPanel } from '@/registry/primitives/card'
import { Badge } from '@/registry/primitives/badge'
import { IconUserCheck } from '@tabler/icons-react'

export default function Demo() {
  const isFirst = useFirstVisit('space_visit_demo')

  return (
    <Card className="w-full max-w-md bg-muted rounded-2xl overflow-hidden">
      <div className="flex items-center justify-between gap-3 px-3 pt-1 pb-1">
        <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
          <Badge variant="secondary" className="rounded-sm aspect-square h-full! bg-transparent">
            <IconUserCheck className="size-4 text-muted-foreground" />
          </Badge>
          <span>Visit</span>
        </div>
        <Badge variant={isFirst ? 'default' : 'outline'} size="sm">
          {isFirst ? 'First' : 'Returning'}
        </Badge>
      </div>
      <CardPanel className="flex items-center justify-between rounded-[0.875rem] bg-background p-3">
        <span className="text-sm text-muted-foreground">space_visit_demo</span>
        <span className="text-sm font-semibold text-foreground">{isFirst ? 'New' : 'Seen'}</span>
      </CardPanel>
    </Card>
  )
}
