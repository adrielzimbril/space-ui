'use client'

import * as React from 'react'
import { If } from '@/registry/hooks/components/if'
import { Card, CardPanel } from '@/registry/primitives/card'
import { Button } from '@/registry/primitives/button'
import { Badge } from '@/registry/primitives/badge'
import { IconFilter, IconCheck, IconX } from '@tabler/icons-react'

export default function Demo() {
  const [active, setActive] = React.useState(true)

  return (
    <Card className="w-full max-w-md bg-muted rounded-2xl overflow-hidden">
      <div className="flex items-center justify-between gap-3 px-3 pt-1 pb-1">
        <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
          <Badge variant="secondary" className="rounded-sm aspect-square h-full! bg-transparent">
            <IconFilter className="size-4 text-muted-foreground" />
          </Badge>
          <span>If</span>
        </div>
        <Badge variant={active ? 'success' : 'outline'} size="sm">
          {active ? 'True' : 'False'}
        </Badge>
      </div>
      <CardPanel className="flex flex-col gap-3 rounded-[0.875rem] bg-background p-3">
        <div className="flex items-center justify-center rounded-lg bg-muted p-2.5">
          <If
            condition={active}
            fallback={
              <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                <IconX className="size-4" />
                <span>False</span>
              </div>
            }
          >
            <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
              <IconCheck className="size-4 text-muted-foreground" />
              <span>True</span>
            </div>
          </If>
        </div>
        <Button size="sm" variant="outline" onClick={() => setActive((p) => !p)} className="w-full">
          Toggle
        </Button>
      </CardPanel>
    </Card>
  )
}
