'use client'

import * as React from 'react'
import { useEventCallback } from '@/registry/hooks/lifecycle/use-event-callback'
import { Card, CardPanel } from '@/registry/primitives/card'
import { Button } from '@/registry/primitives/button'
import { Badge } from '@/registry/primitives/badge'
import { Input } from '@/registry/primitives/input'
import { IconFunction } from '@tabler/icons-react'

export default function Demo() {
  const [text, setText] = React.useState('Hello Space UI')
  const [triggered, setTriggered] = React.useState<string | null>(null)

  const handleClick = useEventCallback(() => {
    setTriggered(text)
  })

  return (
    <Card className="w-full max-w-md bg-muted rounded-2xl overflow-hidden">
      <div className="flex items-center justify-between gap-3 px-3 pt-1 pb-1">
        <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
          <Badge variant="secondary" className="rounded-sm aspect-square h-full! bg-transparent">
            <IconFunction className="size-4 text-muted-foreground" />
          </Badge>
          <span>Callback</span>
        </div>
        <Badge variant="outline" size="sm">
          Stable
        </Badge>
      </div>
      <CardPanel className="flex flex-col gap-3 rounded-[0.875rem] bg-background p-3">
        <div className="flex items-center gap-2">
          <Input
            value={text}
            onChange={(e) => setText(e.target.value)}
            aria-label="Callback value"
            className="text-base sm:text-sm"
          />
          <Button size="sm" onClick={handleClick} className="shrink-0">
            Fire
          </Button>
        </div>
        <div className="rounded-lg bg-muted p-2.5">
          <span className="block text-[.6875rem] font-semibold text-muted-foreground">Read</span>
          <span className="mt-0.5 block truncate font-mono text-sm font-semibold text-foreground">
            {triggered || '—'}
          </span>
        </div>
      </CardPanel>
    </Card>
  )
}
