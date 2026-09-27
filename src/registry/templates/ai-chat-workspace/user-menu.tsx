'use client'

import { Badge } from '@/registry/components/spaceui/badge-squircle'
import { Button as ButtonSquircle } from '@/registry/components/button/button-squircle'
import { cn } from '@/registry/lib/utils'
import { Avatar, AvatarFallback, AvatarImage } from '@/registry/primitives/avatar'
import {
  IconChevronDown,
  IconCommand,
  IconCreditCard,
  IconHelp,
  IconKey,
  IconLogout,
  IconMoon,
  IconSelector,
  IconSettings,
  IconSun,
  IconUsers,
  IconWorld,
} from '@tabler/icons-react'
import { AnimatePresence, motion } from 'motion/react'
import * as React from 'react'
import { CURRENT_USER } from './data'

const RAINBOW_ORBS = [
  { color: '#fc0197', x: ['28%', '-20%', '40%', '28%'], y: ['33%', '-40%', '10%', '33%'] },
  { color: '#fe9efb', x: ['-50%', '30%', '-15%', '-50%'], y: ['44%', '-30%', '55%', '44%'] },
  { color: '#fdf301', x: ['-36%', '25%', '-50%', '-36%'], y: ['44%', '-40%', '20%', '44%'] },
  { color: '#f66315', x: ['-3%', '45%', '-30%', '-3%'], y: ['78%', '10%', '-25%', '78%'] },
  { color: '#02defc', x: ['-60%', '15%', '40%', '-60%'], y: ['26%', '-50%', '60%', '26%'] },
  { color: '#7ffe00', x: ['63%', '-40%', '20%', '63%'], y: ['88%', '20%', '-35%', '88%'] },
]

export function RainbowProBadge({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        'relative inline-flex h-5 items-center justify-center overflow-hidden [corner-shape:superellipse(1.25)] rounded-md px-1.5 text-[0.625rem] font-bold uppercase tracking-wider text-white select-none',
        className,
      )}
    >
      <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none overflow-hidden">
        {RAINBOW_ORBS.map((orb, index) => (
          <motion.div
            key={index}
            className="absolute size-5 rounded-full"
            style={{
              backgroundColor: orb.color,
              filter: 'blur(3px)',
            }}
            animate={{
              x: orb.x,
              y: orb.y,
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
              repeatType: 'loop',
            }}
          />
        ))}
      </div>
      <span className="absolute inset-px z-10 [corner-shape:superellipse(1.25)] rounded-[0.3125rem] bg-neutral-950" />
      <span className="relative z-20 font-bold tracking-wider text-white [text-shadow:0_1px_2px_rgba(0,0,0,0.8)]">
        PRO
      </span>
    </span>
  )
}

export function RainbowUpgradeButton({ onClick, className }: { onClick?: () => void; className?: string }) {
  return (
    <ButtonSquircle
      type="button"
      variant="ghost"
      squircle
      onClick={onClick}
      className={cn(
        'group relative inline-flex h-6 cursor-pointer items-center justify-center overflow-hidden rounded-full px-2.5 py-0 select-none outline-none focus-visible:ring-1 focus-visible:ring-primary',
        className,
      )}
    >
      <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none overflow-hidden">
        {RAINBOW_ORBS.map((orb, index) => (
          <motion.div
            key={index}
            className="absolute size-8 rounded-full"
            style={{
              backgroundColor: orb.color,
              filter: 'blur(0.3125rem)',
            }}
            animate={{
              x: orb.x,
              y: orb.y,
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
              repeatType: 'loop',
            }}
          />
        ))}
      </div>
      <div className="absolute inset-px z-10 [corner-shape:superellipse(1.25)] rounded-full bg-neutral-900 group-hover:bg-neutral-800 transition-colors" />
      <span className="relative z-20 text-[0.6875rem] font-semibold text-white [text-shadow:0_1px_2px_rgba(0,0,0,0.6)]">
        Upgrade
      </span>
    </ButtonSquircle>
  )
}

export function CustomSwitch({ checked }: { checked: boolean }) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        'relative inline-flex h-5 w-9 shrink-0 items-center rounded-full p-0.5 transition duration-200',
        checked ? 'bg-primary' : 'bg-muted',
      )}
    >
      <span
        className={cn(
          'grid size-4 place-items-center rounded-full bg-background transition duration-200',
          checked ? 'translate-x-4' : 'translate-x-0',
        )}
      >
        <span className={cn('size-1.5 rounded-full', checked ? 'bg-primary' : 'bg-muted-foreground')} />
      </span>
    </span>
  )
}

export interface UserMenuProps {
  theme: 'dark' | 'light'
  setTheme: (val: 'dark' | 'light') => void
  compact?: boolean
}

