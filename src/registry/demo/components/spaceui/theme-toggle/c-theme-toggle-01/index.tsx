'use client'

import * as React from 'react'
import {
  ThemeToggleButton,
  THEME_TOGGLE_CONFIG,
  type StartPos,
  type Variant,
  type ThemeToggleSize,
} from '@/registry/components/spaceui/theme-toggle'
import type { ButtonProps } from '@/registry/primitives/button'

interface ThemeToggleDemoProps {
  variant?: Variant
  startCircle?: StartPos
  startRectangle?: StartPos
  startPolygon?: StartPos
  blur?: boolean
  buttonVariant?: ButtonProps['variant']
  size?: ThemeToggleSize
}

export default function Demo({
  variant = 'circle',
  startCircle = 'center',
  startRectangle = 'bottom-up',
  startPolygon = 'top-left',
  blur = false,
  buttonVariant = 'outline',
  size = 'lg',
}: ThemeToggleDemoProps) {
  const effectiveStart = React.useMemo(() => {
    switch (variant) {
      case 'circle':
      case 'circle-blur':
        return startCircle
      case 'rectangle':
        return startRectangle
      case 'polygon':
        return startPolygon
      default:
        return THEME_TOGGLE_CONFIG[variant]?.defaultDirection ?? 'center'
    }
  }, [variant, startCircle, startRectangle, startPolygon])

  return (
    <div className="flex w-full flex-col items-center gap-4 py-6">
      <ThemeToggleButton
        variant={variant}
        start={effectiveStart}
        blur={blur}
        size={size}
        buttonVariant={buttonVariant}
        className="rounded-full text-foreground"
      />
    </div>
  )
}
