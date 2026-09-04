'use client'

import * as React from 'react'
import { logger } from '@/registry/utils/logger'
import { Card, CardPanel } from '@/registry/primitives/card'
import { Button } from '@/registry/primitives/button'
import { Badge } from '@/registry/primitives/badge'
import { IconTerminal } from '@tabler/icons-react'

export default function Demo() {
  const [logged, setLogged] = React.useState(0)

  const handleLog = () => {
    logger.info('Space UI Log Entry @', new Date().toLocaleTimeString())
    setLogged((c) => c + 1)
  }

  return (
    <Card className="w-full max-w-md bg-muted rounded-2xl overflow-hidden">
      <div className="flex items-center justify-between gap-3 px-3 pt-1 pb-1">
        <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
          <Badge variant="secondary" className="rounded-sm aspect-square h-full! bg-transparent">
            <IconTerminal className="size-4 text-muted-foreground" />
          </Badge>
          <span>Log</span>
        </div>
        <Badge variant={logged > 0 ? 'default' : 'outline'} size="sm" className="font-mono tabular-nums">
          {logged}
        </Badge>
      </div>
      <CardPanel className="flex items-center justify-between rounded-[0.875rem] bg-background p-3">
        <span className="text-xs text-muted-foreground">DevTools console</span>
        <Button size="sm" onClick={handleLog}>
          Log info
        </Button>
      </CardPanel>
    </Card>
  )
}
