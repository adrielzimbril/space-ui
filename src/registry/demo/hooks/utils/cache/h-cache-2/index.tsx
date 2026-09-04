'use client'

import * as React from 'react'
import { memoryCache } from '@/registry/utils/cache'
import { Button } from '@/registry/primitives/button'
import { Badge } from '@/registry/primitives/badge'
import { Card, CardPanel } from '@/registry/primitives/card'
import { IconClock } from '@tabler/icons-react'

export default function Demo() {
  const [status, setStatus] = React.useState('idle')

  const storeWithTTL = () => {
    memoryCache.set('ttl_demo', 'Hello TTL!', 3000)
    setStatus('stored (expires in 3s)')
  }

  const read = () => {
    const val = memoryCache.get('ttl_demo')
    setStatus(val !== undefined ? `value: "${val}"` : 'expired / not found')
  }

  return (
    <Card className="w-full max-w-md bg-muted rounded-2xl overflow-hidden">
      <div className="flex items-center justify-between gap-3 px-3 pt-1 pb-1">
        <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
          <Badge variant="secondary" className="rounded-sm aspect-square h-full! bg-transparent">
            <IconClock className="size-4 text-muted-foreground" />
          </Badge>
          <span>TTL</span>
        </div>
        <Badge variant={status.startsWith('value') ? 'success' : 'outline'} size="sm">
          {status.startsWith('value') ? 'Hit' : 'Idle'}
        </Badge>
      </div>
      <CardPanel className="flex flex-col gap-3 rounded-[0.875rem] bg-background p-3">
        <div className="flex gap-2">
          <Button size="sm" onClick={storeWithTTL}>
            Store 3s
          </Button>
          <Button size="sm" variant="outline" onClick={read}>
            Read
          </Button>
        </div>
        <div className="rounded-lg bg-muted p-2.5">
          <span className="block text-[.6875rem] font-semibold text-muted-foreground">Status</span>
          <span className="mt-0.5 block font-mono text-sm font-semibold text-foreground">{status}</span>
        </div>
      </CardPanel>
    </Card>
  )
}