export function UserMenu({ theme, setTheme, compact = false }: UserMenuProps) {
  const [open, setOpen] = React.useState(false)
  const ref = React.useRef<HTMLDivElement>(null)
  const isDark = theme === 'dark'

  React.useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    if (open) {
      document.addEventListener('mousedown', handleClickOutside)
      return () => document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [open])

  return (
    <div ref={ref} className="relative w-full">
      <ButtonSquircle
        type="button"
        variant="ghost"
        squircle
        onClick={() => setOpen((prev) => !prev)}
        aria-label="Open account menu"
        className={cn(
          'outline-none transition focus-visible:ring-1 focus-visible:ring-ring cursor-pointer hover:bg-accent h-auto border-0 shadow-none font-normal',
          compact
            ? 'flex size-9 items-center justify-center rounded-full mx-auto p-0'
            : 'flex w-full items-center justify-start gap-3 rounded-xl p-1.5 pr-2 text-left',
        )}
      >
        <Avatar className="size-8 shrink-0 ring-1 ring-border">
          <AvatarImage src="https://avatars.spaceui.one/v1?name=adriel&variant=pebble" alt={CURRENT_USER.name} />
          <AvatarFallback className="text-xs font-semibold">{CURRENT_USER.initials}</AvatarFallback>
        </Avatar>

        {!compact && (
          <>
            <div className="min-w-0 flex-1">
              <div className="flex min-w-0 items-center gap-2">
                <span className="truncate text-sm font-medium leading-tight text-foreground">{CURRENT_USER.name}</span>
                <RainbowProBadge />
              </div>
              <p className="mt-0.5 truncate text-xs font-normal leading-tight text-muted-foreground">
                {CURRENT_USER.email}
              </p>
            </div>
            <IconSelector className="size-4 shrink-0 text-muted-foreground" stroke={1.8} />
          </>
        )}
      </ButtonSquircle>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.98 }}
            transition={{ duration: 0.16, ease: [0.16, 1, 0.3, 1] }}
            className={cn(
              'z-50 border border-muted bg-card text-card-foreground [corner-shape:superellipse(1.25)] max-h-[85vh] overflow-y-auto',
              compact
                ? 'absolute bottom-0 left-[calc(100%+0.75rem)] w-72 rounded-2xl p-2'
                : 'absolute -bottom-2 -inset-x-1.5 rounded-2xl p-2 pb-2.5',
            )}
          >
            <div className="flex items-center justify-between gap-2 p-1.5">
              <div className="flex min-w-0 items-center gap-2.5">
                <Avatar className="size-9 shrink-0 ring-1 ring-border">
                  <AvatarImage
                    src="https://avatars.spaceui.one/v1?name=adriel&variant=pebble"
                    alt={CURRENT_USER.name}
                  />
                  <AvatarFallback className="text-xs font-semibold">{CURRENT_USER.initials}</AvatarFallback>
                </Avatar>
                <div className="min-w-0 flex-1">
                  <div className="flex min-w-0 items-center gap-1.5">
                    <span className="truncate text-sm font-semibold leading-tight text-foreground">
                      {CURRENT_USER.name}
                    </span>
                    <RainbowProBadge />
                  </div>
                  <div className="mt-0.5 truncate text-xs font-normal leading-tight text-muted-foreground">
                    {CURRENT_USER.email}
                  </div>
                </div>
              </div>
              <ButtonSquircle
                type="button"
                variant="ghost"
                size="icon-xs"
                squircle
                onClick={() => setOpen(false)}
                aria-label="Close user menu"
                className="flex size-7 shrink-0 cursor-pointer items-center justify-center text-muted-foreground hover:bg-accent hover:text-foreground transition"
              >
                <IconChevronDown className="size-4" stroke={1.9} />
              </ButtonSquircle>
            </div>

            <div className="mx-1 my-1.5 h-px bg-muted" />

            <div className="space-y-0.5">
              <ButtonSquircle
                type="button"
                variant="ghost"
                squircle
                className="flex h-9 w-full cursor-pointer items-center justify-between px-2.5 text-sm font-medium transition hover:bg-accent text-foreground"
              >
                <div className="flex items-center gap-2.5">
                  <IconUsers className="size-4 shrink-0 text-muted-foreground" stroke={1.8} />
                  <span>Space UI Workspace</span>
                </div>
                <Badge variant="outline" size="xs" className="text-[0.625rem] px-1.5 py-0.5 font-medium">
                  Team
                </Badge>
              </ButtonSquircle>
            </div>

            <div className="mx-1 my-1.5 h-px bg-muted" />

            <div className="space-y-0.5">
              <ButtonSquircle
                type="button"
                variant="ghost"
                squircle
                className="flex h-9 w-full cursor-pointer items-center justify-start gap-2.5 px-2.5 text-sm font-medium transition hover:bg-accent text-muted-foreground hover:text-foreground"
              >
                <IconSettings className="size-4 shrink-0 text-muted-foreground" stroke={1.8} />
                <span>Preferences</span>
              </ButtonSquircle>

              <ButtonSquircle
                type="button"
                variant="ghost"
                squircle
                className="flex h-9 w-full cursor-pointer items-center justify-start gap-2.5 px-2.5 text-sm font-medium transition hover:bg-accent text-muted-foreground hover:text-foreground"
              >
                <IconKey className="size-4 shrink-0 text-muted-foreground" stroke={1.8} />
                <span>API Keys & Endpoints</span>
              </ButtonSquircle>

              <ButtonSquircle
                type="button"
                variant="ghost"
                squircle
                className="flex h-9 w-full cursor-pointer items-center justify-between px-2.5 text-sm font-medium transition hover:bg-accent text-muted-foreground hover:text-foreground"
              >
                <div className="flex items-center gap-2.5">
                  <IconCreditCard className="size-4 shrink-0 text-muted-foreground" stroke={1.8} />
                  <span>Subscription</span>
                </div>
                <Badge variant="secondary" size="xs" className="text-[0.625rem] px-1.5 py-0.5 font-medium">
                  Pro Active
                </Badge>
              </ButtonSquircle>

              <ButtonSquircle
                type="button"
                variant="ghost"
                squircle
                className="flex h-9 w-full cursor-pointer items-center justify-between px-2.5 text-sm font-medium transition hover:bg-accent text-muted-foreground hover:text-foreground"
              >
                <div className="flex items-center gap-2.5">
                  <IconCommand className="size-4 shrink-0 text-muted-foreground" stroke={1.8} />
                  <span>Shortcuts</span>
                </div>
                <span className="text-[0.6875rem] font-semibold text-muted-foreground bg-muted px-1.5 py-0.5 rounded">
                  Ctrl K
                </span>
              </ButtonSquircle>
            </div>

            <div className="mx-1 my-1.5 h-px bg-muted" />

            <div className="space-y-0.5">
              <ButtonSquircle
                type="button"
                variant="ghost"
                squircle
                onClick={() => setTheme(isDark ? 'light' : 'dark')}
                className="flex h-9 w-full cursor-pointer items-center justify-between px-2.5 text-sm font-medium transition hover:bg-accent text-foreground"
              >
                <div className="flex items-center gap-2.5">
                  {isDark ? (
                    <IconMoon className="size-4 shrink-0 text-muted-foreground" stroke={1.8} />
                  ) : (
                    <IconSun className="size-4 shrink-0 text-muted-foreground" stroke={1.8} />
                  )}
                  <span>Dark Mode</span>
                </div>
                <CustomSwitch checked={isDark} />
              </ButtonSquircle>

              <ButtonSquircle
                type="button"
                variant="ghost"
                squircle
                className="flex h-9 w-full cursor-pointer items-center justify-between px-2.5 text-sm font-medium transition hover:bg-accent text-muted-foreground hover:text-foreground"
              >
                <div className="flex items-center gap-2.5">
                  <IconWorld className="size-4 shrink-0 text-muted-foreground" stroke={1.8} />
                  <span>Language</span>
                </div>
                <span className="text-xs text-muted-foreground">English (US)</span>
              </ButtonSquircle>

              <ButtonSquircle
                type="button"
                variant="ghost"
                squircle
                className="flex h-9 w-full cursor-pointer items-center justify-start gap-2.5 px-2.5 text-sm font-medium transition hover:bg-accent text-muted-foreground hover:text-foreground"
              >
                <IconHelp className="size-4 shrink-0 text-muted-foreground" stroke={1.8} />
                <span>Help & Documentation</span>
              </ButtonSquircle>
            </div>

            <div className="mx-1 my-1.5 h-px bg-muted" />

            <ButtonSquircle
              type="button"
              variant="ghost"
              squircle
              onClick={() => {}}
              className="flex h-9 w-full cursor-pointer items-center justify-start gap-2.5 px-2.5 text-sm font-medium transition text-destructive hover:bg-accent hover:text-destructive"
            >
              <IconLogout className="size-4" stroke={1.8} />
              <span>Log out</span>
            </ButtonSquircle>

            <div className="px-2.5 pb-1 pt-1.5 text-[0.6875rem] font-medium text-muted-foreground flex items-center justify-between">
              <span>v1.6.0 · Space UI</span>
              <span className="text-[0.625rem] text-muted-foreground/80">Active</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
