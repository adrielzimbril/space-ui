'use client'

import * as React from 'react'
import { useFirstRender } from '@/registry/hooks/lifecycle/use-first-render'
import { Card, CardPanel } from '@/registry/primitives/card'
import { Badge } from '@/registry/primitives/badge'
import { Button } from '@/registry/primitives/button'
import { IconSparkles } from '@tabler/icons-react'

export default function Demo() {
  const isFirst = useFirstRender()
  const [, force] = React.useReducer((x) => x + 1, 0)

  return (
    <Card className="w-full max-w-md bg-muted rounded-2xl overflow-hidden">
      <div className="flex items-center justify-between gap-3 px-3 pt-1 pb-1">
        <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
          <Badge variant="secondary" className="rounded-sm aspect-square h-full! bg-transparent">
            <IconSparkles className="size-4 text-muted-foreground" />
          </Badge>
          <span>First Render</span>
        </div>
        <Badge variant={isFirst ? 'default' : 'secondary'} size="sm">
          {isFirst ? 'First' : 'Later'}
        </Badge>
      </div>
      <CardPanel className="flex items-center justify-between rounded-[0.875rem] bg-background p-3">
        <span className="text-sm text-muted-foreground">{isFirst ? 'Mount cycle' : 'Re-render'}</span>
        <Button size="sm" variant="outline" onClick={force}>
          Re-render
        </Button>
      </CardPanel>
    </Card>
  )
}
