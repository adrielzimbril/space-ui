'use client'

import * as React from 'react'
import { isNegative } from '@/registry/utils/is-negative'
import { Card, CardPanel } from '@/registry/primitives/card'
import { Badge } from '@/registry/primitives/badge'
import { Input } from '@/registry/primitives/input'
import { IconMath } from '@tabler/icons-react'

export default function Demo() {
  const [num, setNum] = React.useState('-42')
  const isNeg = isNegative(Number(num))

  return (
    <Card className="w-full max-w-md bg-muted rounded-2xl overflow-hidden">
      <div className="flex items-center justify-between gap-3 px-3 pt-1 pb-1">
        <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
          <Badge variant="secondary" className="rounded-sm aspect-square h-full! bg-transparent">
            <IconMath className="size-4 text-muted-foreground" />
          </Badge>
          <span>Sign</span>
        </div>
        <Badge variant={isNeg ? 'destructive' : 'outline'} size="sm">
          {isNeg ? 'Negative' : 'Positive'}
        </Badge>
      </div>
      <CardPanel className="flex items-center gap-2 rounded-[0.875rem] bg-background p-3">
        <Input
          value={num}
          onChange={(e) => setNum(e.target.value)}
          className="font-mono text-base sm:text-sm"
          placeholder="0"
          aria-label="Number to check"
        />
        <Badge variant={isNeg ? 'destructive' : 'default'} size="sm" className="shrink-0">
          {isNeg ? 'Negative' : 'Positive / Zero'}
        </Badge>
      </CardPanel>
    </Card>
  )
}
