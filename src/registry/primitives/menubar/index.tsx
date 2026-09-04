'use client'

import { Menubar as MenubarPrimitive } from '@base-ui/react/menubar'
import { Menu as MenuPrimitive } from '@base-ui/react/menu'
import * as React from 'react'
import { cn } from '@/registry/lib/utils'
import {
  MenuPopup,
  MenuGroup,
  MenuItem,
  MenuCheckboxItem,
  MenuRadioGroup,
  MenuRadioItem,
  MenuGroupLabel,
  MenuSeparator,
  MenuShortcut,
  MenuSub,
  MenuSubTrigger,
  MenuSubPopup,
} from '@/registry/primitives/menu'

export function Menubar({ className, ...props }: MenubarPrimitive.Props): React.ReactElement {
  return (
    <MenubarPrimitive
      className={cn('flex h-10 items-center gap-1 rounded-md border border-border bg-background p-1', className)}
      data-slot="menubar"
      {...props}
    />
  )
}

export const MenubarMenu: typeof MenuPrimitive.Root = MenuPrimitive.Root

export const MenubarPortal: typeof MenuPrimitive.Portal = MenuPrimitive.Portal

export function MenubarTrigger({ className, children, ...props }: MenuPrimitive.Trigger.Props): React.ReactElement {
  return (
    <MenuPrimitive.Trigger
      className={cn(
        'flex cursor-default select-none items-center rounded-sm px-3 py-1.5 text-sm font-medium outline-none hover:bg-accent focus:bg-accent data-popup-open:bg-accent data-[state=open]:bg-accent transition-colors',
        className,
      )}
      data-slot="menubar-trigger"
      {...props}
    >
      {children}
    </MenuPrimitive.Trigger>
  )
}

export function MenubarContent({
  className,
  align = 'start',
  alignOffset = -4,
  ...props
}: React.ComponentProps<typeof MenuPopup>): React.ReactElement {
  return (
    <MenuPopup align={align} alignOffset={alignOffset} className={className} data-slot="menubar-content" {...props} />
  )
}

export const MenubarGroup = MenuGroup
export const MenubarItem = MenuItem
export const MenubarCheckboxItem = MenuCheckboxItem
export const MenubarRadioGroup = MenuRadioGroup
export const MenubarRadioItem = MenuRadioItem
export const MenubarLabel = MenuGroupLabel
export const MenubarSeparator = MenuSeparator
export const MenubarShortcut = MenuShortcut
export const MenubarSub = MenuSub
export const MenubarSubTrigger = MenuSubTrigger

export function MenubarSubContent({
  className,
  align = 'start',
  alignOffset = -4,
  ...props
}: React.ComponentProps<typeof MenuSubPopup>): React.ReactElement {
  return (
    <MenuSubPopup
      align={align}
      alignOffset={alignOffset}
      className={className}
      data-slot="menubar-sub-content"
      {...props}
    />
  )
}

export { MenubarPrimitive, MenuPrimitive }
