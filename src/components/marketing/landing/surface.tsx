import { cn } from '@/registry/lib/utils'
import type { ReactNode } from 'react'

export function Surface({
  children,
  className,
  innerClassName,
  header,
}: {
  children: ReactNode
  className?: string
  innerClassName?: string
  header?: ReactNode
}) {
  return (
    <div className={cn('flex flex-col rounded-2xl bg-muted p-2', className)}>
      {header}
      <div className={cn('flex-1 rounded-[0.875rem] bg-background', innerClassName)}>{children}</div>
    </div>
  )
}
