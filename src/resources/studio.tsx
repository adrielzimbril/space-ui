'use client'

import type { ReactNode } from 'react'
import { cn } from '@/registry/lib/utils'

export function ResourceStudio({
  canvas,
  left,
  right,
  bottom,
  float,
  showRight = true,
  onToggleRight,
  className,
}: {
  canvas: ReactNode
  left?: ReactNode
  right?: ReactNode
  bottom?: ReactNode
  float?: ReactNode
  showRight?: boolean
  onToggleRight?: (show: boolean) => void
  className?: string
}) {
  return (
    <div
      className={cn(
        'relative flex h-dvh w-full flex-col overflow-hidden bg-muted p-2 text-foreground',
        className,
      )}
    >
      <div className="flex min-h-0 flex-1 gap-2">
        {left ? (
          <aside data-resource-ui className="flex w-72 shrink-0 flex-col overflow-hidden rounded-2xl bg-background">
            {left}
          </aside>
        ) : null}
        <div className="relative min-w-0 flex-1 overflow-hidden rounded-2xl bg-background">
          {canvas}
          {float}
        </div>
        {right && showRight ? (
          <aside
            data-resource-ui
            className="flex w-[min(20rem,calc(100vw-2rem))] shrink-0 flex-col overflow-hidden rounded-2xl bg-background"
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
    </div>
  )
}
