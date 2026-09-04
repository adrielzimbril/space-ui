'use client'

import * as React from 'react'
import { useCookie } from '@/registry/hooks/browser/use-cookie'
import { Card, CardPanel } from '@/registry/primitives/card'
import { Button } from '@/registry/primitives/button'
import { Badge } from '@/registry/primitives/badge'
import { Input } from '@/registry/primitives/input'
import { IconCookie, IconTrash } from '@tabler/icons-react'

export default function Demo() {
  const [getPref, setPref, removePref] = useCookie<string>('space_demo_cookie')
  const [val, setVal] = React.useState('space-theme-dark')
  const pref = getPref()

  return (
    <Card className="w-full max-w-md bg-muted rounded-2xl overflow-hidden">
      <div className="flex items-center justify-between gap-3 px-3 pt-1 pb-1">
        <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
          <Badge variant="secondary" className="rounded-sm aspect-square h-full! bg-transparent">
            <IconCookie className="size-4 text-muted-foreground" />
          </Badge>
          <span>Cookie</span>
        </div>
        <Badge variant={pref ? 'success' : 'outline'} size="sm">
          {pref ? 'Set' : 'Empty'}
        </Badge>
      </div>
      <CardPanel className="flex flex-col gap-3 rounded-[0.875rem] bg-background p-3">
        <div className="rounded-lg bg-muted p-2.5">
          <span className="block text-[.6875rem] font-semibold text-muted-foreground">Value</span>
          <span className="mt-0.5 block truncate font-mono text-sm font-semibold text-foreground">{pref ?? '—'}</span>
        </div>
        <div className="flex gap-2">
          <Input
            value={val}
            onChange={(e) => setVal(e.target.value)}
            placeholder="space-theme-dark"
            aria-label="Cookie value"
            className="text-base sm:text-sm"
          />
          <Button size="sm" onClick={() => setPref(val)} className="shrink-0">
            Set
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={() => removePref()}
            aria-label="Delete"
            className="shrink-0 text-muted-foreground hover:text-destructive"
          >
            <IconTrash className="size-4" />
          </Button>
        </div>
      </CardPanel>
    </Card>
  )
}
