'use client'

import type { CSSProperties } from 'react'
import { useRef, useState } from 'react'
import { cn } from '@/registry/lib/utils'
import { OrbSmooth } from '@/registry/components/orb/smooth'
import { voices } from '../../../data'
import { Chevron, PlayIcon, VoiceDetails, focus, buttonShadow } from '../../../components/shared'

export function VoiceGeneratorDemo() {
  const [activeVoice, setActiveVoice] = useState(5)
  const [isPlaying, setIsPlaying] = useState(false)
  const [playAfterSelection, setPlayAfterSelection] = useState(false)
  const [orbTextureReady, setOrbTextureReady] = useState<string | null>(null)
  const audioRef = useRef<HTMLAudioElement>(null)

  const selectVoice = (index: number) => {
    const audio = audioRef.current

    if (index !== activeVoice) {
      audio?.pause()
      setIsPlaying(false)
      setActiveVoice(index)
      setPlayAfterSelection(true)
      return
    }

    if (!audio) return
    if (audio.paused) {
      void audio.play().then(() => setIsPlaying(true))
    } else {
      audio.pause()
      setIsPlaying(false)
    }
  }

  const moveVoice = (direction: -1 | 1) => {
    const next = Math.min(voices.length - 1, Math.max(0, activeVoice + direction))
    if (next === activeVoice) return

    audioRef.current?.pause()
    setIsPlaying(false)
    setActiveVoice(next)
  }

  return (
    <>
      <div className="absolute inset-0 z-[2] overflow-hidden">
        {voices.map((voice, index) => {
          const offset = index - activeVoice
          const distance = Math.abs(offset)
          const direction = Math.sign(offset)

          const desktopX =
            distance === 0 ? 0 : direction * (distance === 1 ? 310 : distance === 2 ? 534 : 534 + (distance - 2) * 220)
          const mobileX =
            distance === 0 ? 0 : direction * (distance === 1 ? 200 : distance === 2 ? 292 : 292 + (distance - 2) * 120)

          const desktopScale = distance === 0 ? 1 : distance === 1 ? 0.787 : distance === 2 ? 0.567 : 0.4
          const mobileScale = distance === 0 ? 1 : distance === 1 ? 0.7 : distance === 2 ? 0.5 : 0.35
          const opacity = distance === 0 ? 1 : distance === 1 ? 0.96 : distance === 2 ? 0.72 : 0

          const orbStyle = {
            '--orb-x': `${desktopX}px`,
            '--orb-mobile-x': `${mobileX}px`,
            '--orb-scale': desktopScale,
            '--orb-mobile-scale': mobileScale,
            opacity,
            zIndex: Math.max(0, 3 - distance),
            pointerEvents: distance <= 2 ? 'auto' : 'none',
          } as CSSProperties

          return (
            <div
              key={voice.name}
              style={orbStyle}
              className="group absolute top-[127px] left-1/2 size-[200px] origin-center [transform:translate3d(calc(-50%+var(--orb-mobile-x)),0,0)_scale(var(--orb-mobile-scale))] will-change-[transform,opacity] transition-[transform,opacity] duration-700 ease-[cubic-bezier(.22,1,.36,1)] lg:top-[65px] lg:size-64 lg:[transform:translate3d(calc(-50%+var(--orb-x)),0,0)_scale(var(--orb-scale))]"
            >
              <button
                type="button"
                aria-label={`${isPlaying && distance === 0 ? 'Pause' : 'Play'} ${voice.name} preview`}
                onClick={() => selectVoice(index)}
                className={cn('absolute inset-0 z-30 cursor-pointer rounded-full', focus)}
              />
              <span className="pointer-events-none absolute -inset-1 scale-[.985] rounded-full border-4 border-[#ebe8e4] opacity-0 transition group-hover:scale-100 group-hover:opacity-100" />
              <span className="absolute inset-0 overflow-hidden rounded-full">
                <img src={voice.image} alt="" className="size-full object-cover" />
              </span>
              {distance === 0 && (
                <div
                  aria-hidden="true"
                  className={cn(
                    'pointer-events-none absolute inset-0 z-10 overflow-hidden rounded-full transition-opacity duration-500',
                    isPlaying ? 'opacity-100' : 'opacity-0',
                  )}
                >
                  <OrbSmooth
                    textureUrl={voice.image}
                    audioMode={isPlaying ? 'file' : 'ambient'}
                    audioElement={audioRef}
                    audioSrc={voice.preview}
                    sphereScale={0.9}
                    spherePower={1.1}
                    grainOpacity={0.42}
                    animated
                    onTextureReady={setOrbTextureReady}
                    size={256}
                    className="size-full"
                  />
                </div>
              )}
              {distance === 0 && (
                <span
                  aria-hidden="true"
                  className={cn(
                    'pointer-events-none absolute top-1/2 left-1/2 z-20 inline-flex size-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white text-black',
                    buttonShadow,
                  )}
                >
                  <PlayIcon playing={isPlaying} />
                </span>
              )}
            </div>
          )
        })}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 left-0 z-10 hidden w-44 bg-gradient-to-r from-[#f5f3f1] to-transparent md:block"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 right-0 z-10 hidden w-44 bg-gradient-to-l from-[#f5f3f1] to-transparent md:block"
        />
      </div>

      <div className="absolute top-[351px] right-4 left-4 z-[6] grid h-20 grid-cols-[44px_minmax(0,1fr)_44px] items-center gap-x-2 lg:hidden">
        <button
          type="button"
          aria-label="Previous voice"
          disabled={activeVoice === 0}
          onClick={() => moveVoice(-1)}
          className={cn(
            'inline-flex h-10 w-11 items-center justify-center rounded-full text-[#59544f] disabled:pointer-events-none disabled:opacity-0',
            focus,
          )}
        >
          <Chevron direction="previous" />
        </button>
        <div className="relative h-20 min-w-0 overflow-hidden">
          {voices.map((voice, index) => {
            const offset = index - activeVoice
            const distance = Math.abs(offset)
            const detailStyle = {
              '--detail-x': `${offset * 100}%`,
              opacity: distance === 0 ? 1 : 0,
              pointerEvents: distance === 0 ? 'auto' : 'none',
            } as CSSProperties

            return (
              <div
                key={voice.name}
                style={detailStyle}
                className="absolute top-0 left-1/2 h-20 w-full [transform:translate3d(calc(-50%+var(--detail-x)),0,0)] will-change-[transform,opacity] transition-[transform,opacity] duration-700 ease-[cubic-bezier(.22,1,.36,1)]"
              >
                <VoiceDetails voiceIndex={index} muted={distance !== 0} />
              </div>
            )
          })}
        </div>
        <button
          type="button"
          aria-label="Next voice"
          disabled={activeVoice === voices.length - 1}
          onClick={() => moveVoice(1)}
          className={cn(
            'inline-flex h-10 w-11 items-center justify-center rounded-full text-[#59544f] disabled:pointer-events-none disabled:opacity-0',
            focus,
          )}
        >
          <Chevron direction="next" />
        </button>
      </div>

      <div className="absolute top-[353px] left-1/2 z-[6] hidden h-20 w-[854px] -translate-x-1/2 overflow-hidden lg:block">
        {voices.map((voice, index) => {
          const offset = index - activeVoice
          const distance = Math.abs(offset)
          const detailStyle = {
            '--detail-x': `${offset * 309}px`,
            opacity: distance <= 1 ? 1 : 0,
            pointerEvents: distance === 0 ? 'auto' : 'none',
          } as CSSProperties

          return (
            <div
              key={voice.name}
              style={detailStyle}
              className="absolute top-0 left-1/2 h-20 w-[236px] px-4 [transform:translate3d(calc(-50%+var(--detail-x)),0,0)] will-change-[transform,opacity] transition-[transform,opacity] duration-700 ease-[cubic-bezier(.22,1,.36,1)]"
            >
              <VoiceDetails voiceIndex={index} muted={distance !== 0} />
            </div>
          )
        })}

        <button
          type="button"
          aria-label="Previous voice"
          disabled={activeVoice === 0}
          onClick={() => moveVoice(-1)}
          className={cn(
            'absolute top-5 left-[247.5px] inline-flex h-10 w-[50px] items-center justify-center rounded-full text-[#59544f] disabled:pointer-events-none disabled:opacity-0',
            focus,
          )}
        >
          <Chevron direction="previous" />
        </button>
        <button
          type="button"
          aria-label="Next voice"
          disabled={activeVoice === voices.length - 1}
          onClick={() => moveVoice(1)}
          className={cn(
            'absolute top-5 left-[556.5px] inline-flex h-10 w-[50px] items-center justify-center rounded-full text-[#59544f] disabled:pointer-events-none disabled:opacity-0',
            focus,
          )}
        >
          <Chevron direction="next" />
        </button>
      </div>

      <button
        type="button"
        className={cn(
          'absolute bottom-5 left-1/2 z-20 inline-flex h-10 -translate-x-1/2 items-center justify-center rounded-full bg-black px-4 text-[15px] leading-[22px] whitespace-nowrap text-white transition hover:bg-[#393735] active:scale-[.98] lg:right-8 lg:bottom-6 lg:left-auto lg:translate-x-0',
          focus,
        )}
      >
        Sign up
      </button>

      <audio
        ref={audioRef}
        src={voices[activeVoice].preview}
        crossOrigin="anonymous"
        preload="none"
        className="hidden"
        onEnded={() => setIsPlaying(false)}
      />
    </>
  )
}
