'use client'

import * as React from 'react'
import { useFullscreen } from '@/registry/hooks/browser/use-fullscreen'
import { Card, CardPanel } from '@/registry/primitives/card'
import { Button } from '@/registry/primitives/button'
import { Badge } from '@/registry/primitives/badge'
import { IconMaximize, IconMinimize } from '@tabler/icons-react'

export default function Demo() {
  const ref = React.useRef<HTMLDivElement>(null)
  const { isFullscreen, toggle } = useFullscreen(ref)

  return (
    <Card className="w-full max-w-md bg-muted rounded-2xl overflow-hidden">
      <div className="flex items-center justify-between gap-3 px-3 pt-1 pb-1">
        <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
          <Badge variant="secondary" className="rounded-sm aspect-square h-full! bg-transparent">
            {isFullscreen ? (
              <IconMinimize className="size-4 text-muted-foreground" />
            ) : (
              <IconMaximize className="size-4 text-muted-foreground" />
            )}
          </Badge>
          <span>Fullscreen</span>
        </div>
        <Badge variant={isFullscreen ? 'success' : 'outline'} size="sm">
          {isFullscreen ? 'Active' : 'Idle'}
        </Badge>
      </div>
      <CardPanel ref={ref} className="flex flex-col gap-3 rounded-[0.875rem] bg-background p-3">
        <Button onClick={toggle} variant={isFullscreen ? 'secondary' : 'default'}>
          {isFullscreen ? <IconMinimize className="size-3.5" /> : <IconMaximize className="size-3.5" />}
          {isFullscreen ? 'Exit' : 'Enter'}
        </Button>
      </CardPanel>
    </Card>
  )
}
