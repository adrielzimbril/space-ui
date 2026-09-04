'use client'

import * as React from 'react'
import { useCharacterLimit } from '@/registry/hooks/form/use-character-limit'
import { Card, CardPanel } from '@/registry/primitives/card'
import { Badge } from '@/registry/primitives/badge'
import { Textarea } from '@/registry/primitives/textarea'
import { Progress } from '@/registry/primitives/progress'
import { IconAbc } from '@tabler/icons-react'

interface DemoProps {
  maxLength?: number
}

export default function Demo({ maxLength = 80 }: DemoProps) {
  const { value, remaining, isExceeded, handleChange } = useCharacterLimit({
    maxLength,
    initialValue: 'Space UI provides production-ready React hooks.',
  })
  const percentage = Math.min(100, Math.round((value.length / maxLength) * 100))

  return (
    <Card className="w-full max-w-md bg-muted rounded-2xl overflow-hidden">
      <div className="flex items-center justify-between gap-3 px-3 pt-1 pb-1">
        <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
          <Badge variant="secondary" className="rounded-sm aspect-square h-full! bg-transparent">
            <IconAbc className="size-4 text-muted-foreground" />
          </Badge>
          <span>Limit</span>
        </div>
        <Badge variant={isExceeded ? 'destructive' : 'outline'} size="sm" className="font-mono tabular-nums">
          {remaining}
        </Badge>
      </div>
      <CardPanel className="flex flex-col gap-3 rounded-[0.875rem] bg-background p-3">
        <Textarea
          value={value}
          onChange={handleChange}
          rows={3}
          className="text-base sm:text-sm resize-none"
          placeholder="Type something..."
          aria-label="Limited text"
        />
        <div className="flex flex-col gap-1.5">
          <div className="flex justify-between text-[.6875rem] font-semibold text-muted-foreground">
            <span>Capacity</span>
            <span className="font-mono tabular-nums">{percentage}%</span>
          </div>
          <Progress value={percentage} />
        </div>
      </CardPanel>
    </Card>
  )
}
