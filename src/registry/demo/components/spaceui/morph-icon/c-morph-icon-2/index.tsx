'use client'

import * as React from 'react'
import { Button } from '@/registry/primitives/button'
import { MorphIcon } from '@/registry/components/spaceui/morph-icon'
import { IconSun, IconMoon, IconDeviceDesktop } from '@tabler/icons-react'

export default function ThemeMorphDemo() {
  const [theme, setTheme] = React.useState<'light' | 'dark' | 'system'>('light')

  return (
    <div className="flex flex-col items-center justify-center gap-4 p-8">
      <div className="flex items-center gap-2">
        <Button
          variant={theme === 'light' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setTheme('light')}
          className="rounded-lg text-xs cursor-pointer"
        >
          Light
        </Button>
        <Button
          variant={theme === 'dark' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setTheme('dark')}
          className="rounded-lg text-xs cursor-pointer"
        >
          Dark
        </Button>
        <Button
          variant={theme === 'system' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setTheme('system')}
          className="rounded-lg text-xs cursor-pointer"
        >
          System
        </Button>
      </div>

      <div className="flex items-center justify-center size-14 rounded-2xl border border-border bg-muted/30">
        <MorphIcon activeKey={theme} variant="blur-scale" duration={0.3}>
          {theme === 'light' && <IconSun className="size-6 text-foreground" />}
          {theme === 'dark' && <IconMoon className="size-6 text-foreground" />}
          {theme === 'system' && <IconDeviceDesktop className="size-6 text-foreground" />}
        </MorphIcon>
      </div>
      <span className="text-xs text-muted-foreground font-mono capitalize">Active: {theme}</span>
    </div>
  )
}
