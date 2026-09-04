'use client'

import * as React from 'react'
import { useControlledState } from '@/registry/hooks/animation/use-controlled-state'
import { Card, CardPanel } from '@/registry/primitives/card'
import { Button } from '@/registry/primitives/button'
import { Badge } from '@/registry/primitives/badge'
import { Switch } from '@/registry/primitives/switch'
import { IconPower } from '@tabler/icons-react'

export default function Demo() {
  const [val, setVal] = useControlledState({ defaultProp: 'Off', prop: undefined })
  const isChecked = val === 'On'

  return (
    <Card className="w-full max-w-md bg-muted rounded-2xl overflow-hidden">
      <div className="flex items-center justify-between gap-3 px-3 pt-1 pb-1">
        <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
          <Badge variant="secondary" className="rounded-sm aspect-square h-full! bg-transparent">
            <IconPower className="size-4 text-muted-foreground" />
          </Badge>
          <span>Controlled</span>
        </div>
        <Badge variant={isChecked ? 'default' : 'outline'} size="sm">
          {val}
        </Badge>
      </div>
      <CardPanel className="flex items-center justify-between rounded-[0.875rem] bg-background p-3">
        <Button
          size="sm"
          variant={isChecked ? 'secondary' : 'default'}
          onClick={() => setVal((v) => (v === 'Off' ? 'On' : 'Off'))}
        >
          Toggle
        </Button>
        <Switch checked={isChecked} onCheckedChange={(c) => setVal(c ? 'On' : 'Off')} aria-label="Toggle power" />
      </CardPanel>
    </Card>
  )
}
