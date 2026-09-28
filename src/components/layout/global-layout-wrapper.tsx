'use client'

import { FloatNav } from '@/components/layout/float-nav'
import { SiteHeader } from '@/components/layout/site-header'
import { BrandColorProvider } from '@/components/providers/brand-color-provider'
import { BundleProvider } from '@/components/providers/bundle-provider'
import { FloatNavProvider, useFloatNavRequested } from '@/components/providers/float-nav-provider'
import { LayoutModeProvider, Mode, useLayoutMode, type LayoutMode } from '@/components/providers/layout-mode-provider'
import { PackageManagerProvider } from '@/components/providers/package-manager-provider'
import { SoundProvider } from '@/components/providers/sound-provider'
import { SquircleProvider } from '@/components/providers/squircle-provider'
import { ThemeLockProvider } from '@/components/providers/theme-lock-provider'
import { AnchoredToastProvider, ToastProvider } from '@/registry/primitives/toast'
import { usePathname } from 'next/navigation'

function GlobalLayoutContent({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const { isStandard, isImmersive } = useLayoutMode()
  const toolWantsFloatNav = useFloatNavRequested()
  const isResourceStudio = pathname.startsWith('/tools/')
  const marketingRoutes = ['/', '/tools', '/pricing', '/terms', '/privacy']

  const marketingStartsWithRoutes = ['/showcase']

  const isMarketing =
    marketingRoutes.includes(pathname) || marketingStartsWithRoutes.some((route) => pathname.startsWith(route))

  const isInteractionsSubpage =
    (pathname.startsWith('/interactions/') && pathname !== '/interactions/') ||
    (pathname.startsWith('/library/interactions/') && pathname !== '/library/interactions/') ||
    (pathname.startsWith('/ui-kit/interactions/') && pathname !== '/ui-kit/interactions/')

  const floatNavClass = isMarketing || isInteractionsSubpage ? 'bottom-6' : undefined

  if (isImmersive) {
    return <>{children}</>
  }

  // /tools/* pages use their own ResourceStudio toolbar and skip SiteHeader —
  // a tool opts back into the global FloatNav via useFloatNav() instead of
  // this route check hardcoding per-tool exceptions.
  if (isResourceStudio) {
    return (
      <>
        {children}
        {toolWantsFloatNav && <FloatNav className="bottom-6" />}
      </>
    )
  }

  if (isMarketing) {
    return (
      <>
        <SiteHeader />
        {children}
        <FloatNav className="bottom-6" />
      </>
    )
  }

  if (!isStandard) {
    return (
      <>
        {children}
        <FloatNav className={floatNavClass} />
      </>
    )
  }

  return (
    <>
      <SiteHeader />
      {children}
      {/* <SiteFooter /> */}
      <FloatNav className={floatNavClass} />
    </>
  )
}

export function GlobalLayoutWrapper({
  children,
  initialLayoutMode = Mode.standard,
}: {
  children: React.ReactNode
  initialLayoutMode?: LayoutMode
}) {
  const pathname = usePathname()
  const isPreview = pathname.startsWith('/registry/view') || pathname.startsWith('/examples')

  const content = isPreview ? (
    children
  ) : (
    <ThemeLockProvider>
      <PackageManagerProvider>
        <BrandColorProvider>
          <BundleProvider>
            <LayoutModeProvider initialMode={initialLayoutMode}>
              <FloatNavProvider>
                <GlobalLayoutContent>{children}</GlobalLayoutContent>
              </FloatNavProvider>
            </LayoutModeProvider>
          </BundleProvider>
        </BrandColorProvider>
      </PackageManagerProvider>
    </ThemeLockProvider>
  )

  return (
    <SquircleProvider>
      <ToastProvider>
        <AnchoredToastProvider>
          <SoundProvider>{content}</SoundProvider>
        </AnchoredToastProvider>
      </ToastProvider>
    </SquircleProvider>
  )
}
