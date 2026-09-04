'use client'

import type { ReactNode } from 'react'
import { cn } from '@/registry/lib/utils'

export function ResourceCanvas({
  children,
  float,
  className,
}: {
  children: ReactNode
  float?: ReactNode
  className?: string
}) {
  return (
    <div className={cn('relative min-w-0 flex-1 overflow-hidden rounded-2xl bg-background', className)}>
      {children}
      {float}
    </div>
  )
}
