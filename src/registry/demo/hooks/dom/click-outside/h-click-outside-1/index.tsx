'use client'

import * as React from 'react'
import { useClickOutside } from '@/registry/hooks/dom/use-click-outside'
import { Card, CardPanel } from '@/registry/primitives/card'
import { Button } from '@/registry/primitives/button'
import { Badge } from '@/registry/primitives/badge'
import { IconPointer, IconX } from '@tabler/icons-react'

export default function Demo() {
  const [isOpen, setIsOpen] = React.useState(false)
  const ref = React.useRef<HTMLDivElement>(null)
  useClickOutside(ref, () => setIsOpen(false))

  return (
    <Card className="w-full max-w-md bg-muted rounded-2xl overflow-hidden">
      <div className="flex items-center justify-between gap-3 px-3 pt-1 pb-1">
        <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
          <Badge variant="secondary" className="rounded-sm aspect-square h-full! bg-transparent">
            <IconPointer className="size-4 text-muted-foreground" />
          </Badge>
          <span>Outside</span>
        </div>
        <Badge variant={isOpen ? 'success' : 'outline'} size="sm">
          {isOpen ? 'Open' : 'Closed'}
        </Badge>
      </div>
      <CardPanel className="flex flex-col gap-3 rounded-[0.875rem] bg-background p-3">
        <Button
          onClick={() => setIsOpen((prev) => !prev)}
          variant={isOpen ? 'secondary' : 'default'}
          className="w-full"
        >
          {isOpen ? 'Close' : 'Open'}
        </Button>
        {isOpen && (
          <div ref={ref} className="flex items-center justify-between rounded-lg bg-muted p-2.5">
            <span className="text-sm font-semibold text-foreground">Panel</span>
            <Button variant="ghost" size="icon-xs" onClick={() => setIsOpen(false)} aria-label="Close">
              <IconX className="size-4" />
            </Button>
          </div>
        )}
      </CardPanel>
    </Card>
  )
}
