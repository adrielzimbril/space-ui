'use client'

import type { ReactNode } from 'react'
import { motion } from 'motion/react'
import { cn } from '@/registry/lib/utils'
import { useMediaQuery } from '@/registry/hooks/browser/use-media-query'
import { Drawer, DrawerPanel, DrawerPopup } from '@/registry/primitives/drawer'

const SPRING = { type: 'spring', stiffness: 150, damping: 26, mass: 0.82 } as const

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
  showLeft = false,
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
  const leftOpen = Boolean(isDesktop && left && showLeft)
  const rightOpen = Boolean(isDesktop && right && showRight)

  return (
    <div className={cn('relative flex h-dvh w-full flex-col overflow-hidden bg-muted p-2 text-foreground', className)}>
      <div className="relative min-h-0 flex-1 overflow-hidden">
        {isDesktop && left ? (
          <motion.aside
            data-resource-ui
            initial={false}
            animate={{
              x: leftOpen ? 0 : 'calc(-100% - 0.5rem)',
              opacity: leftOpen ? 1 : 0,
            }}
            transition={SPRING}
            aria-hidden={!leftOpen}
            className={cn(
              'absolute inset-y-0 left-0 z-20 flex flex-col overflow-hidden rounded-2xl bg-background will-change-transform',
              !leftOpen && 'pointer-events-none select-none',
            )}
            style={{ width: leftWidth }}
          >
            {left}
          </motion.aside>
        ) : null}

        <motion.div
          initial={false}
          animate={{
            left: leftOpen ? `calc(${leftWidth} + 0.5rem)` : 0,
            right: rightOpen ? `calc(${rightWidth} + 0.5rem)` : 0,
          }}
          transition={SPRING}
          className="absolute inset-y-0 overflow-hidden rounded-2xl bg-background will-change-[left,right]"
        >
          {canvas}
          {float}
        </motion.div>

        {isDesktop && right ? (
          <motion.aside
            data-resource-ui
            initial={false}
            animate={{
              x: rightOpen ? 0 : 'calc(100% + 0.5rem)',
              opacity: rightOpen ? 1 : 0,
            }}
            transition={SPRING}
            aria-hidden={!rightOpen}
            className={cn(
              'absolute inset-y-0 right-0 z-20 flex flex-col overflow-hidden rounded-2xl bg-background will-change-transform',
              !rightOpen && 'pointer-events-none select-none',
            )}
            style={{ width: rightWidth }}
          >
            {right}
          </motion.aside>
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
