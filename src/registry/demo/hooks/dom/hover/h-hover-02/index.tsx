'use client'

import * as React from 'react'
import { useHover } from '@/registry/hooks/dom/use-hover'
import { Card, CardPanel } from '@/registry/primitives/card'
import { Button } from '@/registry/primitives/button'
import { Badge } from '@/registry/primitives/badge'
import { IconPackage } from '@tabler/icons-react'

export default function Demo() {
  const cardRef = React.useRef<HTMLDivElement>(null)
  const isHovered = useHover(cardRef)

  return (
    <Card className="w-full max-w-md bg-muted rounded-2xl overflow-hidden">
      <div className="flex items-center justify-between gap-3 px-3 pt-1 pb-1">
        <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
          <Badge variant="secondary" className="rounded-sm aspect-square h-full! bg-transparent">
            <IconPackage className="size-4 text-muted-foreground" />
          </Badge>
          <span>Target</span>
        </div>
        <Badge variant={isHovered ? 'success' : 'outline'} size="sm">
          {isHovered ? 'Active' : 'Idle'}
        </Badge>
      </div>
      <CardPanel className="rounded-[0.875rem] bg-background p-3">
        <div ref={cardRef} className="flex flex-col gap-3 rounded-lg bg-muted p-2.5">
          <span className="text-sm font-semibold text-foreground">Observed</span>
          <Button size="sm" variant={isHovered ? 'default' : 'outline'} className="w-full">
            Inspect
          </Button>
        </div>
      </CardPanel>
    </Card>
  )
}
