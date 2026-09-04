'use client'

import type { CSSProperties } from 'react'
import { cn } from '@/registry/lib/utils'
import {
  IconChevronLeft,
  IconChevronRight,
  IconLoader2,
  IconPlayerPauseFilled,
  IconPlayerPlayFilled,
} from '@tabler/icons-react'
import { voices } from '../data'

export type OrbStyle = CSSProperties & {
  '--orb-x': string
  '--orb-mobile-x': string
  '--orb-scale': number
  '--orb-mobile-scale': number
}

export type VoiceDetailStyle = CSSProperties & {
  '--detail-x': string
}

export const focus =
  'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#266df0]'
export const buttonShadow = 'shadow-[0_0_1px_rgb(0_0_0_/_0.4),0_1px_1px_rgb(0_0_0_/_0.04),0_2px_4px_rgb(0_0_0_/_0.04)]'

export function Chevron({ direction }: { direction: 'previous' | 'next' }) {
  return direction === 'previous' ? (
    <IconChevronLeft aria-hidden="true" strokeWidth={1.5} className="size-5" />
  ) : (
    <IconChevronRight aria-hidden="true" strokeWidth={1.5} className="size-5" />
  )
}

export function PlayIcon({ playing }: { playing: boolean }) {
  if (playing) {
    return <IconPlayerPauseFilled aria-hidden="true" className="size-5" />
  }

  return <IconPlayerPlayFilled aria-hidden="true" className="size-5" />
}

export function SpeechLoadingSpinner() {
  return (
    <IconLoader2
      aria-hidden="true"
      strokeWidth={2.25}
      className="size-4 animate-spin"
      style={{ animationDuration: '0.7s' }}
    />
  )
}

export function VoiceDetails({ voiceIndex, muted = false }: { voiceIndex: number; muted?: boolean }) {
  const voice = voices[voiceIndex]

  return (
    <div className="flex h-20 min-w-0 flex-col items-center justify-center gap-2 text-center">
      <span
        className={cn(
          'inline-flex items-center rounded-sm text-[16px] leading-6',
          muted ? 'text-[#777169]' : 'text-black',
        )}
      >
        {voice.category}
      </span>
      <p
        className={cn(
          'm-0 max-w-[216px] text-[13px] leading-[18px] text-balance',
          muted ? 'text-[#a9a49e]' : 'text-[#777169]',
        )}
      >
        {voice.description}
      </p>
    </div>
  )
}

export function CompactPlayButton({
  playing,
  loading = false,
  onClick,
  iconOnly = false,
}: {
  playing: boolean
  loading?: boolean
  onClick: () => void
  iconOnly?: boolean
}) {
  return (
    <button
      type="button"
      aria-label={playing ? 'Pause' : 'Play'}
      disabled={loading}
      onClick={onClick}
      className={cn(
        'flex flex-none items-center justify-center rounded-full bg-black text-white transition hover:bg-[#59544f] disabled:cursor-default',
        focus,
        iconOnly || loading ? 'size-9' : 'h-9 px-3.5 text-[15px] leading-none',
      )}
    >
      {loading ? (
        <SpeechLoadingSpinner />
      ) : iconOnly ? (
        <span className="[&>svg]:!size-4">
          <PlayIcon playing={playing} />
        </span>
      ) : playing ? (
        'Pause'
      ) : (
        'Play'
      )}
    </button>
  )
}

export function SectionDivider() {
  return (
    <div className="relative mx-auto h-1 max-w-[1304px] border-x border-black/[.075] bg-black/[.075]">
      <span className="absolute top-1/2 left-0 z-20 flex size-5 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-[#fdfcfc]">
        <i className="size-0.5 rounded-full bg-black" />
      </span>
      <span className="absolute top-1/2 right-0 z-20 flex size-5 translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-[#fdfcfc]">
        <i className="size-0.5 rounded-full bg-black" />
      </span>
    </div>
  )
}
