'use client'

import * as React from 'react'
import { calculateReadingTime, formatTime } from '@/registry/hooks/form/use-reading-time'
import { Card, CardPanel } from '@/registry/primitives/card'
import { Badge } from '@/registry/primitives/badge'
import { Textarea } from '@/registry/primitives/textarea'
import { IconArticle } from '@tabler/icons-react'

export default function Demo() {
  const [content, setContent] = React.useState(
    'React hooks let you use state and other React features in functional components. They provide a cleaner way to reuse stateful logic.',
  )
  const result = calculateReadingTime({ content })

  return (
    <Card className="w-full max-w-md bg-muted rounded-2xl overflow-hidden">
      <div className="flex items-center justify-between gap-3 px-3 pt-1 pb-1">
        <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
          <Badge variant="secondary" className="rounded-sm aspect-square h-full! bg-transparent">
            <IconArticle className="size-4 text-muted-foreground" />
          </Badge>
          <span>Metrics</span>
        </div>
        <Badge variant="outline" size="sm" className="font-mono tabular-nums">
          {formatTime(result.time, 'short')}
        </Badge>
      </div>
      <CardPanel className="flex flex-col gap-3 rounded-[0.875rem] bg-background p-3">
        <Textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={3}
          className="text-base sm:text-sm resize-none"
          aria-label="Content to measure"
        />
        <div className="grid grid-cols-3 gap-2">
          <div className="rounded-lg bg-muted p-2.5">
            <span className="block text-[.6875rem] font-semibold text-muted-foreground">Time</span>
            <span className="mt-0.5 block font-mono text-sm font-semibold tabular-nums text-foreground">
              {formatTime(result.time, 'short')}
            </span>
          </div>
          <div className="rounded-lg bg-muted p-2.5">
            <span className="block text-[.6875rem] font-semibold text-muted-foreground">Words</span>
            <span className="mt-0.5 block font-mono text-sm font-semibold tabular-nums text-foreground">
              {result.words}
            </span>
          </div>
          <div className="rounded-lg bg-muted p-2.5">
            <span className="block text-[.6875rem] font-semibold text-muted-foreground">Chars</span>
            <span className="mt-0.5 block font-mono text-sm font-semibold tabular-nums text-foreground">
              {content.length}
            </span>
          </div>
        </div>
      </CardPanel>
    </Card>
  )
}
