'use client'

import * as React from 'react'
import { Switch, Case, Default } from '@/registry/hooks/components/switch'
import { Card, CardPanel } from '@/registry/primitives/card'
import { Button } from '@/registry/primitives/button'
import { Badge } from '@/registry/primitives/badge'
import { IconSwitchHorizontal } from '@tabler/icons-react'

export default function Demo() {
  const [tab, setTab] = React.useState<'home' | 'profile' | 'settings'>('home')

  return (
    <Card className="w-full max-w-md bg-muted rounded-2xl overflow-hidden">
      <div className="flex items-center justify-between gap-3 px-3 pt-1 pb-1">
        <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
          <Badge variant="secondary" className="rounded-sm aspect-square h-full! bg-transparent">
            <IconSwitchHorizontal className="size-4 text-muted-foreground" />
          </Badge>
          <span>Switch</span>
        </div>
        <Badge variant="outline" size="sm" className="capitalize">
          {tab}
        </Badge>
      </div>
      <CardPanel className="flex flex-col gap-3 rounded-[0.875rem] bg-background p-3">
        <div className="flex gap-1.5">
          <Button
            size="sm"
            variant={tab === 'home' ? 'default' : 'outline'}
            onClick={() => setTab('home')}
            className="flex-1"
          >
            Home
          </Button>
          <Button
            size="sm"
            variant={tab === 'profile' ? 'default' : 'outline'}
            onClick={() => setTab('profile')}
            className="flex-1"
          >
            Profile
          </Button>
          <Button
            size="sm"
            variant={tab === 'settings' ? 'default' : 'outline'}
            onClick={() => setTab('settings')}
            className="flex-1"
          >
            Settings
          </Button>
        </div>
        <div className="rounded-lg bg-muted p-2.5 text-center">
          <Switch>
            <Case condition={tab === 'home'}>
              <p className="text-sm font-semibold text-foreground">Dashboard overview</p>
            </Case>
            <Case condition={tab === 'profile'}>
              <p className="text-sm font-semibold text-foreground">Profile details</p>
            </Case>
            <Default>
              <p className="text-sm font-semibold text-foreground">Preferences</p>
            </Default>
          </Switch>
        </div>
      </CardPanel>
    </Card>
  )
}
