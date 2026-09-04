'use client'

import * as React from 'react'
import { useScript } from '@/registry/hooks/browser/use-script'
import { Card, CardPanel } from '@/registry/primitives/card'
import { Badge } from '@/registry/primitives/badge'
import { IconFileCode } from '@tabler/icons-react'

export default function Demo() {
  const status = useScript('https://cdn.jsdelivr.net/npm/canvas-confetti@1.6.0/dist/confetti.browser.min.js')

  return (
    <Card className="w-full max-w-md bg-muted rounded-2xl overflow-hidden">
      <div className="flex items-center justify-between gap-3 px-3 pt-1 pb-1">
        <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
          <Badge variant="secondary" className="rounded-sm aspect-square h-full! bg-transparent">
            <IconFileCode className="size-4 text-muted-foreground" />
          </Badge>
          <span>Script</span>
        </div>
        <Badge variant={status === 'ready' ? 'success' : 'outline'} size="sm" className="capitalize">
          {status}
        </Badge>
      </div>
      <CardPanel className="flex flex-col gap-3 rounded-[0.875rem] bg-background p-3">
        <div className="rounded-lg bg-muted p-2.5">
          <span className="block text-[.6875rem] font-semibold text-muted-foreground">Source</span>
          <span className="mt-0.5 block truncate font-mono text-sm font-semibold text-foreground">canvas-confetti</span>
        </div>
      </CardPanel>
    </Card>
  )
}
