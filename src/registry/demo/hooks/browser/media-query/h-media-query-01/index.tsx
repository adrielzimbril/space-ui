'use client'

import * as React from 'react'
import { useMediaQuery } from '@/registry/hooks/browser/use-media-query'
import { Card, CardPanel } from '@/registry/primitives/card'
import { Badge } from '@/registry/primitives/badge'
import { IconDeviceMobile, IconDeviceTablet, IconDeviceDesktop } from '@tabler/icons-react'

export default function Demo() {
  const isMobile = useMediaQuery('(max-width: 640px)')
  const isTablet = useMediaQuery('(min-width: 641px) and (max-width: 1024px)')
  const isDesktop = useMediaQuery('(min-width: 1025px)')
  const active = isMobile ? 'Mobile' : isTablet ? 'Tablet' : isDesktop ? 'Desktop' : '—'

  return (
    <Card className="w-full max-w-md bg-muted rounded-2xl overflow-hidden">
      <div className="flex items-center justify-between gap-3 px-3 pt-1 pb-1">
        <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
          <Badge variant="secondary" className="rounded-sm aspect-square h-full! bg-transparent">
            <IconDeviceDesktop className="size-4 text-muted-foreground" />
          </Badge>
          <span>Media</span>
        </div>
        <Badge variant="outline" size="sm">
          {active}
        </Badge>
      </div>
      <CardPanel className="grid grid-cols-3 gap-2 rounded-[0.875rem] bg-background p-3">
        <div className="flex flex-col items-center gap-2 rounded-lg bg-muted p-2.5">
          <IconDeviceMobile className="size-4 text-muted-foreground" />
          <span className="text-[.6875rem] font-semibold text-foreground">Mobile</span>
          <Badge variant={isMobile ? 'success' : 'outline'} size="sm">
            {isMobile ? 'On' : 'Off'}
          </Badge>
        </div>
        <div className="flex flex-col items-center gap-2 rounded-lg bg-muted p-2.5">
          <IconDeviceTablet className="size-4 text-muted-foreground" />
          <span className="text-[.6875rem] font-semibold text-foreground">Tablet</span>
          <Badge variant={isTablet ? 'success' : 'outline'} size="sm">
            {isTablet ? 'On' : 'Off'}
          </Badge>
        </div>
        <div className="flex flex-col items-center gap-2 rounded-lg bg-muted p-2.5">
          <IconDeviceDesktop className="size-4 text-muted-foreground" />
          <span className="text-[.6875rem] font-semibold text-foreground">Desktop</span>
          <Badge variant={isDesktop ? 'success' : 'outline'} size="sm">
            {isDesktop ? 'On' : 'Off'}
          </Badge>
        </div>
      </CardPanel>
    </Card>
  )
}
