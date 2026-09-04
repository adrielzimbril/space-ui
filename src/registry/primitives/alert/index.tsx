import { cva, type VariantProps } from 'class-variance-authority'
import * as React from 'react'
import { cn } from '@/registry/lib/utils'

const alertVariants = cva(
  'relative grid w-full grid-cols-[auto_1fr_auto] items-start gap-x-3 gap-y-0.5 rounded-xl border bg-transparent dark:bg-input/32 px-3.5 py-3 text-card-foreground text-sm [&>svg]:size-4 [&>svg]:h-lh',
  {
    defaultVariants: {
      variant: 'default',
    },
    variants: {
      variant: {
        default: '[&>svg]:text-muted-foreground',
        error: '[&>svg]:text-destructive',
        info: '[&>svg]:text-info',
        success: '[&>svg]:text-success',
        warning: '[&>svg]:text-warning',
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
  error: { icon: 'text-destructive', badge: 'bg-destructive/10 text-destructive' },
  info: { icon: 'text-info', badge: 'bg-info/10 text-info' },
  success: { icon: 'text-success', badge: 'bg-success/10 text-success' },
  warning: { icon: 'text-warning', badge: 'bg-warning/10 text-warning' },
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

export function AlertIcon({ className, badge = false, ...props }: AlertIconProps): React.ReactElement {
  const { variant = 'default' } = React.useContext(AlertContext)
  const styles = iconVariantStyles[variant] ?? iconVariantStyles.default

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
    />
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
