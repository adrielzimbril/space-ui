'use client'

import * as React from 'react'
import { useCharacterLimit } from '@/registry/hooks/form/use-character-limit'
import { Card, CardPanel } from '@/registry/primitives/card'
import { Badge } from '@/registry/primitives/badge'
import { Textarea } from '@/registry/primitives/textarea'
import { Button } from '@/registry/primitives/button'
import { Progress } from '@/registry/primitives/progress'
import { IconSend, IconMessageCircle } from '@tabler/icons-react'

export default function Demo() {
  const { value, remaining, isExceeded, handleChange } = useCharacterLimit({
    maxLength: 140,
    initialValue: 'Just shipped a brand new design system with Space UI hooks!',
  })
  const percentage = Math.min(100, Math.round((value.length / 140) * 100))

  return (
    <Card className="w-full max-w-md bg-muted rounded-2xl overflow-hidden">
      <div className="flex items-center justify-between gap-3 px-3 pt-1 pb-1">
        <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
          <Badge variant="secondary" className="rounded-sm aspect-square h-full! bg-transparent">
            <IconMessageCircle className="size-4 text-muted-foreground" />
          </Badge>
          <span>Composer</span>
        </div>
        <Badge variant={isExceeded ? 'destructive' : 'outline'} size="sm" className="font-mono tabular-nums">
          {remaining}
        </Badge>
      </div>
      <CardPanel className="flex flex-col gap-3 rounded-[0.875rem] bg-background p-3">
        <Textarea
          value={value}
          onChange={handleChange}
          rows={3}
          placeholder="What is happening?!"
          className="text-base sm:text-sm resize-none"
          aria-label="Post content"
        />
        <div className="flex items-center justify-between gap-3">
          <Progress value={percentage} className="flex-1" />
          <Button size="sm" disabled={isExceeded || value.trim().length === 0} className="shrink-0">
            <IconSend className="size-3.5" />
            Post
          </Button>
        </div>
      </CardPanel>
    </Card>
  )
}
