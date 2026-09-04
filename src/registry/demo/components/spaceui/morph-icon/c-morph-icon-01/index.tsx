'use client'

import * as React from 'react'
import { Button } from '@/registry/primitives/button'
import { MorphIcon, type MorphIconVariant } from '@/registry/components/spaceui/morph-icon'
import {
  IconSun,
  IconMoon,
  IconDeviceDesktop,
  IconCheck,
  IconCopy,
  IconPlayerPlay,
  IconPlayerPause,
  IconBookmark,
  IconBookmarkFilled,
} from '@tabler/icons-react'

export interface MorphIconDemoProps {
  variant?: MorphIconVariant
  duration?: number
}

export default function Demo({ variant = 'blur-scale', duration = 0.25 }: MorphIconDemoProps) {
  const [theme, setTheme] = React.useState<'light' | 'dark' | 'system'>('light')
  const [copied, setCopied] = React.useState(false)
  const [playing, setPlaying] = React.useState(false)
  const [bookmarked, setBookmarked] = React.useState(false)

  const cycleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : prev === 'dark' ? 'system' : 'light'))
  }

  const handleCopy = () => {
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="flex flex-wrap items-center justify-center gap-4 p-8">
      {/* Theme cycle button */}
      <Button
        variant="outline"
        size="icon"
        className="size-10 rounded-xl bg-background hover:bg-muted transition-colors cursor-pointer"
        onClick={cycleTheme}
        title="Toggle Theme"
      >
        <MorphIcon activeKey={theme} variant={variant} duration={duration}>
          {theme === 'light' && <IconSun className="size-5" />}
          {theme === 'dark' && <IconMoon className="size-5" />}
          {theme === 'system' && <IconDeviceDesktop className="size-5" />}
        </MorphIcon>
      </Button>

      {/* Copy/Check toggle button */}
      <Button
        variant="outline"
        size="icon"
        className="size-10 rounded-xl bg-background hover:bg-muted transition-colors cursor-pointer"
        onClick={handleCopy}
        title="Copy to clipboard"
      >
        <MorphIcon activeKey={copied ? 'copied' : 'idle'} variant={variant} duration={duration}>
          {copied ? <IconCheck className="size-5" /> : <IconCopy className="size-5" />}
        </MorphIcon>
      </Button>

      {/* Play/Pause toggle button */}
      <Button
        variant="outline"
        size="icon"
        className="size-10 rounded-xl bg-background hover:bg-muted transition-colors cursor-pointer"
        onClick={() => setPlaying((p) => !p)}
        title="Play / Pause"
      >
        <MorphIcon activeKey={playing ? 'pause' : 'play'} variant={variant} duration={duration}>
          {playing ? <IconPlayerPause className="size-5" /> : <IconPlayerPlay className="size-5" />}
        </MorphIcon>
      </Button>

      {/* Bookmark toggle button */}
      <Button
        variant="outline"
        size="icon"
        className="size-10 rounded-xl bg-background hover:bg-muted transition-colors cursor-pointer"
        onClick={() => setBookmarked((b) => !b)}
        title="Save Bookmark"
      >
        <MorphIcon activeKey={bookmarked ? 'saved' : 'unsaved'} variant={variant} duration={duration}>
          {bookmarked ? <IconBookmarkFilled className="size-5" /> : <IconBookmark className="size-5" />}
        </MorphIcon>
      </Button>
    </div>
  )
}
