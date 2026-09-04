'use client'

import * as React from 'react'
import { Card, CardPanel } from '@/registry/primitives/card'
import { Badge } from '@/registry/primitives/badge'
import { useAutoHeight } from '@/registry/hooks/animation/use-auto-height'
import { IconChevronDown, IconLayoutList } from '@tabler/icons-react'

function AccordionItem({ title, content }: { title: string; content: string }) {
  const [open, setOpen] = React.useState(false)
  const { ref, height } = useAutoHeight([open])

  return (
    <div className="overflow-hidden rounded-lg bg-muted">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between gap-2 p-2.5 text-left text-sm font-semibold text-foreground"
      >
        <span>{title}</span>
        <IconChevronDown
          className={`size-4 text-muted-foreground transition-transform duration-300 ${open ? 'rotate-180' : ''}`}
        />
      </button>
      <div style={{ height }} className="overflow-hidden transition-[height] duration-300 ease-in-out">
        <div ref={ref} className="px-2.5 pb-2.5 text-sm text-muted-foreground">
          {content}
        </div>
      </div>
    </div>
  )
}

export default function Demo() {
  return (
    <Card className="w-full max-w-md bg-muted rounded-2xl overflow-hidden">
      <div className="flex items-center justify-between gap-3 px-3 pt-1 pb-1">
        <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
          <Badge variant="secondary" className="rounded-sm aspect-square h-full! bg-transparent">
            <IconLayoutList className="size-4 text-muted-foreground" />
          </Badge>
          <span>Accordion</span>
        </div>
        <Badge variant="outline" size="sm">
          Smooth
        </Badge>
      </div>
      <CardPanel className="flex flex-col gap-2 rounded-[0.875rem] bg-background p-3">
        <AccordionItem
          title="What is the Space UI hooks registry?"
          content="A collection of 80 production-grade React hooks, flow-control components, and utilities designed for maximum performance."
        />
        <AccordionItem
          title="Does useAutoHeight cause layout shift?"
          content="No. It measures content dynamically via ResizeObserver and animates purely via CSS height transitions."
        />
      </CardPanel>
    </Card>
  )
}
