'use client'

import * as React from 'react'
import { getCookie, setCookie } from '@/registry/utils/cookie'
import { Card, CardPanel } from '@/registry/primitives/card'
import { Button } from '@/registry/primitives/button'
import { Badge } from '@/registry/primitives/badge'
import { IconCookie } from '@tabler/icons-react'

export default function Demo() {
  const [val, setVal] = React.useState<string | null>(null)

  return (
    <Card className="w-full max-w-md bg-muted rounded-2xl overflow-hidden">
      <div className="flex items-center justify-between gap-3 px-3 pt-1 pb-1">
        <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
          <Badge variant="secondary" className="rounded-sm aspect-square h-full! bg-transparent">
            <IconCookie className="size-4 text-muted-foreground" />
          </Badge>
          <span>Cookie</span>
        </div>
        <Badge variant={val ? 'success' : 'outline'} size="sm">
          {val ? 'Set' : 'Empty'}
        </Badge>
      </div>
      <CardPanel className="flex flex-col gap-3 rounded-[0.875rem] bg-background p-3">
        <div className="rounded-lg bg-muted p-2.5">
          <span className="block text-[.6875rem] font-semibold text-muted-foreground">space_token</span>
          <span className="mt-0.5 block font-mono text-sm font-semibold text-foreground">{val ?? 'undefined'}</span>
        </div>
        <Button
          size="sm"
          onClick={() => {
            setCookie('space_token', 'session_verified', 1)
            setVal(getCookie('space_token'))
          }}
          className="w-full"
        >
          Set & read
        </Button>
      </CardPanel>
    </Card>
  )
}
