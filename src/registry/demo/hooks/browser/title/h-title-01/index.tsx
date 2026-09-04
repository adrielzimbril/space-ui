'use client'

import * as React from 'react'
import { useTitle } from '@/registry/hooks/browser/use-title'
import { Card, CardPanel } from '@/registry/primitives/card'
import { Badge } from '@/registry/primitives/badge'
import { Input } from '@/registry/primitives/input'
import { IconTypography } from '@tabler/icons-react'

export default function Demo() {
  const [title, setTitle] = React.useState('Space UI Hooks')
  useTitle(title)

  return (
    <Card className="w-full max-w-md bg-muted rounded-2xl overflow-hidden">
      <div className="flex items-center justify-between gap-3 px-3 pt-1 pb-1">
        <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
          <Badge variant="secondary" className="rounded-sm aspect-square h-full! bg-transparent">
            <IconTypography className="size-4 text-muted-foreground" />
          </Badge>
          <span>Title</span>
        </div>
        <Badge variant="outline" size="sm">
          Active
        </Badge>
      </div>
      <CardPanel className="flex flex-col gap-3 rounded-[0.875rem] bg-background p-3">
        <Input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Space UI Hooks"
          aria-label="Document title"
          className="text-base sm:text-sm"
        />
      </CardPanel>
    </Card>
  )
}
