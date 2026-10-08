'use client'

import * as React from 'react'
import { useReducedMotion } from 'motion/react'
import Image from 'next/image'
import { useTheme } from 'next-themes'
import { CARD_MEDIA, cardMediaUrl, type CardMediaEntry } from '@/config/card-media'
import { useInView } from '@/registry/hooks/animation/use-in-view'
import { CardPanel } from '@/registry/primitives/card'
import { cn } from '@/registry/lib/utils'

const subscribeToVisibility = (onChange: () => void) => {
  document.addEventListener('visibilitychange', onChange)
  return () => document.removeEventListener('visibilitychange', onChange)
}

/** False while the tab is in the background. */
function usePageVisible() {
  return React.useSyncExternalStore(
    subscribeToVisibility,
    () => document.visibilityState === 'visible',
    () => true,
  )
}

const noopSubscribe = () => () => {}

/** False on the server and during hydration, true once mounted. */
function useHydrated() {
  return React.useSyncExternalStore(
    noopSubscribe,
    () => true,
    () => false,
  )
}

interface CardMediaSlot {
  id: string
  media: CardMediaEntry
  active: boolean
}

const CardMediaContext = React.createContext<CardMediaSlot | null>(null)

/**
 * A grid slot for a showcase card. With a pre-rendered loop published in `CARD_MEDIA`, the card's
 * demo area plays that video and its live demo never starts; otherwise the live demo runs, only
 * while the card is near the screen and the tab is visible (one observer per card: a single
 * grid-wide one started every demo at once).
 */
export function MediaCard({
  id,
  className,
  children,
}: {
  /** Card Studio id of the rendered loop. */
  id: string
  /** Grid placement (spans): this wrapper is the grid item. */
  className?: string
  children: (active: boolean) => React.ReactNode
}) {
  const [ref, inView] = useInView({ rootMargin: '100px 0px', initialInView: false })
  const pageVisible = usePageVisible()
  const active = inView && pageVisible
  const media = CARD_MEDIA[id]

  return (
    <div ref={ref} className={cn('relative h-full min-w-0 max-w-full', className)}>
      {media ? <CardMediaContext value={{ id, media, active }}>{children(false)}</CardMediaContext> : children(active)}
    </div>
  )
}

/**
 * Drop-in for a showcase card's `CardPanel`: the live panel, or its pre-rendered loop when the card
 * sits in a `MediaCard` slot that has one.
 */
export function CardMediaPanel({ children, ...props }: React.ComponentProps<typeof CardPanel>) {
  const slot = React.use(CardMediaContext)
  if (!slot) return <CardPanel {...props}>{children}</CardPanel>
  return <CardVideo {...slot} />
}

function CardVideo({ id, media, active }: CardMediaSlot) {
  const hydrated = useHydrated()
  const reduceMotion = useReducedMotion()
  const { resolvedTheme } = useTheme()
  const videoRef = React.useRef<HTMLVideoElement>(null)
  const [playingSrc, setPlayingSrc] = React.useState<string | null>(null)

  // Reduced motion keeps the poster; the video only exists once the theme is known.
  const src =
    hydrated && !reduceMotion ? cardMediaUrl(id, resolvedTheme === 'dark' ? 'dark' : 'light', 'video', media.v) : null

  React.useEffect(() => {
    const video = videoRef.current
    if (!video) return
    if (active) video.play().catch(() => {})
    else video.pause()
  }, [active, src])

  // Full width on phones, half a row on tablets, the card's own width from the desktop grid up.
  const sizes = `(min-width: 1024px) ${media.width}px, (min-width: 640px) 50vw, 100vw`

  return (
    <div
      data-slot="card-panel"
      className="relative flex-1 overflow-hidden rounded-lg pointer-events-none"
      style={{ aspectRatio: `${media.width} / ${media.height}` }}
    >
      {/* Both posters are in the markup so the right one shows before hydration, in either theme;
          next/image serves them resized to the card and in AVIF/WebP. */}
      <Image
        src={cardMediaUrl(id, 'light', 'poster', media.v)}
        alt=""
        aria-hidden
        fill
        sizes={sizes}
        className="object-cover dark:hidden"
      />
      <Image
        src={cardMediaUrl(id, 'dark', 'poster', media.v)}
        alt=""
        aria-hidden
        fill
        sizes={sizes}
        className="hidden object-cover dark:block"
      />
      {src ? (
        <video
          key={src}
          ref={videoRef}
          src={src}
          muted
          loop
          playsInline
          preload="none"
          aria-hidden
          tabIndex={-1}
          disablePictureInPicture
          disableRemotePlayback
          controls={false}
          onPlaying={() => setPlayingSrc(src)}
          className={cn(
            'pointer-events-none absolute inset-0 size-full object-cover select-none transition-opacity duration-300',
            playingSrc === src ? 'opacity-100' : 'opacity-0',
          )}
        />
      ) : null}
    </div>
  )
}
