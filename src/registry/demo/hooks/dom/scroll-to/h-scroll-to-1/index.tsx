'use client'

import * as React from 'react'
import { useScrollTo } from '@/registry/hooks/dom/use-scroll-to'
import { Card, CardPanel } from '@/registry/primitives/card'
import { Button } from '@/registry/primitives/button'
import { Badge } from '@/registry/primitives/badge'
import { IconArrowUp, IconChevronDown, IconArrowDown } from '@tabler/icons-react'

export default function Demo() {
  const containerRef = React.useRef<HTMLDivElement>(null)
  const scrollTo = useScrollTo(containerRef)
  const [activeItem, setActiveItem] = React.useState<number | null>(null)

  const handleScrollTo = (index: number) => {
    setActiveItem(index)
    scrollTo(`#scroll-item-${index}`, { block: 'center' })
  }

  const items = Array.from({ length: 10 }, (_, i) => i + 1)

  return (
    <Card className="w-full max-w-md bg-muted rounded-2xl overflow-hidden">
      <div className="flex items-center justify-between gap-3 px-3 pt-1 pb-1">
        <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
          <Badge variant="secondary" className="rounded-sm aspect-square h-full! bg-transparent">
            <IconArrowDown className="size-4 text-muted-foreground" />
          </Badge>
          <span>Scroll To</span>
        </div>
        <Badge variant="outline" size="sm" className="font-mono tabular-nums">
          {activeItem ? `#${activeItem}` : 'Idle'}
        </Badge>
      </div>
      <CardPanel className="flex flex-col gap-3 rounded-[0.875rem] bg-background p-3">
        <div className="flex flex-wrap gap-1.5">
          <Button size="sm" variant="outline" onClick={() => scrollTo.scrollToTop()}>
            <IconArrowUp className="size-3.5" />
            Scroll top
          </Button>
          <Button size="sm" variant="outline" onClick={() => handleScrollTo(5)}>
            Jump to 5
          </Button>
          <Button size="sm" variant="outline" onClick={() => handleScrollTo(9)}>
            Jump to 9
          </Button>
          <Button size="sm" variant="outline" onClick={() => scrollTo.scrollToBottom()}>
            <IconChevronDown className="size-3.5" />
            Scroll bottom
          </Button>
        </div>
        <div ref={containerRef} className="h-44 space-y-2 overflow-y-auto rounded-lg bg-muted p-2 scroll-smooth">
          {items.map((num) => {
            const isSelected = activeItem === num
            return (
              <div
                id={`scroll-item-${num}`}
                key={num}
                onClick={() => setActiveItem(num)}
                className={`flex cursor-pointer items-center justify-between rounded-lg p-2.5 text-xs ${
                  isSelected ? 'bg-background font-semibold text-foreground' : 'text-muted-foreground'
                }`}
              >
                <span>Section {num}</span>
                <span className="font-mono tabular-nums">#{num}</span>
              </div>
            )
          })}
        </div>
      </CardPanel>
    </Card>
  )
}
