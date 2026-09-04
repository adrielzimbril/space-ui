'use client'

import * as React from 'react'
import { usePrefersTheme } from '@/registry/hooks/browser/use-prefers-theme'
import { Card, CardPanel } from '@/registry/primitives/card'
import { Badge } from '@/registry/primitives/badge'
import { IconMoon, IconSun } from '@tabler/icons-react'

export default function Demo() {
  const theme = usePrefersTheme()

  return (
    <Card className="w-full max-w-md bg-muted rounded-2xl overflow-hidden">
      <div className="flex items-center justify-between gap-3 px-3 pt-1 pb-1">
        <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
          <Badge variant="secondary" className="rounded-sm aspect-square h-full! bg-transparent">
            {theme === 'dark' ? (
              <IconMoon className="size-4 text-muted-foreground" />
            ) : (
              <IconSun className="size-4 text-muted-foreground" />
            )}
          </Badge>
          <span>Theme</span>
        </div>
        <Badge variant="outline" size="sm" className="capitalize">
          {theme}
        </Badge>
      </div>
      <CardPanel className="flex flex-col gap-3 rounded-[0.875rem] bg-background p-3">
        <div className="rounded-lg bg-muted p-2.5">
          <span className="block text-[.6875rem] font-semibold text-muted-foreground">Preference</span>
          <span className="mt-0.5 block font-mono text-sm font-semibold capitalize text-foreground">{theme}</span>
        </div>
      </CardPanel>
    </Card>
  )
}
