'use client'

import React from 'react'
import { cn } from '@/registry/lib/utils'
import { Badge, type BadgeProps } from '@/registry/primitives/badge'

export function AvatarExtended({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn('relative inline-flex', className)} {...props}>
      {children}
    </div>
  )
}

export function AvatarRing({ className, ...props }: React.HTMLAttributes<HTMLSpanElement>): React.ReactElement {
  return (
    <span
      className={cn('absolute inset-0 z-10 rounded-full ring-2 ring-primary pointer-events-none', className)}
      data-slot="avatar-ring"
      {...props}
    />
  )
}

export function AvatarIndicator({ className, ...props }: React.HTMLAttributes<HTMLSpanElement>): React.ReactElement {
  return (
    <span
      className={cn(
        'absolute bottom-0 right-0 z-10 flex size-2.5 items-center justify-center rounded-full ring-2 ring-background',
        className,
      )}
      data-slot="avatar-indicator"
      {...props}
    />
  )
}

export function AvatarBadge({ className, size = 'sm', children, ...props }: BadgeProps): React.ReactElement {
  return (
    <Badge
      size={size}
      className={cn('absolute -inset-e-1.5 -top-1.5 z-10 rounded-full ring-2 ring-background', className)}
      square
      data-slot="avatar-badge"
      {...props}
    >
      {children}
    </Badge>
  )
}

export function AvatarIcon({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>): React.ReactElement {
  return (
    <div
      className={cn(
        'absolute -bottom-1 -right-1 z-10 flex size-4 items-center justify-center rounded-full bg-background ring-1 ring-muted',
        className,
      )}
      data-slot="avatar-icon"
      {...props}
    >
      {children}
    </div>
  )
}
