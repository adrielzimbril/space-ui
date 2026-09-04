'use client'

import type { ReactNode } from 'react'
import { cn } from '@/registry/lib/utils'
import { useMediaQuery } from '@/registry/hooks/browser/use-media-query'
import { Drawer, DrawerPanel, DrawerPopup } from '@/registry/primitives/drawer'

function StudioDrawer({
  open,
  onOpenChange,
  position,
  children,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
  position: 'left' | 'right'
  children: ReactNode
}) {
  return (
    <Drawer open={open} onOpenChange={onOpenChange} position={position}>
      <DrawerPopup
        variant="inset"
        className={cn(
          'flex h-full max-h-full flex-col border-none bg-muted p-2 shadow-none before:shadow-none dark:before:shadow-none',
          position === 'left' ? 'max-w-lg' : 'max-w-sm',
        )}
      >
        <DrawerPanel className="h-full min-h-0 rounded-2xl bg-background p-0" scrollable={false}>
          {children}
        </DrawerPanel>
      </DrawerPopup>
    </Drawer>
  )
}

export function ResourceStudio({
  canvas,
  left,
  right,
  bottom,
  float,
  showLeft = true,
  showRight = true,
  leftWidth = '18rem',
  rightWidth = '20rem',
  onToggleLeft,
  onToggleRight,
  className,
}: {
  canvas: ReactNode
  left?: ReactNode
  right?: ReactNode
  bottom?: ReactNode
  float?: ReactNode
  showLeft?: boolean
  showRight?: boolean
  leftWidth?: string
  rightWidth?: string
  onToggleLeft?: (show: boolean) => void
  onToggleRight?: (show: boolean) => void
  className?: string
}) {
  const isDesktop = useMediaQuery('(min-width: 768px)', true)

  return (
    <div className={cn('relative flex h-dvh w-full flex-col overflow-hidden bg-muted p-2 text-foreground', className)}>
      <div className="flex min-h-0 flex-1 gap-2">
        {isDesktop && left && showLeft ? (
          <aside
            data-resource-ui
            className="flex shrink-0 flex-col overflow-hidden rounded-2xl bg-background"
            style={{ width: leftWidth }}
          >
            {left}
          </aside>
        ) : null}
        <div className="relative min-w-0 flex-1 overflow-hidden rounded-2xl bg-background">
          {canvas}
          {float}
        </div>
        {isDesktop && right && showRight ? (
          <aside
            data-resource-ui
            className="flex shrink-0 flex-col overflow-hidden rounded-2xl bg-background"
            style={{ width: rightWidth }}
          >
            {right}
          </aside>
        ) : null}
      </div>
      {bottom ? (
        <div data-resource-ui className="mt-2 shrink-0">
          {bottom}
        </div>
      ) : null}
      {!isDesktop && left ? (
        <StudioDrawer open={Boolean(showLeft)} onOpenChange={(open) => onToggleLeft?.(open)} position="left">
          {left}
        </StudioDrawer>
      ) : null}
      {!isDesktop && right ? (
        <StudioDrawer open={Boolean(showRight)} onOpenChange={(open) => onToggleRight?.(open)} position="right">
          {right}
        </StudioDrawer>
      ) : null}
    </div>
  )
}
