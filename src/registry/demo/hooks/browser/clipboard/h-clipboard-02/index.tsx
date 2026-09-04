'use client'

import * as React from 'react'
import { Card, CardPanel } from '@/registry/primitives/card'
import { Badge } from '@/registry/primitives/badge'
import { Button } from '@/registry/primitives/button'
import { useClipboard } from '@/registry/hooks/browser/use-clipboard'
import { IconCheck, IconCopy, IconFileCode2 } from '@tabler/icons-react'

export default function Demo() {
  const code = `import { useClipboard } from '@/hooks/use-clipboard'

export function Example() {
  const { copy, copied } = useClipboard({ timeout: 1500 })
  return <button onClick={() => copy('Hello')}>{copied ? 'Copied' : 'Copy'}</button>
}`
  const { copy, copied } = useClipboard({ timeout: 1500 })

  return (
    <Card className="w-full max-w-md bg-muted rounded-2xl overflow-hidden">
      <div className="flex items-center justify-between gap-3 px-3 pt-1 pb-1">
        <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
          <Badge variant="secondary" className="rounded-sm aspect-square h-full! bg-transparent">
            <IconFileCode2 className="size-4 text-muted-foreground" />
          </Badge>
          <span className="font-mono text-xs">example.tsx</span>
        </div>
        <Button
          size="sm"
          variant="ghost"
          onClick={() => copy(code)}
          className="bg-background hover:bg-background text-muted-foreground hover:text-foreground"
          aria-label={copied ? 'Copied' : 'Copy code'}
        >
          {copied ? <IconCheck className="size-3.5" /> : <IconCopy className="size-3.5" />}
          {copied ? 'Copied' : 'Copy'}
        </Button>
      </div>
      <CardPanel className="rounded-[0.875rem] bg-background p-3">
        <pre className="overflow-x-auto font-mono text-[.8125rem] leading-relaxed text-foreground">{code}</pre>
      </CardPanel>
    </Card>
  )
}
