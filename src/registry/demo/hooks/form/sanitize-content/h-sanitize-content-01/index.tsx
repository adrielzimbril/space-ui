'use client'

import * as React from 'react'
import { useSanitizeContent } from '@/registry/hooks/form/use-sanitize-content'
import { Card, CardPanel } from '@/registry/primitives/card'
import { Badge } from '@/registry/primitives/badge'
import { Textarea } from '@/registry/primitives/textarea'
import { IconShieldCheck } from '@tabler/icons-react'

export default function Demo() {
  const [raw, setRaw] = React.useState('<p>Hello <strong>World</strong>!</p><script>alert("XSS")</script>')
  const clean = useSanitizeContent(raw)

  return (
    <Card className="w-full max-w-md bg-muted rounded-2xl overflow-hidden">
      <div className="flex items-center justify-between gap-3 px-3 pt-1 pb-1">
        <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
          <Badge variant="secondary" className="rounded-sm aspect-square h-full! bg-transparent">
            <IconShieldCheck className="size-4 text-muted-foreground" />
          </Badge>
          <span>Sanitize</span>
        </div>
        <Badge variant="success" size="sm">
          Protected
        </Badge>
      </div>
      <CardPanel className="flex flex-col gap-3 rounded-[0.875rem] bg-background p-3">
        <Textarea
          value={raw}
          onChange={(e) => setRaw(e.target.value)}
          rows={2}
          className="font-mono text-base sm:text-sm resize-none"
          aria-label="Raw HTML"
        />
        <div className="rounded-lg bg-muted p-2.5">
          <span className="block text-[.6875rem] font-semibold text-muted-foreground">Output</span>
          <span className="mt-0.5 block break-all font-mono text-sm font-semibold text-foreground">{clean}</span>
        </div>
      </CardPanel>
    </Card>
  )
}
