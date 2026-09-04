'use client'

import { IconBolt, IconBrain, IconFlask } from '@tabler/icons-react'
import { useState } from 'react'
import { Badge } from '@/registry/primitives/badge'

import { cn } from '@/registry/lib/utils'
import { Button } from '@/registry/primitives/button'
import { Group } from '@/registry/primitives/group'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/registry/primitives/tooltip'
const models = [
  {
    id: 'gpt4o',
    label: 'GPT-4o',
    badge: 'Fast',
    badgeVariant: 'success' as const,
    tooltip: '128k context, fastest response',
    icon: <IconBolt aria-hidden="true" />,
  },
  {
    id: 'claude',
    label: 'Claude',
    badge: 'Pro',
    badgeVariant: 'info' as const,
    tooltip: '200k context, best for analysis',
    icon: <IconBrain aria-hidden="true" />,
  },
  {
    id: 'gemini',
    label: 'Gemini',
    badge: 'Preview',
    badgeVariant: 'warning' as const,
    tooltip: '1M context, experimental',
    icon: <IconFlask aria-hidden="true" />,
  },
]

export default function Pattern() {
  const [active, setActive] = useState('claude')

  return (
    <Group>
      {models.map((model) => (
        <Tooltip key={model.id}>
          <TooltipTrigger
            render={
              <Button
                variant="outline"
                className={cn(active === model.id ? 'bg-muted' : '')}
                onClick={() => setActive(model.id)}
              >
                {model.icon}
                {model.label}
                <Badge variant={model.badgeVariant} size="sm">
                  {model.badge}
                </Badge>
              </Button>
            }
          />
          <TooltipContent>{model.tooltip}</TooltipContent>
        </Tooltip>
      ))}
    </Group>
  )
}
