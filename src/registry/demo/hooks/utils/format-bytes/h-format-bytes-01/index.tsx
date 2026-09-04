'use client'

import * as React from 'react'
import { formatBytes, parseBytes } from '@/registry/utils/format-bytes'
import { Card, CardPanel } from '@/registry/primitives/card'
import { Badge } from '@/registry/primitives/badge'
import { Input } from '@/registry/primitives/input'
import { IconBinaryTree } from '@tabler/icons-react'

interface DemoProps {
  decimals?: number
}

export default function Demo({ decimals = 2 }: DemoProps) {
  const [str, setStr] = React.useState('15.5MB')
  const bytes = parseBytes(str)

  return (
    <Card className="w-full max-w-md bg-muted rounded-2xl overflow-hidden">
      <div className="flex items-center justify-between gap-3 px-3 pt-1 pb-1">
        <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
          <Badge variant="secondary" className="rounded-sm aspect-square h-full! bg-transparent">
            <IconBinaryTree className="size-4 text-muted-foreground" />
          </Badge>
          <span>Bytes</span>
        </div>
        <Badge variant="outline" size="sm" className="font-mono tabular-nums">
          {decimals}
        </Badge>
      </div>
      <CardPanel className="flex flex-col gap-3 rounded-[0.875rem] bg-background p-3">
        <Input
          value={str}
          onChange={(e) => setStr(e.target.value)}
          placeholder="e.g. 50MB, 1.2GB..."
          className="font-mono text-base sm:text-sm"
          aria-label="Byte string"
        />
        <div className="grid grid-cols-2 gap-2">
          <div className="rounded-lg bg-muted p-2.5">
            <span className="block text-[.6875rem] font-semibold text-muted-foreground">Raw</span>
            <span className="mt-0.5 block truncate font-mono text-sm font-semibold tabular-nums text-foreground">
              {bytes.toLocaleString()} B
            </span>
          </div>
          <div className="rounded-lg bg-muted p-2.5">
            <span className="block text-[.6875rem] font-semibold text-muted-foreground">Formatted</span>
            <span className="mt-0.5 block truncate font-mono text-sm font-semibold tabular-nums text-foreground">
              {formatBytes(bytes, { decimals })}
            </span>
          </div>
        </div>
      </CardPanel>
    </Card>
  )
}
