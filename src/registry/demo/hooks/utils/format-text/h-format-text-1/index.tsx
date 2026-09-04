'use client'

import * as React from 'react'
import { truncateText, randomWord } from '@/registry/utils/format-text'
import { Card, CardPanel } from '@/registry/primitives/card'
import { Badge } from '@/registry/primitives/badge'
import { Input } from '@/registry/primitives/input'
import { IconTypography } from '@tabler/icons-react'

export default function Demo() {
  const [str, setStr] = React.useState('Hello Beautiful World from Space UI')

  return (
    <Card className="w-full max-w-md bg-muted rounded-2xl overflow-hidden">
      <div className="flex items-center justify-between gap-3 px-3 pt-1 pb-1">
        <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
          <Badge variant="secondary" className="rounded-sm aspect-square h-full! bg-transparent">
            <IconTypography className="size-4 text-muted-foreground" />
          </Badge>
          <span>Text</span>
        </div>
        <Badge variant="outline" size="sm">
          Tools
        </Badge>
      </div>
      <CardPanel className="flex flex-col gap-3 rounded-[0.875rem] bg-background p-3">
        <Input
          value={str}
          onChange={(e) => setStr(e.target.value)}
          className="text-base sm:text-sm"
          aria-label="Text to format"
        />
        <div className="flex flex-col gap-2">
          <div className="rounded-lg bg-muted p-2.5">
            <span className="block text-[.6875rem] font-semibold text-muted-foreground">10 chars</span>
            <span className="mt-0.5 block truncate font-mono text-sm font-semibold text-foreground">
              {truncateText(str, { maxLength: 10 })}
            </span>
          </div>
          <div className="rounded-lg bg-muted p-2.5">
            <span className="block text-[.6875rem] font-semibold text-muted-foreground">3 words</span>
            <span className="mt-0.5 block truncate font-mono text-sm font-semibold text-foreground">
              {truncateText(str, { type: 'word', maxLength: 3 })}
            </span>
          </div>
          <div className="rounded-lg bg-muted p-2.5">
            <span className="block text-[.6875rem] font-semibold text-muted-foreground">Random</span>
            <span className="mt-0.5 block font-mono text-sm font-semibold text-foreground">
              {randomWord({ casing: 'capitalize' })}
            </span>
          </div>
        </div>
      </CardPanel>
    </Card>
  )
}
