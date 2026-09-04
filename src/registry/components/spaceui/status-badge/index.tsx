'use client'

import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/registry/lib/utils'
import { Badge, badgeVariants } from '@/registry/primitives/badge'

export const statusIndicatorVariants = cva('rounded-full', {
  variants: {
    status: {
      online: 'bg-emerald-500',
      available: 'bg-emerald-500',
      offline: 'bg-zinc-400',
      busy: 'bg-rose-500',
      away: 'bg-amber-500',
      error: 'bg-rose-600',
      warning: 'bg-amber-500',
      info: 'bg-sky-500',
    },
    size: {
      default: 'size-2',
      xs: 'size-1.5',
      sm: 'size-2.5',
      md: 'size-3',
      lg: 'size-3.5',
      xl: 'size-4',
    },
    animated: {
      true: 'animate-pulse',
      false: '',
    },
  },
  defaultVariants: {
    status: 'online',
    size: 'default',
    animated: true,
  },
})

export type StatusType = 'online' | 'offline' | 'busy' | 'away' | 'available' | 'error' | 'warning' | 'info'

export interface StatusBadgeProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof badgeVariants> {
  status?: StatusType
  primaryText?: string
  showIndicator?: boolean
  animated?: boolean
  mode?: 'stack' | 'inline'
  indicatorClassName?: string
  primaryTextClassName?: string
  secondaryTextClassName?: string
}

export function StatusBadge({
  className,
  variant,
  size,
  mode = 'inline',
  status = 'online',
  primaryText,
  showIndicator = true,
  animated = true,
  indicatorClassName,
  primaryTextClassName,
  secondaryTextClassName,
  children,
  ...props
}: StatusBadgeProps) {
  const IndicatorComponent = showIndicator && (
    <span className="relative flex justify-center items-center size-fit shrink-0">
      <span
        className={cn('absolute inline-flex h-full w-full rounded-full opacity-75', animated ? 'animate-ping' : '', {
          'bg-emerald-400': status === 'online' || status === 'available',
          'bg-sky-400': status === 'info',
          'bg-rose-400': status === 'busy' || status === 'error',
          'bg-zinc-300 dark:bg-zinc-600': status === 'offline',
          'bg-amber-400': status === 'away' || status === 'warning',
        })}
      />
      <span
        className={cn(
          'relative inline-flex rounded-full',
          statusIndicatorVariants({ status, size: size as any, animated: false }),
          indicatorClassName,
        )}
      />
    </span>
  )

  if (mode === 'stack') {
    return (
      <div
        className={cn('flex items-center gap-2', badgeVariants({ variant, size }), className)}
        role="status"
        {...props}
      >
        {IndicatorComponent}
        <div className="flex flex-col items-start gap-0.5">
          {primaryText && <span className={cn('font-semibold leading-none', primaryTextClassName)}>{primaryText}</span>}
          {children && (
            <span className={cn('text-[0.7em] opacity-70 leading-none', secondaryTextClassName)}>{children}</span>
          )}
        </div>
      </div>
    )
  }

  return (
    <div
      className={cn(
        'flex flex-wrap items-center gap-2 inline-flex',
        primaryText && badgeVariants({ variant, size }),
        className,
      )}
      role="status"
      {...props}
    >
      <Badge size={size} variant={variant}>
        <div className="flex items-center gap-2">
          {IndicatorComponent}
          {primaryText && <span className={cn('font-semibold', primaryTextClassName)}>{primaryText}</span>}
        </div>
      </Badge>
      {children && <span className={cn('font-normal opacity-90', secondaryTextClassName)}>{children}</span>}
    </div>
  )
}
