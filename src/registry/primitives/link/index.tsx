'use client'

import { mergeProps } from '@base-ui/react/merge-props'
import { useRender } from '@base-ui/react/use-render'
import { cva, type VariantProps } from 'class-variance-authority'
import type * as React from 'react'
import { cn } from '@/registry/lib/utils'
import { buttonVariants } from '@/registry/primitives/button'

export const linkVariants = cva(
  'relative inline-flex items-center gap-1.5 font-medium text-foreground transition-colors outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50',
  {
    defaultVariants: {
      variant: 'default',
    },
    variants: {
      variant: {
        default: 'text-primary',
        secondary: 'text-muted-foreground hover:text-foreground',
        underline: 'text-foreground hover:text-primary underline',
      },
    },
  },
)

export interface LinkProps extends useRender.ComponentProps<'a'> {
  asButton?: boolean
  variant?: VariantProps<typeof linkVariants>['variant']
  size?: VariantProps<typeof buttonVariants>['size']
  underline?: boolean
}

export function Link({
  className,
  variant = 'default',
  size = 'default',
  underline = false,
  asButton = false,
  render,
  ...props
}: LinkProps): React.ReactElement {
  const classes = asButton
    ? cn(buttonVariants({ variant: variant as VariantProps<typeof buttonVariants>['variant'], size }), className)
    : cn(linkVariants({ variant }), underline && 'underline-offset-4 hover:underline', className)

  const defaultProps = {
    className: classes,
    'data-slot': 'link',
  } as React.ComponentPropsWithRef<'a'>

  return useRender({
    defaultTagName: 'a',
    props: mergeProps<'a'>(defaultProps, props),
    render,
  })
}
