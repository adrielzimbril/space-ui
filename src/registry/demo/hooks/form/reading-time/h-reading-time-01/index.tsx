'use client'

import * as React from 'react'
import { useReadingTime, formatTime } from '@/registry/hooks/form/use-reading-time'
import { Card, CardPanel } from '@/registry/primitives/card'
import { Textarea } from '@/registry/primitives/textarea'
import { Badge } from '@/registry/primitives/badge'
import { IconBook } from '@tabler/icons-react'

const INITIAL_TEXT = `# Building High-Performance Web Applications

React hooks provide a declarative way to encapsulate reusable stateful logic into clean, modular building blocks.

By decoupling side-effects and business logic, development teams can build robust design systems and scale features reliably across applications.`

export default function Demo() {
  const [content, setContent] = React.useState(INITIAL_TEXT)
  const stats = useReadingTime(content)

  return (
    <Card className="w-full max-w-md bg-muted rounded-2xl overflow-hidden">
      <div className="flex items-center justify-between gap-3 px-3 pt-1 pb-1">
        <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
          <Badge variant="secondary" className="rounded-sm aspect-square h-full! bg-transparent">
            <IconBook className="size-4 text-muted-foreground" />
          </Badge>
          <span>Reading</span>
        </div>
        <Badge variant="outline" size="sm" className="font-mono tabular-nums">
          {formatTime(stats, 'short')}
        </Badge>
      </div>
      <CardPanel className="flex flex-col gap-3 rounded-[0.875rem] bg-background p-3">
        <Textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={4}
          className="font-mono text-base sm:text-sm resize-none leading-relaxed"
          placeholder="Type or paste content..."
          aria-label="Content to estimate"
        />
        <div className="grid grid-cols-3 gap-2">
          <div className="rounded-lg bg-muted p-2.5">
            <span className="block text-[.6875rem] font-semibold text-muted-foreground">Words</span>
            <span className="mt-0.5 block font-mono text-sm font-semibold tabular-nums text-foreground">
              {stats?.wordCount ?? 0}
            </span>
          </div>
          <div className="rounded-lg bg-muted p-2.5">
            <span className="block text-[.6875rem] font-semibold text-muted-foreground">Minutes</span>
            <span className="mt-0.5 block font-mono text-sm font-semibold tabular-nums text-foreground">
              {stats?.minutes ?? 0}m
            </span>
          </div>
          <div className="rounded-lg bg-muted p-2.5">
            <span className="block text-[.6875rem] font-semibold text-muted-foreground">Seconds</span>
            <span className="mt-0.5 block font-mono text-sm font-semibold tabular-nums text-foreground">
              {stats?.seconds ?? 0}s
            </span>
          </div>
        </div>
      </CardPanel>
    </Card>
  )
}
