'use client'

import React from 'react'
import { ToolbarButton } from './playground-toolbar-button'
import { ToolbarSection } from './playground-toolbar-section'
import { IconDeviceLaptop, IconDeviceTablet, IconDeviceMobile } from '@tabler/icons-react'
import { bloomSound } from '@/components/providers/sound-provider'
import { cn } from '@/registry/lib/utils'

export type ViewportMode = 'desktop' | 'tablet' | 'mobile'

export interface PlaygroundViewportSwitcherProps {
  viewport: ViewportMode
  onChange: (viewport: ViewportMode) => void
  className?: string
}

export function PlaygroundViewportSwitcher({ viewport, onChange, className }: PlaygroundViewportSwitcherProps) {
  return (
    <ToolbarSection
      aria-label="Viewport switcher"
      className={cn('top-6 left-1/2 -translate-x-1/2 hidden md:flex', className)}
    >
      <ToolbarButton
        label="Desktop View"
        pressed={viewport === 'desktop'}
        onClick={() => {
          bloomSound()
          onChange('desktop')
        }}
      >
        <IconDeviceLaptop className="size-4" />
      </ToolbarButton>
      <ToolbarButton
        label="Tablet View"
        pressed={viewport === 'tablet'}
        onClick={() => {
          bloomSound()
          onChange('tablet')
        }}
      >
        <IconDeviceTablet className="size-4" />
      </ToolbarButton>
      <ToolbarButton
        label="Mobile View"
        pressed={viewport === 'mobile'}
        onClick={() => {
          bloomSound()
          onChange('mobile')
        }}
      >
        <IconDeviceMobile className="size-4" />
      </ToolbarButton>
    </ToolbarSection>
  )
}
