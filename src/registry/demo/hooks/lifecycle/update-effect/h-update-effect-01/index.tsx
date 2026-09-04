'use client'

import * as React from 'react'
import { useUpdateEffect } from '@/registry/hooks/lifecycle/use-update-effect'
import { Card, CardPanel } from '@/registry/primitives/card'
import { Button } from '@/registry/primitives/button'
import { Badge } from '@/registry/primitives/badge'
import { IconRefresh } from '@tabler/icons-react'

export default function Demo() {
  const [count, setCount] = React.useState(0)
  const [updated, setUpdated] = React.useState(false)

  useUpdateEffect(() => {
    setUpdated(true)
  }, [count])

  return (
    <Card className="w-full max-w-md bg-muted rounded-2xl overflow-hidden">
      <div className="flex items-center justify-between gap-3 px-3 pt-1 pb-1">
        <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
          <Badge variant="secondary" className="rounded-sm aspect-square h-full! bg-transparent">
            <IconRefresh className="size-4 text-muted-foreground" />
          </Badge>
          <span>Update</span>
        </div>
        <Badge variant={updated ? 'default' : 'outline'} size="sm">
          {updated ? 'Updated' : 'Initial'}
        </Badge>
      </div>
      <CardPanel className="flex items-center justify-between rounded-[0.875rem] bg-background p-3">
        <div className="rounded-lg bg-muted p-2.5">
          <span className="block text-[.6875rem] font-semibold text-muted-foreground">Count</span>
          <span className="mt-0.5 block font-mono text-sm font-semibold tabular-nums text-foreground">{count}</span>
        </div>
        <Button size="sm" onClick={() => setCount((c) => c + 1)}>
          Increment
        </Button>
      </CardPanel>
    </Card>
  )
}
