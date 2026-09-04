'use client'

import * as React from 'react'
import { useShare } from '@/registry/hooks/browser/use-share'
import { Card, CardPanel } from '@/registry/primitives/card'
import { Button } from '@/registry/primitives/button'
import { Badge } from '@/registry/primitives/badge'
import { IconShare } from '@tabler/icons-react'

export default function Demo() {
  const [share, { isSupported }] = useShare()

  return (
    <Card className="w-full max-w-md bg-muted rounded-2xl overflow-hidden">
      <div className="flex items-center justify-between gap-3 px-3 pt-1 pb-1">
        <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
          <Badge variant="secondary" className="rounded-sm aspect-square h-full! bg-transparent">
            <IconShare className="size-4 text-muted-foreground" />
          </Badge>
          <span>Share</span>
        </div>
        <Badge variant={isSupported ? 'success' : 'outline'} size="sm">
          {isSupported ? 'Ready' : 'Unsupported'}
        </Badge>
      </div>
      <CardPanel className="flex flex-col gap-3 rounded-[0.875rem] bg-background p-3">
        <Button onClick={() => share({ title: 'Space UI', url: 'https://space-ui.com' })} disabled={!isSupported}>
          <IconShare className="size-3.5" />
          Share
        </Button>
      </CardPanel>
    </Card>
  )
}
