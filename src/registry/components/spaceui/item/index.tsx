import * as React from 'react'
import { cn } from '@/registry/lib/utils'
import { cva, type VariantProps } from 'class-variance-authority'

const itemVariants = cva('flex items-center gap-4 rounded-[0.875rem] p-4 text-left transition-colors', {
  variants: {
    variant: {
      default: 'bg-background hover:bg-muted/50',
      outline: 'border border-soft bg-background hover:bg-muted/50',
      ghost: 'hover:bg-muted',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
})

export interface ItemProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof itemVariants> {}

export function Item({ className, variant, ...props }: ItemProps) {
  return <div className={cn(itemVariants({ variant }), className)} {...props} />
}

export function ItemMedia({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('flex shrink-0 items-center justify-center', className)} {...props} />
}

export function ItemContent({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('flex flex-col gap-1', className)} {...props} />
}

export function ItemTitle({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3 className={cn('text-sm font-semibold text-foreground leading-none tracking-tight', className)} {...props} />
  )
}

export function ItemDescription({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
  return <p className={cn('text-sm text-muted-foreground', className)} {...props} />
}
