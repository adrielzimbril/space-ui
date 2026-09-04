'use client'

import * as React from 'react'
import { useLocalStorage } from '@/registry/hooks/browser/use-local-storage'
import { Card, CardPanel } from '@/registry/primitives/card'
import { Badge } from '@/registry/primitives/badge'
import { Input } from '@/registry/primitives/input'
import { IconUser } from '@tabler/icons-react'

export default function Demo() {
  const [user, setUser] = useLocalStorage('space_demo_user', { username: 'alex', role: 'developer' })

  return (
    <Card className="w-full max-w-md bg-muted rounded-2xl overflow-hidden">
      <div className="flex items-center justify-between gap-3 px-3 pt-1 pb-1">
        <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
          <Badge variant="secondary" className="rounded-sm aspect-square h-full! bg-transparent">
            <IconUser className="size-4 text-muted-foreground" />
          </Badge>
          <span>Profile</span>
        </div>
        <Badge variant="outline" size="sm">
          Synced
        </Badge>
      </div>
      <CardPanel className="flex flex-col gap-3 rounded-[0.875rem] bg-background p-3">
        <div>
          <span className="mb-1 block text-[.6875rem] font-semibold text-muted-foreground">Username</span>
          <Input
            value={user.username}
            onChange={(e) => setUser({ ...user, username: e.target.value })}
            placeholder="alex"
            aria-label="Username"
            className="text-base sm:text-sm"
          />
        </div>
        <div>
          <span className="mb-1 block text-[.6875rem] font-semibold text-muted-foreground">Role</span>
          <Input
            value={user.role}
            onChange={(e) => setUser({ ...user, role: e.target.value })}
            placeholder="developer"
            aria-label="Role"
            className="text-base sm:text-sm"
          />
        </div>
        <div className="rounded-lg bg-muted p-2.5">
          <span className="block text-[.6875rem] font-semibold text-muted-foreground">Stored</span>
          <pre className="mt-0.5 overflow-x-auto font-mono text-sm font-semibold text-foreground">
            {JSON.stringify(user, null, 2)}
          </pre>
        </div>
      </CardPanel>
    </Card>
  )
}
