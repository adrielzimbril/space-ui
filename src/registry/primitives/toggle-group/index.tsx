'use client'

import type { Toggle as TogglePrimitive } from '@base-ui/react/toggle'
import { ToggleGroup as ToggleGroupPrimitive } from '@base-ui/react/toggle-group'
import type { VariantProps } from 'class-variance-authority'
import * as React from 'react'
import { cn } from '@/registry/lib/utils'
import { Separator } from '@/registry/primitives/separator'
import { Toggle as ToggleComponent, type toggleVariants } from '@/registry/primitives/toggle'

export const ToggleGroupContext: React.Context<VariantProps<typeof toggleVariants>> = React.createContext<
  VariantProps<typeof toggleVariants>
>({
  size: 'default',
  variant: 'default',
})

export function ToggleGroup({
  className,
  variant = 'default',
  size = 'default',
  orientation = 'horizontal',
  children,
  ...props
}: ToggleGroupPrimitive.Props & VariantProps<typeof toggleVariants>): React.ReactElement {
  return (
    <ToggleGroupPrimitive
      className={cn(
        'flex w-fit items-center rounded-lg bg-accent p-0.5 gap-0.5 *:focus-visible:z-10',
        orientation === 'horizontal'
          ? 'flex-row *:pointer-coarse:after:min-w-auto'
          : 'flex-col *:pointer-coarse:after:min-h-auto',
        className,
      )}
      data-size={size}
      data-slot="toggle-group"
      data-variant={variant}
      orientation={orientation}
      {...props}
    >
      <ToggleGroupContext.Provider value={{ size, variant }}>{children}</ToggleGroupContext.Provider>
    </ToggleGroupPrimitive>
  )
}

export function ToggleGroupItem({
  className,
  children,
  variant,
  size,
  ...props
}: TogglePrimitive.Props & VariantProps<typeof toggleVariants>): React.ReactElement {
  const context = React.useContext(ToggleGroupContext)

  const resolvedVariant = context.variant || variant
  const resolvedSize = context.size || size

  return (
    <ToggleComponent
      className={cn(
        'border-0 bg-muted hover:bg-background/80 text-foreground data-pressed:bg-background data-pressed:text-foreground shadow-none before:hidden',
        className,
      )}
      data-size={resolvedSize}
      data-variant={resolvedVariant}
      size={resolvedSize}
      variant={resolvedVariant}
      {...props}
    >
      {children}
    </ToggleComponent>
  )
}

export function ToggleGroupSeparator({
  className,
  orientation = 'vertical',
  ...props
}: {
  className?: string
} & React.ComponentProps<typeof Separator>): React.ReactElement {
  return (
    <Separator
      className={cn(
        'pointer-events-none relative bg-border/50',
        orientation === 'vertical' ? 'h-5 w-px self-center my-0.5' : 'w-5 h-px self-center mx-0.5',
        className,
      )}
      orientation={orientation}
      {...props}
    />
  )
}

export { ToggleGroupPrimitive }
