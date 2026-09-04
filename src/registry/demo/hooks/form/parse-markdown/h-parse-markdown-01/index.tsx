'use client'

import * as React from 'react'
import { useParseMarkdown } from '@/registry/hooks/form/use-parse-markdown'
import { Card, CardPanel } from '@/registry/primitives/card'
import { Badge } from '@/registry/primitives/badge'
import { Textarea } from '@/registry/primitives/textarea'
import { IconMarkdown } from '@tabler/icons-react'

export default function Demo() {
  const [md, setMd] = React.useState('## Space UI\n- High performance\n- Type-safe')
  const html = useParseMarkdown(md)

  return (
    <Card className="w-full max-w-md bg-muted rounded-2xl overflow-hidden">
      <div className="flex items-center justify-between gap-3 px-3 pt-1 pb-1">
        <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
          <Badge variant="secondary" className="rounded-sm aspect-square h-full! bg-transparent">
            <IconMarkdown className="size-4 text-muted-foreground" />
          </Badge>
          <span>Markdown</span>
        </div>
        <Badge variant="outline" size="sm">
          Active
        </Badge>
      </div>
      <CardPanel className="flex flex-col gap-3 rounded-[0.875rem] bg-background p-3">
        <Textarea
          value={md}
          onChange={(e) => setMd(e.target.value)}
          rows={2}
          className="font-mono text-base sm:text-sm resize-none"
          placeholder="Type markdown..."
          aria-label="Markdown source"
        />
        <div className="rounded-lg bg-muted p-2.5">
          <span className="block text-[.6875rem] font-semibold text-muted-foreground">HTML</span>
          <span className="mt-0.5 block break-all font-mono text-sm font-semibold text-foreground">{html}</span>
        </div>
      </CardPanel>
    </Card>
  )
}
