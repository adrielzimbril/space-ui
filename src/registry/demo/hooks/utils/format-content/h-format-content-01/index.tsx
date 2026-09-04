'use client'

import * as React from 'react'
import { slugifyHeadline } from '@/registry/utils/format-content'
import { Card, CardPanel } from '@/registry/primitives/card'
import { Badge } from '@/registry/primitives/badge'
import { Input } from '@/registry/primitives/input'
import { IconLink } from '@tabler/icons-react'

export default function Demo() {
  const [text, setText] = React.useState('Space UI provides modern React components and hooks.')

  return (
    <Card className="w-full max-w-md bg-muted rounded-2xl overflow-hidden">
      <div className="flex items-center justify-between gap-3 px-3 pt-1 pb-1">
        <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
          <Badge variant="secondary" className="rounded-sm aspect-square h-full! bg-transparent">
            <IconLink className="size-4 text-muted-foreground" />
          </Badge>
          <span>Slug</span>
        </div>
        <Badge variant="outline" size="sm">
          URL
        </Badge>
      </div>
      <CardPanel className="flex flex-col gap-3 rounded-[0.875rem] bg-background p-3">
        <Input
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="text-base sm:text-sm"
          aria-label="Headline to slugify"
        />
        <div className="rounded-lg bg-muted p-2.5">
          <span className="block text-[.6875rem] font-semibold text-muted-foreground">Slug</span>
          <span className="mt-0.5 block truncate font-mono text-sm font-semibold text-foreground">
            /{slugifyHeadline(text)}
          </span>
        </div>
      </CardPanel>
    </Card>
  )
}
