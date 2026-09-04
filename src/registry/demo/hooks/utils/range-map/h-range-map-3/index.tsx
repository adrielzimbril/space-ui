'use client'

import * as React from 'react'
import { Button } from '@/registry/primitives/button'
import { Card, CardPanel } from '@/registry/primitives/card'
import { Badge } from '@/registry/primitives/badge'
import { range } from '@/registry/utils/range-map'
import { IconStar } from '@tabler/icons-react'

export default function Demo() {
  const stars = range(5)
  const [rating, setRating] = React.useState(3)

  return (
    <Card className="w-full max-w-md bg-muted rounded-2xl overflow-hidden">
      <div className="flex items-center justify-between gap-3 px-3 pt-1 pb-1">
        <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
          <Badge variant="secondary" className="rounded-sm aspect-square h-full! bg-transparent">
            <IconStar className="size-4 text-muted-foreground" />
          </Badge>
          <span>Stars</span>
        </div>
        <Badge variant="outline" size="sm" className="font-mono tabular-nums">
          {rating} / 5
        </Badge>
      </div>
      <CardPanel className="flex items-center justify-between rounded-[0.875rem] bg-background p-3">
        <div className="flex gap-1">
          {stars.map((i) => (
            <Button
              key={i}
              size="icon-sm"
              variant="ghost"
              onClick={() => setRating(i + 1)}
              aria-label={`Rate ${i + 1}`}
              className={i < rating ? 'text-foreground' : 'text-muted-foreground/30'}
            >
              <IconStar className="size-5" fill={i < rating ? 'currentColor' : 'none'} />
            </Button>
          ))}
        </div>
        <span className="font-mono text-xs tabular-nums text-muted-foreground">{rating} / 5</span>
      </CardPanel>
    </Card>
  )
}
