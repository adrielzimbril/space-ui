'use client'

import * as React from 'react'
import { useConfirmExit } from '@/registry/hooks/lifecycle/use-confirm-exit'
import { Card, CardPanel } from '@/registry/primitives/card'
import { Button } from '@/registry/primitives/button'
import { Badge } from '@/registry/primitives/badge'
import { IconDoorExit } from '@tabler/icons-react'

export default function Demo() {
  const [dirty, setDirty] = React.useState(false)
  useConfirmExit(dirty, 'You have unsaved changes.')

  return (
    <Card className="w-full max-w-md bg-muted rounded-2xl overflow-hidden">
      <div className="flex items-center justify-between gap-3 px-3 pt-1 pb-1">
        <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
          <Badge variant="secondary" className="rounded-sm aspect-square h-full! bg-transparent">
            <IconDoorExit className="size-4 text-muted-foreground" />
          </Badge>
          <span>Exit Guard</span>
        </div>
        <Badge variant={dirty ? 'warning' : 'outline'} size="sm">
          {dirty ? 'Unsaved' : 'Saved'}
        </Badge>
      </div>
      <CardPanel className="flex items-center justify-between rounded-[0.875rem] bg-background p-3">
        <span className="text-sm text-muted-foreground">{dirty ? 'Warns on close' : 'Safe to close'}</span>
        <Button size="sm" variant={dirty ? 'secondary' : 'default'} onClick={() => setDirty((d) => !d)}>
          {dirty ? 'Save' : 'Edit'}
        </Button>
      </CardPanel>
    </Card>
  )
}
