'use client'

import * as React from 'react'
import { Switch, Case, Default } from '@/registry/hooks/components/switch'
import { Card, CardPanel } from '@/registry/primitives/card'
import { Button } from '@/registry/primitives/button'
import { Badge } from '@/registry/primitives/badge'
import { IconClock, IconAlertCircle, IconCheck, IconX, IconTruckDelivery } from '@tabler/icons-react'

export default function Demo() {
  const [status, setStatus] = React.useState<'pending' | 'processing' | 'shipped' | 'cancelled'>('processing')

  return (
    <Card className="w-full max-w-md bg-muted rounded-2xl overflow-hidden">
      <div className="flex items-center justify-between gap-3 px-3 pt-1 pb-1">
        <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
          <Badge variant="secondary" className="rounded-sm aspect-square h-full! bg-transparent">
            <IconTruckDelivery className="size-4 text-muted-foreground" />
          </Badge>
          <span>Switch</span>
        </div>
        <Badge
          variant={status === 'shipped' ? 'success' : status === 'cancelled' ? 'destructive' : 'outline'}
          size="sm"
          className="capitalize"
        >
          {status}
        </Badge>
      </div>
      <CardPanel className="flex flex-col gap-3 rounded-[0.875rem] bg-background p-3">
        <div className="flex flex-wrap gap-1">
          {(['pending', 'processing', 'shipped', 'cancelled'] as const).map((s) => (
            <Button
              key={s}
              size="sm"
              variant={status === s ? 'default' : 'outline'}
              onClick={() => setStatus(s)}
              className="flex-1 capitalize"
            >
              {s}
            </Button>
          ))}
        </div>
        <div className="flex items-center justify-center rounded-lg bg-muted p-2.5">
          <Switch>
            <Case condition={status === 'pending'}>
              <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
                <IconClock className="size-4 text-muted-foreground" />
                Pending approval
              </div>
            </Case>
            <Case condition={status === 'processing'}>
              <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
                <IconAlertCircle className="size-4 animate-spin text-muted-foreground" />
                Preparing for transit
              </div>
            </Case>
            <Case condition={status === 'shipped'}>
              <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
                <IconCheck className="size-4 text-muted-foreground" />
                In transit
              </div>
            </Case>
            <Default>
              <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
                <IconX className="size-4 text-muted-foreground" />
                Cancelled
              </div>
            </Default>
          </Switch>
        </div>
      </CardPanel>
    </Card>
  )
}
