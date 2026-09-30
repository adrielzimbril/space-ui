'use client'

import React from 'react'
import { Button } from '@/registry/components/button/button-squircle'
import { cn } from '@/registry/lib/utils'

export interface ToolbarButtonProps {
  label: string
  pressed?: boolean
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void
  children: React.ReactNode
  className?: string
}

export function ToolbarButton({ label, pressed, onClick, children, className }: ToolbarButtonProps) {
  return (
    <div className={cn('flex size-8 items-center justify-center rounded-xl bg-muted', className)}>
      <Button
        variant="secondary"
        size="icon-sm"
        onClick={onClick}
        aria-label={label}
        aria-pressed={pressed}
        title={label}
        pointer
        className={cn(
          'text-muted-foreground hover:bg-background hover:text-foreground',
          pressed && 'text-foreground font-semibold bg-background',
        )}
      >
        {children}
      </Button>
    </div>
  )
}
