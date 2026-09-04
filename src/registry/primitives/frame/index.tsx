import type * as React from 'react'
import { cn } from '@/registry/lib/utils'

export function Frame({ className, ...props }: React.ComponentProps<'div'>): React.ReactElement {
  return (
    <div
      className={cn(
        'relative flex flex-col rounded-2xl bg-muted p-1',
        '*:[[data-slot=frame-panel]+[data-slot=frame-panel]]:mt-1',
        className,
      )}
      data-slot="frame"
      {...props}
    />
  )
}

export function FramePanel({ className, ...props }: React.ComponentProps<'div'>): React.ReactElement {
  return (
    <div
      className={cn(
        'relative rounded-xl bg-background bg-clip-padding p-5 before:pointer-events-none before:absolute before:inset-0 before:rounded-[calc(var(--radius-xl)-1px)] ',
        className,
      )}
      data-slot="frame-panel"
      {...props}
    />
  )
}

export function FrameHeader({ className, ...props }: React.ComponentProps<'header'>): React.ReactElement {
  return <header className={cn('flex flex-col p-2', className)} data-slot="frame-panel-header" {...props} />
}

export function FrameTitle({ className, ...props }: React.ComponentProps<'div'>): React.ReactElement {
  return <div className={cn('font-semibold text-sm', className)} data-slot="frame-panel-title" {...props} />
}

export function FrameDescription({ className, ...props }: React.ComponentProps<'div'>): React.ReactElement {
  return (
    <div className={cn('text-muted-foreground text-sm', className)} data-slot="frame-panel-description" {...props} />
  )
}

export function FrameFooter({ className, ...props }: React.ComponentProps<'footer'>): React.ReactElement {
  return <footer className={cn('p-2', className)} data-slot="frame-panel-footer" {...props} />
}
