'use client'

import * as React from 'react'
import { useIsomorphicLayoutEffect } from '@/registry/hooks/lifecycle/use-isomorphic-layout-effect'
import { Card, CardPanel } from '@/registry/primitives/card'
import { Badge } from '@/registry/primitives/badge'
import { IconLayersLinked } from '@tabler/icons-react'

export default function Demo() {
  const [executed, setExecuted] = React.useState(false)
  useIsomorphicLayoutEffect(() => {
    setExecuted(true)
  }, [])

  return (
    <Card className="w-full max-w-md bg-muted rounded-2xl overflow-hidden">
      <div className="flex items-center justify-between gap-3 px-3 pt-1 pb-1">
        <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
          <Badge variant="secondary" className="rounded-sm aspect-square h-full! bg-transparent">
            <IconLayersLinked className="size-4 text-muted-foreground" />
          </Badge>
          <span>Layout Effect</span>
        </div>
        <Badge variant={executed ? 'success' : 'outline'} size="sm">
          {executed ? 'Executed' : 'Pending'}
        </Badge>
      </div>
      <CardPanel className="flex items-center justify-between rounded-[0.875rem] bg-background p-3">
        <span className="text-sm text-muted-foreground">SSR-safe mount</span>
        <span className="text-sm font-semibold text-foreground">{executed ? 'Ran' : 'Waiting'}</span>
      </CardPanel>
    </Card>
  )
}
