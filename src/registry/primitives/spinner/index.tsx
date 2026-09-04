import * as React from 'react'
import { Loader2 } from 'lucide-react'
import { cn } from '@/registry/lib/utils'

export function Spinner({ className, ...props }: React.ComponentProps<typeof Loader2>): React.ReactElement {
  return (
    <Loader2
      aria-label="Loading"
      className={cn('animate-spin', className)}
      role="status"
      data-slot="spinner"
      {...props}
    />
  )
}
