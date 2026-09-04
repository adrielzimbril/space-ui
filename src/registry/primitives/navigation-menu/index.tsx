'use client'

import { NavigationMenu as NavigationMenuPrimitive } from '@base-ui/react/navigation-menu'
import { cva } from 'class-variance-authority'
import { ChevronDownIcon } from 'lucide-react'
import type * as React from 'react'
import { cn } from '@/registry/lib/utils'

export const navigationMenuTriggerStyle = cva(
  'group inline-flex h-9 w-max items-center justify-center rounded-md bg-background px-3 py-1.5 text-sm font-medium transition-colors hover:bg-muted focus:bg-muted focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[state=open]:bg-muted data-popup-open:bg-muted cursor-pointer select-none',
)

export function NavigationMenu({
  className,
  children,
  ...props
}: NavigationMenuPrimitive.Root.Props): React.ReactElement {
  return (
    <NavigationMenuPrimitive.Root
      className={cn('relative z-10 flex max-w-max flex-1 items-center justify-center', className)}
      data-slot="navigation-menu"
      {...props}
    >
      {children}
    </NavigationMenuPrimitive.Root>
  )
}

export function NavigationMenuList({ className, ...props }: NavigationMenuPrimitive.List.Props): React.ReactElement {
  return (
    <NavigationMenuPrimitive.List
      className={cn('group flex flex-1 list-none items-center justify-center gap-1', className)}
      data-slot="navigation-menu-list"
      {...props}
    >
      {props.children}
    </NavigationMenuPrimitive.List>
  )
}

export function NavigationMenuItem({ className, ...props }: NavigationMenuPrimitive.Item.Props): React.ReactElement {
  return (
    <NavigationMenuPrimitive.Item className={cn('relative', className)} data-slot="navigation-menu-item" {...props} />
  )
}

export function NavigationMenuTrigger({
  className,
  children,
  ...props
}: NavigationMenuPrimitive.Trigger.Props): React.ReactElement {
  return (
    <NavigationMenuPrimitive.Trigger
      className={cn(navigationMenuTriggerStyle(), 'gap-1', className)}
      data-slot="navigation-menu-trigger"
      {...props}
    >
      {children}
      <ChevronDownIcon
        aria-hidden="true"
        className="size-3.5 transition-transform duration-200 group-data-popup-open:rotate-180 group-data-[state=open]:rotate-180 opacity-70"
      />
    </NavigationMenuPrimitive.Trigger>
  )
}

export function NavigationMenuContent({
  className,
  ...props
}: NavigationMenuPrimitive.Content.Props): React.ReactElement {
  return (
    <NavigationMenuPrimitive.Content
      className={cn('w-full outline-none p-1', className)}
      data-slot="navigation-menu-content"
      {...props}
    />
  )
}

export function NavigationMenuPortal({ ...props }: NavigationMenuPrimitive.Portal.Props): React.ReactElement {
  return <NavigationMenuPrimitive.Portal {...props} />
}

export function NavigationMenuPositioner({
  className,
  sideOffset = 8,
  align = 'center',
  ...props
}: NavigationMenuPrimitive.Positioner.Props): React.ReactElement {
  return (
    <NavigationMenuPrimitive.Positioner
      sideOffset={sideOffset}
      align={align}
      className={cn('z-50', className)}
      data-slot="navigation-menu-positioner"
      {...props}
    />
  )
}

export function NavigationMenuPopup({ className, ...props }: NavigationMenuPrimitive.Popup.Props): React.ReactElement {
  return (
    <NavigationMenuPrimitive.Popup
      className={cn(
        'relative origin-(--transform-origin) overflow-hidden rounded-xl border border-border bg-popover text-popover-foreground transition-[width,height] duration-200 outline-none ease-out',
        'data-[ending-style]:scale-95 data-[ending-style]:opacity-0 data-[starting-style]:scale-95 data-[starting-style]:opacity-0',
        className,
      )}
      data-slot="navigation-menu-popup"
      {...props}
    />
  )
}

export function NavigationMenuViewport({
  className,
  ...props
}: NavigationMenuPrimitive.Viewport.Props): React.ReactElement {
  return (
    <NavigationMenuPrimitive.Viewport
      className={cn(
        'relative h-[var(--navigation-menu-viewport-height)] w-[var(--navigation-menu-viewport-width)] transition-[width,height] duration-200',
        className,
      )}
      data-slot="navigation-menu-viewport"
      {...props}
    />
  )
}

export function NavigationMenuLink({ className, ...props }: NavigationMenuPrimitive.Link.Props): React.ReactElement {
  return (
    <NavigationMenuPrimitive.Link
      className={cn(
        'block select-none rounded-lg p-3 text-sm leading-none no-underline outline-none transition-colors hover:bg-muted hover:text-accent-foreground focus:bg-muted focus:text-accent-foreground',
        className,
      )}
      data-slot="navigation-menu-link"
      {...props}
    />
  )
}

export function NavigationMenuArrow({ className, ...props }: NavigationMenuPrimitive.Arrow.Props): React.ReactElement {
  return (
    <NavigationMenuPrimitive.Arrow
      className={cn('data-[side=bottom]:top-[-8px] data-[side=top]:bottom-[-8px]', className)}
      data-slot="navigation-menu-arrow"
      {...props}
    />
  )
}

export function NavigationMenuBackdrop({
  className,
  ...props
}: NavigationMenuPrimitive.Backdrop.Props): React.ReactElement {
  return (
    <NavigationMenuPrimitive.Backdrop
      className={cn('fixed inset-0 z-40 bg-black/10 backdrop-blur-sm transition-opacity', className)}
      data-slot="navigation-menu-backdrop"
      {...props}
    />
  )
}

export { NavigationMenuPrimitive, NavigationMenu as NavigationMenuRoot }
