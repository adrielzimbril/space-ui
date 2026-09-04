'use client'

import { OTPField as OTPFieldPrimitive } from '@base-ui/react/otp-field'
import type * as React from 'react'
import { cn } from '@/registry/lib/utils'
import { Separator } from '@/registry/primitives/separator'

export function OTPField({
  className,
  size = 'default',
  ...props
}: React.ComponentProps<typeof OTPFieldPrimitive.Root> & {
  size?: 'default' | 'lg'
}): React.ReactElement {
  return (
    <OTPFieldPrimitive.Root
      className={cn('flex items-center gap-2 has-disabled:opacity-64', className)}
      data-size={size}
      data-slot="otp-field"
      {...props}
    />
  )
}

export function OTPFieldInput({
  className,
  ...props
}: React.ComponentProps<typeof OTPFieldPrimitive.Input>): React.ReactElement {
  return (
    <OTPFieldPrimitive.Input
      className={cn(
        'relative in-[[data-slot=otp-field][data-size=lg]]:size-10 size-9 min-w-0 rounded-lg border border-input bg-background text-center in-[[data-slot=otp-field][data-size=lg]]:text-lg text-base text-foreground in-[[data-slot=otp-field][data-size=lg]]:leading-10 leading-9 outline-none transition-all duration-150 focus-visible:z-10 focus-visible:border-foreground/20 focus-visible:ring-2 focus-visible:ring-foreground/10 aria-invalid:border-destructive aria-invalid:focus-visible:ring-destructive/20 sm:in-[[data-slot=otp-field][data-size=lg]]:size-9 sm:size-8 sm:in-[[data-slot=otp-field][data-size=lg]]:text-base sm:text-sm sm:in-[[data-slot=otp-field][data-size=lg]]:leading-9 sm:leading-8 dark:border-input dark:bg-input/30 dark:focus-visible:border-foreground/70 dark:focus-visible:ring-foreground/15',
        className,
      )}
      data-slot="otp-field-input"
      spellCheck={false}
      {...props}
    />
  )
}

export function OTPFieldSeparator({ className, ...props }: React.ComponentProps<typeof Separator>): React.ReactElement {
  return (
    <OTPFieldPrimitive.Separator
      render={
        <Separator
          className={cn(
            'rounded-full bg-input data-[orientation=horizontal]:h-0.5 data-[orientation=horizontal]:w-3',
            className,
          )}
          orientation="horizontal"
          {...props}
        />
      }
    />
  )
}

export { OTPFieldPrimitive }
