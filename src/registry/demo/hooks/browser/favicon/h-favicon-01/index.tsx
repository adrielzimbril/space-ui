'use client'

import * as React from 'react'
import { useFavicon } from '@/registry/hooks/browser/use-favicon'
import { Card, CardPanel } from '@/registry/primitives/card'
import { Button } from '@/registry/primitives/button'
import { Badge } from '@/registry/primitives/badge'
import { IconStar } from '@tabler/icons-react'

export default function Demo() {
  const [icon, setIcon] = React.useState('⚡')
  useFavicon(
    `data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>${icon}</text></svg>`,
  )

  const emojis = [
    { label: 'Rocket', emoji: '🚀' },
    { label: 'Star', emoji: '⭐' },
    { label: 'Fire', emoji: '🔥' },
    { label: 'Bolt', emoji: '⚡' },
  ]

  return (
    <Card className="w-full max-w-md bg-muted rounded-2xl overflow-hidden">
      <div className="flex items-center justify-between gap-3 px-3 pt-1 pb-1">
        <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
          <Badge variant="secondary" className="rounded-sm aspect-square h-full! bg-transparent">
            <IconStar className="size-4 text-muted-foreground" />
          </Badge>
          <span>Favicon</span>
        </div>
        <Badge variant="outline" size="sm">
          {icon}
        </Badge>
      </div>
      <CardPanel className="grid grid-cols-4 gap-2 rounded-[0.875rem] bg-background p-3">
        {emojis.map((item) => (
          <Button
            key={item.emoji}
            size="sm"
            variant={icon === item.emoji ? 'default' : 'outline'}
            onClick={() => setIcon(item.emoji)}
            aria-label={item.label}
          >
            {item.emoji}
          </Button>
        ))}
      </CardPanel>
    </Card>
  )
}
