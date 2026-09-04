'use client'

import type { ReactNode } from 'react'
import { cn } from '@/registry/lib/utils'

export function ResourceSidebar({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <aside
      data-resource-ui
      className={cn(
        'flex w-[min(20rem,calc(100vw-2rem))] shrink-0 flex-col overflow-hidden rounded-2xl bg-background',
        className,
      )}
    >
      {children}
    </aside>
  )
}
