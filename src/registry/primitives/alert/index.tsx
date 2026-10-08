import { cn } from '@/registry/lib/utils'
import { cva, type VariantProps } from 'class-variance-authority'
import * as React from 'react'

const alertVariants = cva(
  'relative grid w-full grid-cols-[auto_1fr_auto] items-start gap-x-3 gap-y-0.5 rounded-xl border bg-transparent dark:bg-input/32 px-3.5 py-3 text-card-foreground text-sm [&>svg]:size-4 [&>svg]:h-lh',
  {
    defaultVariants: {
      variant: 'default',
    },
    variants: {
      variant: {
        default: '[&>svg]:text-muted-foreground-foreground',
        error: '[&>svg]:text-error-foreground',
        info: '[&>svg]:text-info-foreground',
        success: '[&>svg]:text-success-foreground',
        warning: '[&>svg]:text-warning-foreground',
      },
    },
  },
)

type AlertVariant = NonNullable<VariantProps<typeof alertVariants>['variant']>

const AlertContext = React.createContext<{ variant?: AlertVariant }>({
  variant: 'default',
})

const iconVariantStyles: Record<AlertVariant, { icon: string; badge: string }> = {
  default: { icon: 'text-muted-foreground', badge: 'bg-secondary text-secondary-foreground' },
  error: { icon: 'text-error-foreground', badge: 'bg-error text-error-foreground' },
  info: { icon: 'text-info-foreground', badge: 'bg-info text-info-foreground' },
  success: { icon: 'text-success-foreground', badge: 'bg-success text-success-foreground' },
  warning: { icon: 'text-warning-foreground', badge: 'bg-warning text-warning-foreground' },
}

export interface AlertProps extends React.ComponentProps<'div'>, VariantProps<typeof alertVariants> {}

export function Alert({ className, variant = 'default', ...props }: AlertProps): React.ReactElement {
  return (
    <AlertContext.Provider value={{ variant: variant ?? 'default' }}>
      <div className={cn(alertVariants({ variant }), className)} data-slot="alert" role="alert" {...props} />
    </AlertContext.Provider>
  )
}

export interface AlertIconProps extends React.ComponentProps<'div'> {
  badge?: boolean
}

export function AlertIcon({ className, badge = false, children, ...props }: AlertIconProps): React.ReactElement {
  const { variant = 'default' } = React.useContext(AlertContext)
  const styles = iconVariantStyles[variant] ?? iconVariantStyles.default

  const renderedChildren = React.isValidElement(children)
    ? React.cloneElement(children as React.ReactElement<any>, {
        weight: (children.props as any)?.weight ?? 'Filled',
      })
    : children

  return (
    <div
      className={cn(
        'col-start-1 flex shrink-0 items-center justify-center [&>svg]:shrink-0',
        badge
          ? cn('size-6 rounded-md row-start-1 row-end-3 self-start [&>svg]:size-4.5', styles.badge)
          : cn('h-lh w-4 row-start-1 self-start [&>svg]:size-4', styles.icon),
        className,
      )}
      data-slot="alert-icon"
      {...props}
    >
      {renderedChildren}
    </div>
  )
}

export function AlertTitle({ className, ...props }: React.ComponentProps<'div'>): React.ReactElement {
  return <div className={cn('col-start-2 row-start-1 font-medium', className)} data-slot="alert-title" {...props} />
}

export function AlertDescription({ className, ...props }: React.ComponentProps<'div'>): React.ReactElement {
  return (
    <div
      className={cn('col-start-2 text-muted-foreground text-sm', className)}
      data-slot="alert-description"
      {...props}
    />
  )
}

export function AlertAction({ className, ...props }: React.ComponentProps<'div'>): React.ReactElement {
  return (
    <div
      className={cn('col-start-3 row-start-1 row-end-3 ms-auto self-center flex items-center gap-2', className)}
      data-slot="alert-action"
      {...props}
    />
  )
}
