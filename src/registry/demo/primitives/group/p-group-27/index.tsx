'use client'

import { useState } from 'react'

import { cn } from '@/registry/lib/utils'
import { Button } from '@/registry/primitives/button'
import { Group } from '@/registry/primitives/group'

export default function Pattern() {
  const [rating, setRating] = useState<number | null>(null)

  return (
    <div className="space-y-3">
      <p className="text-sm font-medium">How likely are you to recommend us?</p>
      <Group>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => (
          <Button
            key={n}
            variant="outline"
            size="icon-sm"
            onClick={() => setRating(n)}
            className={cn(
              rating === n &&
                'bg-primary hover:bg-primary hover:text-primary-foreground hover:border-primary text-primary-foreground border-primary',
            )}
          >
            {n}
          </Button>
        ))}
      </Group>
      <div className="text-muted-foreground flex justify-between text-xs">
        <span>Not likely</span>
        <span>Very likely</span>
      </div>
    </div>
  )
}
