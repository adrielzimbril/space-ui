import type * as React from 'react'
import { cn } from '@/registry/lib/utils'

export function Code({ className, ...props }: React.ComponentProps<'code'>): React.ReactElement {
  return (
    <code
      className={cn(
        "relative rounded-[.3125rem] bg-accent border-none p-0.75 text-[0.8125rem] font-medium text-foreground [&_svg:not([class*='size-'])]:size-3",
        className,
      )}
      data-slot="code"
      {...props}
    />
  )
}
