'use client'

import * as React from 'react'
import { useScrollDevice } from '@/registry/hooks/dom/use-scroll-device'
import { Card, CardPanel } from '@/registry/primitives/card'
import { Badge } from '@/registry/primitives/badge'
import {
  IconArrowUp,
  IconChevronDown,
  IconArrowLeft,
  IconArrowRight,
  IconArrowUpRight,
  IconArrowUpLeft,
  IconArrowDownLeft,
  IconArrowDownRight,
  IconPointer,
} from '@tabler/icons-react'

export default function Demo() {
  const { device, direction, isScrolling } = useScrollDevice({
    threshold: 2,
    idleTimeout: 300,
  })

  const cells = [
    { key: 'up-left', label: 'NW', icon: IconArrowUpLeft },
    { key: 'up', label: 'N', icon: IconArrowUp },
    { key: 'up-right', label: 'NE', icon: IconArrowUpRight },
    { key: 'left', label: 'W', icon: IconArrowLeft },
    { key: 'center', label: 'IDLE', icon: null },
    { key: 'right', label: 'E', icon: IconArrowRight },
    { key: 'down-left', label: 'SW', icon: IconArrowDownLeft },
    { key: 'down', label: 'S', icon: IconChevronDown },
    { key: 'down-right', label: 'SE', icon: IconArrowDownRight },
  ]

  return (
    <Card className="w-full max-w-md bg-muted rounded-2xl overflow-hidden">
      <div className="flex items-center justify-between gap-3 px-3 pt-1 pb-1">
        <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
          <Badge variant="secondary" className="rounded-sm aspect-square h-full! bg-transparent">
            <IconPointer className="size-4 text-muted-foreground" />
          </Badge>
          <span>Direction</span>
        </div>
        <Badge variant={isScrolling ? 'default' : 'outline'} size="sm">
          {isScrolling ? device || 'Scrolling' : 'Idle'}
        </Badge>
      </div>
      <CardPanel className="rounded-[0.875rem] bg-background p-3">
        <div className="grid grid-cols-3 gap-1.5">
          {cells.map(({ key, label, icon: Icon }) => {
            const isActive = direction === key
            return (
              <div
                key={key}
                className={`flex flex-col items-center justify-center rounded-lg py-2.5 text-xs ${
                  isActive ? 'bg-foreground text-background' : 'bg-muted text-muted-foreground'
                }`}
              >
                {Icon ? <Icon className="mb-0.5 size-4" /> : null}
                <span className="font-mono text-[10px]">{label}</span>
              </div>
            )
          })}
        </div>
      </CardPanel>
    </Card>
  )
}
