'use client'

import type * as React from 'react'
import {
  Tabs as PrimitiveTabs,
  TabsList as PrimitiveTabsList,
  TabsPanel as PrimitiveTabsPanel,
  TabsTab as PrimitiveTabsTab,
} from '@/registry/primitives/tabs'
import { cn } from '@/registry/lib/utils'
import { bloomSound } from '@/components/providers/sound-provider'

function SpaceCodeTabs({ className, ...props }: React.ComponentProps<typeof PrimitiveTabs>) {
  return <PrimitiveTabs className={cn('w-full not-prose gap-4', className)} defaultValue="cli" {...props} />
}

function TabsList({ className, children, ...props }: React.ComponentProps<typeof PrimitiveTabsList>) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3">
      <PrimitiveTabsList
        className={cn(
          'flex items-center rounded-lg bg-muted p-1 font-medium relative z-0',
          // 'ml-auto',
          className,
        )}
        aria-label="Installation Method"
        {...props}
      >
        {children}
      </PrimitiveTabsList>
    </div>
  )
}

function TabsTab({ className, onClick, ...props }: React.ComponentProps<typeof PrimitiveTabsTab>) {
  return (
    <PrimitiveTabsTab
      onClick={(e) => {
        bloomSound()
        onClick?.(e)
      }}
      className={cn(
        'relative z-10 px-2.5 py-1.5 text-xs font-semibold text-muted-foreground hover:text-foreground data-active:text-foreground outline-none cursor-pointer transition-all duration-300 data-active:bg-background',
        className,
      )}
      {...props}
    />
  )
}

function TabsPanel({ className, ...props }: React.ComponentProps<typeof PrimitiveTabsPanel>) {
  return <PrimitiveTabsPanel className={cn('rounded-[0.875rem] outline-none', className)} {...props} />
}

export { SpaceCodeTabs, TabsList, TabsPanel, TabsTab }
