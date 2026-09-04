'use client'

import React from 'react'
import { cn } from '@/registry/lib/utils'

export interface ToolbarSectionProps extends React.HTMLAttributes<HTMLElement> {
  'aria-label'?: string
  children: React.ReactNode
  className?: string
}

export function ToolbarSection({ 'aria-label': ariaLabel, children, className, ...props }: ToolbarSectionProps) {
  return (
    <section
      aria-label={ariaLabel}
      className={cn(
        'absolute z-50 pointer-events-auto flex select-none items-center justify-center gap-1 rounded-xl bg-background p-1.5 border-2 border-muted',
        className,
      )}
      {...props}
    >
      {children}
    </section>
  )
}
