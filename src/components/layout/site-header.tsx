'use client'

import { MegaMenu } from '@/components/layout/mega-menu'
import { searchNavShortcuts } from '@/config/menu-config'
import { siteConfig } from '@/config/space-config'
import { trackPricingCtaClicked } from '@/lib/analytics/posthog'
import { Button as ButtonSquircle } from '@/registry/components/button/button-squircle'
import { GitHubLink } from '@/registry/components/spaceui/github-link'
import { LiquidBorder } from '@/registry/components/spaceui/liquid-metal-border'
import { Button } from '@/registry/primitives/button'
import { Kbd, KbdGroup } from '@/registry/primitives/kbd'
import { Link } from '@/registry/primitives/link'
import { IconBrandX, IconSearch, IconArrowUpRight, IconMenu2 } from '@tabler/icons-react'
import { turn as turnSound } from '@usespaceui/sounds'
import { Squishmoji } from '@usespaceui/squishmoji/react'
import { UserHeaderNav } from '@/components/layout/user-header-nav'
import { useAuth } from '@/components/providers/auth-provider'
import dynamic from 'next/dynamic'
import * as React from 'react'
import NextLink from 'next/link'

const CommandMenu = dynamic(() => import('@/components/layout/command-menu').then((mod) => mod.CommandMenu), {
  ssr: false,
  loading: () => (
    <Button variant="outline" size="lg" className="px-1 border-muted w-full">
      <span className="bg-muted aspect-square rounded-md px-1.5 py-0.5 inline-flex items-center justify-center">
        <IconSearch className="size-4 text-muted-foreground shrink-0" />
      </span>
      <span className="hidden sm:inline text-xs text-muted-foreground">Search…</span>
      <KbdGroup className="gap-1 ml-auto">
        <Kbd className="aspect-square">⌘</Kbd>
        <Kbd className="aspect-square">K</Kbd>
      </KbdGroup>
    </Button>
  ),
})

const loadMobileNavDrawer = () => import('@/components/layout/mobile-nav-drawer').then((mod) => mod.MobileNavDrawer)
const MobileNavDrawer = React.lazy(() =>
  loadMobileNavDrawer().then((MobileNavDrawer) => ({ default: MobileNavDrawer })),
)

/** The drawer's own trigger, rendered on the server so the icon is there from the first paint. */
function MobileNavTrigger({ onClick }: { onClick?: () => void }) {
  return (
    <Button
      variant="secondary"
      size="icon"
      className="rounded-md lg:hidden cursor-pointer"
      aria-label="Open Navigation Menu"
      onClick={onClick}
    >
      <IconMenu2 className="size-5" />
    </Button>
  )
}

/**
 * The drawer's code is heavy, so it loads after the page settles, never before the icon shows.
 * A tap that lands before it's ready is kept and opens the drawer as soon as it arrives.
 */
function LazyMobileNav() {
  const [load, setLoad] = React.useState(false)
  const [open, setOpen] = React.useState(false)

  React.useEffect(() => {
    const start = () => setLoad(true)
    if ('requestIdleCallback' in window) {
      const id = window.requestIdleCallback(start, { timeout: 3000 })
      return () => window.cancelIdleCallback(id)
    }
    const id = setTimeout(start, 1500)
    return () => clearTimeout(id)
  }, [])

  const openNow = () => {
    setLoad(true)
    setOpen(true)
  }

  if (!load) return <MobileNavTrigger onClick={openNow} />
  return (
    <React.Suspense fallback={<MobileNavTrigger onClick={() => setOpen(true)} />}>
      <MobileNavDrawer open={open} onOpenChange={setOpen} />
    </React.Suspense>
  )
}

export const SITE_NAV_ITEMS = searchNavShortcuts

export function SiteHeader() {
  const { user } = useAuth()

  const appMeta = (user?.app_metadata || {}) as Record<string, any>
  const userMeta = (user?.user_metadata || {}) as Record<string, any>
  const isPro = Boolean(
    user &&
    (appMeta.plan === 'pro' ||
      appMeta.plan === 'lifetime' ||
      appMeta.has_paid === true ||
      appMeta.subscription_status === 'active' ||
      userMeta.is_pro ||
      userMeta.isPro ||
      userMeta.plan === 'pro'),
  )

  return (
    <header className="sticky top-3 z-50 mx-auto w-full max-w-6xl px-3 sm:px-4 md:px-6 pointer-events-none -mb-17">
      <div className="relative mx-auto flex h-14 items-center justify-between gap-3 px-3 md:px-4 lg:px-6 rounded-2xl border border-border bg-background backdrop-blur-lg transition-colors duration-300 pointer-events-auto">
        {/* Left: Logo + MegaMenu beside it */}
        <div className="flex min-w-0 items-center gap-4 lg:gap-6">
          <Link
            href="/"
            aria-label="Space UI home"
            onClick={() => turnSound('back')}
            className="inline-flex items-center text-foreground gap-2.5 group motion-safe:active:scale-[0.97] transition-transform"
          >
            <div className="relative flex items-center justify-center size-8 shrink-0 overflow-visible">
              <Squishmoji
                seed="o"
                shape="lion"
                expression="loving"
                backgroundStyle="all"
                animate
                animOnClick
                animOnHover
                // animWobble
                size={48}
                className="relative scale-150 origin-center transition-transform"
              />
            </div>
          </Link>

          <nav className="hidden items-center gap-2 lg:flex">
            <MegaMenu />
          </nav>
        </div>

        {/* Right: Search, Socials, Liquid Metal Get Pro, Mobile Drawer */}
        <div className="flex min-w-0 items-center justify-end gap-1.5 sm:gap-2">
          <div className="hidden sm:block w-full flex-1 md:w-auto md:flex-none mr-1">
            <CommandMenu
              navItems={SITE_NAV_ITEMS.map((item) => ({
                href: item.href,
                label: item.label,
              }))}
            />
          </div>

          <div className="flex items-center gap-1">
            <Link
              href={siteConfig.links.x}
              aria-label="Follow on X"
              rel="noreferrer"
              target="_blank"
              asButton
              variant="secondary"
              size="icon"
              className="relative px-[calc(--spacing(3.5)-1px)] sm:h-8 shadow-none motion-safe:active:scale-[0.96] transition-transform"
            >
              <IconBrandX className="size-4" />
            </Link>
            <div className="motion-safe:active:scale-[0.96] transition-transform">
              <GitHubLink />
            </div>
          </div>

          {/* Liquid Metal Get Pro Button - hidden if user is logged in and already Pro */}
          {!isPro && (
            <NextLink
              href="/pricing"
              aria-label="Get Space UI Pro"
              onClick={() =>
                trackPricingCtaClicked({
                  plan: 'pro',
                  billing_period: 'yearly',
                  cta_position: 'header',
                  visit_number: 1,
                })
              }
              className="inline-flex items-center group motion-safe:active:scale-[0.97] transition-transform shrink-0"
            >
              <LiquidBorder className="inline-flex squircle rounded-full p-[1.5px] shrink-0" preset="chrome">
                <ButtonSquircle
                  variant="primary"
                  size="sm"
                  squircle
                  className="h-7.5 border-0 px-3 text-xs font-semibold gap-1.5 leading-none select-none shadow-none pointer-events-none"
                >
                  <span>Get Pro</span>
                  <IconArrowUpRight className="size-3.5 shrink-0 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </ButtonSquircle>
              </LiquidBorder>
            </NextLink>
          )}

          {/* User Account / Sign In */}
          <UserHeaderNav />

          <LazyMobileNav />
        </div>
      </div>
    </header>
  )
}
