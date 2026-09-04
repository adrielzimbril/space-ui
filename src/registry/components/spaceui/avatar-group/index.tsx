'use client'

import React from 'react'
import { cn } from '@/registry/lib/utils'

export interface AvatarGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  stacking?: 'left' | 'right'
}

export function AvatarGroup({
  className,
  stacking = 'right',
  children,
  ...props
}: AvatarGroupProps): React.ReactElement {
  const count = React.Children.count(children)

  return (
    <div className={cn('flex items-center justify-center -space-x-2 *:ring-2 *:ring-background', className)} {...props}>
      {React.Children.map(children, (child, index) => {
        if (!React.isValidElement(child)) return child
        return React.cloneElement(child as React.ReactElement<any>, {
          style: {
            ...((child.props.style as React.CSSProperties) || {}),
            zIndex: stacking === 'left' ? count - index : undefined,
          },
        })
      })}
    </div>
  )
}

export function AvatarGroupAction({ className, ...props }: React.HTMLAttributes<HTMLDivElement>): React.ReactElement {
  return (
    <div
      className={cn(
        'relative inline-flex size-8 shrink-0 select-none items-center justify-center rounded-full bg-muted font-medium text-xs ring-2 ring-background',
        className,
      )}
      data-slot="avatar-group-action"
      {...props}
    />
  )
}
