'use client'

import * as React from 'react'
import { Show } from '@/registry/hooks/components/show'
import { Card, CardPanel } from '@/registry/primitives/card'
import { Button } from '@/registry/primitives/button'
import { Badge } from '@/registry/primitives/badge'
import { IconUser, IconUserX } from '@tabler/icons-react'

export default function Demo() {
  const [user, setUser] = React.useState<{ name: string; role: string } | null>({
    name: 'Adriel Zimbril',
    role: 'Product Lead',
  })

  return (
    <Card className="w-full max-w-md bg-muted rounded-2xl overflow-hidden">
      <div className="flex items-center justify-between gap-3 px-3 pt-1 pb-1">
        <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
          <Badge variant="secondary" className="rounded-sm aspect-square h-full! bg-transparent">
            {user ? (
              <IconUser className="size-4 text-muted-foreground" />
            ) : (
              <IconUserX className="size-4 text-muted-foreground" />
            )}
          </Badge>
          <span>Show</span>
        </div>
        <Badge variant={user ? 'success' : 'outline'} size="sm">
          {user ? 'In' : 'Out'}
        </Badge>
      </div>
      <CardPanel className="flex flex-col gap-3 rounded-[0.875rem] bg-background p-3">
        <div className="rounded-lg bg-muted p-2.5">
          <Show when={user} fallback={<p className="text-center text-xs text-muted-foreground">Logged out</p>}>
            {(u) => (
              <div className="flex items-center justify-between gap-3">
                <div className="min-w-0">
                  <span className="block text-[.6875rem] font-semibold text-muted-foreground">{u.role}</span>
                  <span className="mt-0.5 block truncate text-sm font-semibold text-foreground">{u.name}</span>
                </div>
                <Badge variant="secondary" size="sm">
                  Active
                </Badge>
              </div>
            )}
          </Show>
        </div>
        <Button
          size="sm"
          variant="outline"
          onClick={() => setUser(user ? null : { name: 'Adriel Zimbril', role: 'Product Lead' })}
          className="w-full"
        >
          {user ? 'Sign out' : 'Sign in'}
        </Button>
      </CardPanel>
    </Card>
  )
}
