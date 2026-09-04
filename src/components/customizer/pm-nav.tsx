'use client'

import React from 'react'
import { usePackageManager, type PackageManager } from '@/components/providers/package-manager-provider'
import { bloomSound, slideSound } from '@/components/providers/sound-provider'
import { Menu, MenuTrigger, MenuPopup, MenuItem } from '@/registry/primitives/menu'
import { Button } from '@/registry/primitives/button'
import { cn } from '@/registry/lib/utils'

export function PnpmIcon({ className }: { className?: string }) {
  return (
    <svg className={cn('size-3.5', className)} viewBox="0 0 24 24" fill="none">
      <path d="M3 3h5.143v5.143H3V3z" fill="#F69220" />
      <path d="M9.429 3h5.142v5.143H9.429V3z" fill="#F69220" />
      <path d="M15.857 3H21v5.143h-5.143V3z" fill="#F69220" />
      <path d="M9.429 9.429h5.142v5.142H9.429V9.429z" fill="#F69220" />
      <path d="M15.857 9.429H21v5.142h-5.143V9.429z" fill="#F69220" />
      <path d="M15.857 15.857H21V21h-5.143v-5.143z" fill="#4E4E4E" />
      <path d="M9.429 15.857h5.142V21H9.429v-5.143z" fill="#4E4E4E" />
      <path d="M3 15.857h5.143V21H3v-5.143z" fill="#4E4E4E" />
    </svg>
  )
}

export function NpmIcon({ className }: { className?: string }) {
  return (
    <svg className={cn('size-3.5', className)} viewBox="0 0 24 24" fill="none">
      <path d="M2 3h20v18H2V3z" fill="#CB3837" />
      <path d="M6 7h12v10h-4V10h-2v7H6V7z" fill="#FFFFFF" />
    </svg>
  )
}

export function YarnIcon({ className }: { className?: string }) {
  return (
    <svg className={cn('size-3.5', className)} viewBox="0 0 24 24" fill="currentColor">
      <path
        d="M12.01 2.01c-5.52 0-10 4.48-10 10 0 3.39 1.69 6.38 4.28 8.18l1.39-1.99a7.6 7.6 0 0 1-3.23-6.19c0-4.18 3.4-7.58 7.56-7.58 4.17 0 7.57 3.4 7.57 7.58 0 2.58-1.3 4.86-3.28 6.23l1.41 1.98a9.98 9.98 0 0 0 4.3-8.21c0-5.52-4.48-10-10-10z"
        fill="#2C8EBB"
      />
      <circle cx="12" cy="12" r="3" fill="#2C8EBB" />
    </svg>
  )
}

export function BunIcon({ className }: { className?: string }) {
  return (
    <svg className={cn('size-3.5', className)} viewBox="0 0 24 24" fill="currentColor">
      <path
        d="M18.8 8.2c-.3-.8-.9-1.5-1.7-1.9-1.4-.7-3.1-.7-4.6-.7-.8 0-1.7.1-2.5.3-1.6.4-3.1 1.4-4 2.8-.8 1.2-1.1 2.7-1 4.1.2 2.6 1.9 4.8 4.4 5.7 1.8.6 3.8.5 5.6-.2 1.9-.8 3.4-2.3 4.1-4.2.7-1.9.5-4.1-.3-5.9z"
        fill="#FBF0DF"
        stroke="#2E2E2E"
        strokeWidth="1.2"
      />
      <circle cx="9.5" cy="11.5" r="1.2" fill="#2E2E2E" />
      <circle cx="14.5" cy="11.5" r="1.2" fill="#2E2E2E" />
    </svg>
  )
}

const PM_LIST: { id: PackageManager; name: string; icon: React.ComponentType<{ className?: string }> }[] = [
  { id: 'pnpm', name: 'pnpm', icon: PnpmIcon },
  { id: 'npm', name: 'npm', icon: NpmIcon },
  { id: 'yarn', name: 'yarn', icon: YarnIcon },
  { id: 'bun', name: 'bun', icon: BunIcon },
]

export function PmNav() {
  const [activePm, setActivePm] = usePackageManager()
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  const displayPm = mounted ? activePm : 'pnpm'
  const current = PM_LIST.find((pm) => pm.id === displayPm) || PM_LIST[0]
  const CurrentIcon = current.icon

  return (
    <Menu>
      <MenuTrigger
        render={
          <Button
            variant="ghost"
            aria-label={`Package manager: ${displayPm}`}
            className="inline-flex items-center gap-1.5 rounded-lg! px-2.5 h-8 bg-background hover:bg-background text-muted-foreground hover:text-foreground cursor-pointer transition-colors"
            onClick={() => bloomSound()}
          />
        }
      >
        <CurrentIcon />
        <span className="font-mono text-xs font-semibold">{displayPm}</span>
      </MenuTrigger>

      <MenuPopup
        side="top"
        align="center"
        sideOffset={8}
        className="rounded-xl border border-border bg-popover p-1.5 min-w-[140px] z-50 flex flex-col gap-0.5"
      >
        <div className="text-[10px] font-semibold text-muted-foreground px-2 py-1 uppercase tracking-wider">
          Package Manager
        </div>
        {PM_LIST.map((pm) => {
          const Icon = pm.icon
          const active = pm.id === activePm
          return (
            <MenuItem
              key={pm.id}
              className={cn(
                'flex w-full cursor-pointer items-center gap-2 rounded-md px-2.5 py-1.5 text-left font-medium text-xs transition-colors',
                active
                  ? 'bg-muted text-foreground font-semibold'
                  : 'text-muted-foreground hover:bg-muted hover:text-foreground',
              )}
              onClick={() => {
                slideSound('in')
                setActivePm(pm.id)
              }}
            >
              <Icon className="shrink-0" />
              <span className="font-mono">{pm.name}</span>
            </MenuItem>
          )
        })}
      </MenuPopup>
    </Menu>
  )
}
