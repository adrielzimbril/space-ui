'use client'

import React from 'react'
import { motion } from 'motion/react'
import { ScrollArea } from '@/registry/primitives/scroll-area'
import { useMediaQuery } from '@/registry/hooks/browser/use-media-query'
import { Drawer, DrawerPopup, DrawerPanel } from '@/registry/primitives/drawer'
import { cn } from '@/registry/lib/utils'

export interface PlaygroundDocPanelProps {
  showInfo: boolean
  onClose: () => void
  children: React.ReactNode
}

export function PlaygroundDocPanel({ showInfo, onClose, children }: PlaygroundDocPanelProps) {
  const isDesktop = useMediaQuery('(min-width: 1024px)', true)

  // 1. Mobile / Tablet View: Overlay Bottom Sheet Drawer
  if (!isDesktop) {
    return (
      <>
        {/* Keep children mounted when drawer is closed so previews register immediately on page load */}
        {!showInfo && (
          <div className="hidden" aria-hidden="true">
            {children}
          </div>
        )}
        <Drawer
          open={showInfo}
          onOpenChange={(open) => {
            if (!open) onClose()
          }}
          position="bottom"
        >
          <DrawerPopup
            showBar
            className="relative sm:max-w-2xl self-center place-self-center rounded-t-3xl border-t border-border bg-muted p-1.5 flex flex-col gap-2 h-full"
          >
            <DrawerPanel className="rounded-2xl bg-background p-0">
              <div className="relative space-y-6 pb-6">{showInfo && children}</div>
            </DrawerPanel>
          </DrawerPopup>
        </Drawer>
      </>
    )
  }

  // 2. Desktop View: Persistent GPU-accelerated Sliding Panel (40%)
  // Keeps children mounted permanently so <ComponentPreview /> registers on load and transitions are 60fps with zero layout thrashing
  return (
    <motion.div
      initial={false}
      animate={{
        x: showInfo ? '0%' : '-100%',
        opacity: showInfo ? 1 : 0,
      }}
      transition={{ type: 'spring', stiffness: 150, damping: 26, mass: 0.82 }}
      className={cn(
        'fixed left-0 top-0 z-20 flex h-screen w-[40%] shrink-0 flex-col justify-end overflow-hidden rounded-xl bg-muted p-2 will-change-transform',
        !showInfo && 'pointer-events-none select-none',
      )}
      aria-hidden={!showInfo}
    >
      <ScrollArea
        className="relative size-full overflow-y-auto rounded-xl bg-background px-6 py-3"
        scrollFade
        scrollbarGutter
      >
        <div className="relative space-y-6">{children}</div>
      </ScrollArea>
    </motion.div>
  )
}
