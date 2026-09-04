'use client'

import { Field as FieldPrimitive } from '@base-ui/react/field'
import { mergeProps } from '@base-ui/react/merge-props'
import type * as React from 'react'
import { cn } from '@/registry/lib/utils'

export type TextareaProps = React.ComponentPropsWithoutRef<'textarea'> &
  React.RefAttributes<HTMLTextAreaElement> & {
    size?: 'sm' | 'default' | 'lg' | number
    unstyled?: boolean
  }

export function Textarea({
  className,
  size = 'default',
  unstyled = false,
  ref,
  ...props
}: TextareaProps): React.ReactElement {
  return (
    <span
      className={
        cn(
          !unstyled &&
            'relative inline-flex w-full rounded-lg border border-input bg-background text-base text-foreground transition-all duration-150 focus-within:border-foreground/20 focus-within:ring-2 focus-within:ring-foreground/10 has-disabled:opacity-50 has-disabled:pointer-events-none has-aria-invalid:border-destructive has-aria-invalid:focus-within:ring-destructive/20 sm:text-sm dark:border-input dark:bg-input/30 dark:focus-within:border-foreground/70 dark:focus-within:ring-foreground/15',
          className,
        ) || undefined
      }
      data-size={size}
      data-slot="textarea-control"
    >
      <FieldPrimitive.Control
        ref={ref}
        value={props.value}
        defaultValue={props.defaultValue}
        disabled={props.disabled}
        id={props.id}
        name={props.name}
        render={(defaultProps: React.ComponentProps<'textarea'>) => (
          <textarea
            className={cn(
              'field-sizing-content min-h-17.5 w-full rounded-[inherit] bg-transparent px-[calc(--spacing(3)-1px)] py-[calc(--spacing(1.5)-1px)] placeholder:text-muted-foreground/60 outline-none max-sm:min-h-20.5',
              size === 'sm' && 'min-h-16.5 px-[calc(--spacing(2.5)-1px)] py-[calc(--spacing(1)-1px)] max-sm:min-h-19.5',
              size === 'lg' && 'min-h-18.5 py-[calc(--spacing(2)-1px)] max-sm:min-h-21.5',
            )}
            data-slot="textarea"
            {...mergeProps(defaultProps, props)}
          />
        )}
      />
    </span>
  )
}

export { FieldPrimitive }
