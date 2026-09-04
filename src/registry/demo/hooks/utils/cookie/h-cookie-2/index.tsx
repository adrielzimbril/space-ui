'use client'

import * as React from 'react'
import { getCookies, setCookie, deleteCookie } from '@/registry/utils/cookie'
import { Button } from '@/registry/primitives/button'
import { Badge } from '@/registry/primitives/badge'
import { Card, CardPanel } from '@/registry/primitives/card'
import { IconCookie } from '@tabler/icons-react'

export default function Demo() {
  const [cookies, setCookies] = React.useState<Record<string, any>>({})

  const refresh = () => setCookies(getCookies(['demo_color', 'demo_visits']))

  return (
    <Card className="w-full max-w-md bg-muted rounded-2xl overflow-hidden">
      <div className="flex items-center justify-between gap-3 px-3 pt-1 pb-1">
        <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
          <Badge variant="secondary" className="rounded-sm aspect-square h-full! bg-transparent">
            <IconCookie className="size-4 text-muted-foreground" />
          </Badge>
          <span>Cookies</span>
        </div>
        <Badge variant={Object.keys(cookies).length > 0 ? 'success' : 'outline'} size="sm">
          {Object.keys(cookies).length > 0 ? 'Set' : 'Empty'}
        </Badge>
      </div>
      <CardPanel className="flex flex-col gap-3 rounded-[0.875rem] bg-background p-3">
        <div className="flex flex-wrap gap-2">
          <Button
            size="sm"
            onClick={() => {
              setCookie('demo_color', 'indigo', 1)
              refresh()
            }}
          >
            Color
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={() => {
              setCookie('demo_visits', (cookies['demo_visits'] ?? 0) + 1, 1)
              refresh()
            }}
          >
            Visits
          </Button>
          <Button
            size="sm"
            variant="destructive"
            onClick={() => {
              deleteCookie('demo_color')
              deleteCookie('demo_visits')
              refresh()
            }}
          >
            Clear
          </Button>
        </div>
        <div className="flex flex-col gap-2">
          {Object.entries(cookies).length === 0 && (
            <span className="text-xs text-muted-foreground">No cookies yet</span>
          )}
          {Object.entries(cookies).map(([k, v]) => (
            <div key={k} className="rounded-lg bg-muted p-2.5">
              <span className="block text-[.6875rem] font-semibold text-muted-foreground">{k}</span>
              <span className="mt-0.5 block font-mono text-sm font-semibold text-foreground">{String(v)}</span>
            </div>
          ))}
        </div>
      </CardPanel>
    </Card>
  )
}
