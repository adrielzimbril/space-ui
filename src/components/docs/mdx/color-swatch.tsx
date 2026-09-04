'use client'

import * as React from 'react'
import { Badge } from '@/registry/primitives/badge'
import { IconPalette } from '@tabler/icons-react'

export interface ColorTokenProps {
  name: string
  className?: string
}

export interface ColorSwatchProps {
  value: string
  color?: string
}

export function ColorSwatch({ value, color }: ColorSwatchProps) {
  const bg = color || value

  return (
    <span className="inline-flex items-center gap-2 align-middle">
      <span
        className="size-4.5 rounded-sm border border-border shrink-0 inline-block"
        style={{ backgroundColor: bg }}
      />
      <span className="text-[.8125rem] leading-relaxed text-muted-foreground min-w-35">{value}</span>
    </span>
  )
}
