'use client'

import * as React from 'react'
import Link from 'next/link'
import { PageLayoutSync } from '@/components/docs/layout/page-layout-sync'
import { SiteHeader } from '@/components/layout/site-header'
import { SiteFooter } from '@/components/layout/site-footer'
import { bloomSound, tickSound } from '@/components/providers/sound-provider'
import { Mode } from '@/config/preview-config'
import { Animoji } from '@/registry/components/spaceui/animoji'
import { Button } from '@/registry/components/button/button-squircle'
import { PixelRevealText } from '@/registry/components/spaceui/pixel-reveal-text'
import { useMediaQuery } from '@/registry/hooks/browser/use-media-query'
import { OpenRunde } from '@/registry/lib/fonts/open-runde'
import { cn } from '@/registry/lib/utils'
import { logger } from '@/registry/utils/logger'

export interface ErrorProps {
  error?: Error & { digest?: string }
  reset?: () => void
}

export default function ErrorPage({ error, reset }: ErrorProps) {
  React.useEffect(() => {
    if (error) {
      logger.error(error)
    }
  }, [error])

  const isXl = useMediaQuery('(min-width: 1440px)', true)
  const isLg = useMediaQuery('(min-width: 1024px)', true)
  const isSm = useMediaQuery('(min-width: 640px)', true)
  const fontSize = isXl ? 132 : isLg ? 102 : isSm ? 88 : 74

  const handleReset = () => {
    bloomSound()
    if (reset) {
      reset()
    } else if (typeof window !== 'undefined') {
      window.location.reload()
    }
  }

  return (
    <div
      className={cn(
        OpenRunde.variable,
        'font-open-runde!',
        '[--font-body:var(--font-open-runde),sans-serif]! [--font-heading:var(--font-open-runde),sans-serif]! [--font-sans:var(--font-open-runde),sans-serif]!',
        'flex flex-col min-h-screen bg-background text-foreground',
      )}
    >
      <PageLayoutSync mode={Mode.standard} defaultMode={Mode.standard} />

      <SiteHeader />

      <main className="flex flex-1 flex-col items-center justify-center min-h-[calc(80dvh-4rem)] px-5 sm:px-6 py-20 md:py-28 text-center">
        <div className="flex flex-col items-center justify-center max-w-xl mx-auto">
          <div className="relative flex items-center justify-center select-none">
            <PixelRevealText fontSize={fontSize} pixelSize={4} trigger="loop" speed={0.8}>
              5<Animoji source="telegram">💥</Animoji>0
            </PixelRevealText>
          </div>

          <h1 className="mt-6 text-balance text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-foreground">
            <Animoji source="telegram">Something went wrong 🐞</Animoji>
          </h1>

          <p className="mt-3 text-balance text-base sm:text-lg tracking-tight text-muted-foreground leading-relaxed max-w-[48ch]">
            <Animoji source="telegram">
              An unexpected glitch occurred in orbit. Don&apos;t worry, every other component is intact and you can try
              again.
            </Animoji>
          </p>

          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button variant="primary" size="lg" pointer hover whileTap onClick={handleReset} className="border-none">
              <span>Try Again</span>
            </Button>

            <Button
              render={<Link href="/" />}
              variant="base"
              size="lg"
              pointer
              hover
              whileTap
              onClick={() => tickSound()}
            >
              <span>Back Home</span>
            </Button>
          </div>
        </div>
      </main>

      <SiteFooter />
    </div>
  )
}
