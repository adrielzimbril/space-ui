'use client'

import * as React from 'react'
import { Class } from '@/registry/hooks/components/class'
import { Card, CardPanel } from '@/registry/primitives/card'
import { Button } from '@/registry/primitives/button'
import { Badge } from '@/registry/primitives/badge'
import { IconPalette, IconSparkles } from '@tabler/icons-react'

export default function Demo() {
  const [active, setActive] = React.useState(true)

  return (
    <Card className="w-full max-w-md bg-muted rounded-2xl overflow-hidden">
      <div className="flex items-center justify-between gap-3 px-3 pt-1 pb-1">
        <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
          <Badge variant="secondary" className="rounded-sm aspect-square h-full! bg-transparent">
            <IconPalette className="size-4 text-muted-foreground" />
          </Badge>
          <span>Class</span>
        </div>
        <Badge variant={active ? 'default' : 'outline'} size="sm">
          {active ? 'On' : 'Off'}
        </Badge>
      </div>
      <CardPanel className="flex flex-col gap-3 rounded-[0.875rem] bg-background p-3">
        <Class className={active ? 'bg-primary/10 text-primary' : 'bg-muted text-muted-foreground'}>
          <div className="flex items-center justify-between rounded-lg p-2.5 text-xs font-medium">
            <span>Styled target</span>
            <IconSparkles className="size-4 opacity-80" />
          </div>
        </Class>
        <Button size="sm" variant="outline" onClick={() => setActive((a) => !a)} className="w-full">
          Toggle
        </Button>
      </CardPanel>
    </Card>
  )
}
