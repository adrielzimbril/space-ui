'use client'

import * as React from 'react'
import { useIsMac } from '@/registry/hooks/browser/use-is-mac'
import { Card, CardPanel } from '@/registry/primitives/card'
import { Badge } from '@/registry/primitives/badge'
import { Kbd } from '@/registry/primitives/kbd'
import { IconBrandApple, IconDeviceDesktop } from '@tabler/icons-react'

export default function Demo() {
  const isMac = useIsMac()

  return (
    <Card className="w-full max-w-md bg-muted rounded-2xl overflow-hidden">
      <div className="flex items-center justify-between gap-3 px-3 pt-1 pb-1">
        <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
          <Badge variant="secondary" className="rounded-sm aspect-square h-full! bg-transparent">
            {isMac ? (
              <IconBrandApple className="size-4 text-muted-foreground" />
            ) : (
              <IconDeviceDesktop className="size-4 text-muted-foreground" />
            )}
          </Badge>
          <span>Platform</span>
        </div>
        <Badge variant={isMac ? 'success' : 'outline'} size="sm">
          {isMac ? 'macOS' : 'Other'}
        </Badge>
      </div>
      <CardPanel className="flex flex-col gap-3 rounded-[0.875rem] bg-background p-3">
        <div className="rounded-lg bg-muted p-2.5">
          <span className="block text-[.6875rem] font-semibold text-muted-foreground">Modifier</span>
          <span className="mt-0.5 block font-mono text-sm font-semibold text-foreground">
            <Kbd>{isMac ? '⌘' : 'Ctrl'}</Kbd>
          </span>
        </div>
      </CardPanel>
    </Card>
  )
}
