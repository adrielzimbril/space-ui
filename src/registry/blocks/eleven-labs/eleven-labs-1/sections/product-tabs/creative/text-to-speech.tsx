'use client'

import { useEffect, useRef, useState } from 'react'
import { cn } from '@/registry/lib/utils'
import { IconCheck } from '@tabler/icons-react'
import { Chevron, CompactPlayButton, PlayIcon, focus } from '../../../components/shared'
import { speechInitialText, speechVoices } from '../../../data'
import { speechLanguageItems } from '../../../data/flags'
import { SpeechSelect } from '../../../components/speech-select'

export function CreativeTextToSpeechDemo() {
  const [speechText, setSpeechText] = useState(speechInitialText)
  const [language, setLanguage] = useState('en')
  const [voiceId, setVoiceId] = useState<string>(speechVoices[0].id)
  const [voicePage, setVoicePage] = useState(0)
  const [playing, setPlaying] = useState(false)
  const [loading, setLoading] = useState(false)
  const [playAfterVoiceSelection, setPlayAfterVoiceSelection] = useState(false)
  const audioRef = useRef<HTMLAudioElement>(null)
  const selectedVoice = speechVoices.find((voice) => voice.id === voiceId) ?? speechVoices[0]
  const visibleVoices = speechVoices.slice(voicePage * 5, voicePage * 5 + 5)
  const lastVoicePage = Math.ceil(speechVoices.length / 5) - 1
  const highlightedText = speechText.split(/(\[[^\]]+\])/g)

  useEffect(() => {
    const audio = audioRef.current
    if (!audio || !playAfterVoiceSelection) return

    setPlayAfterVoiceSelection(false)
    setLoading(true)
    void audio
      .play()
      .then(() => {
        setLoading(false)
        setPlaying(true)
      })
      .catch(() => {
        setLoading(false)
        setPlaying(false)
      })
  }, [playAfterVoiceSelection, voiceId])

  const toggle = () => {
    const audio = audioRef.current
    if (!audio || loading) return
    if (audio.paused) {
      setLoading(true)
      void audio
        .play()
        .then(() => {
          setLoading(false)
          setPlaying(true)
        })
        .catch(() => {
          setLoading(false)
          setPlaying(false)
        })
    } else {
      audio.pause()
      setLoading(false)
      setPlaying(false)
    }
  }

  return (
    <div className="absolute top-[68px] left-1/2 z-[5] flex h-80 w-[calc(100%-32px)] max-w-[832px] -translate-x-1/2 overflow-hidden rounded-3xl bg-white shadow-[inset_0_0_0_.5px_rgb(0_0_0_/_0.075)] md:top-[69px]">
      <div className="hidden w-1/2 flex-col border-r border-black/[.075] md:flex">
        <div className="h-[272px] overflow-hidden">
          {visibleVoices.map((voice, index) => {
            const selected = voice.id === voiceId
            const edgeSpacing =
              index === 0 ? 'h-[59px] pt-[11px]' : index === visibleVoices.length - 1 ? 'h-[59px] pb-[11px]' : 'h-12'
            return (
              <button
                key={voice.id}
                type="button"
                onClick={() => {
                  if (selected) {
                    toggle()
                    return
                  }
                  audioRef.current?.pause()
                  setPlaying(false)
                  setLoading(false)
                  setVoiceId(voice.id)
                  setPlayAfterVoiceSelection(true)
                }}
                aria-label={selected ? `${playing ? 'Pause' : 'Play'} ${voice.label}` : `Play ${voice.label} preview`}
                className={cn('group block w-full px-3 text-left', edgeSpacing, focus)}
              >
                <span
                  className={cn(
                    'flex h-12 w-full items-center gap-2.5 rounded-xl pr-4 pl-3 transition-colors hover:bg-[#f5f3f1]',
                    selected && 'bg-[#f5f3f1]',
                  )}
                >
                  <span className="relative size-5 flex-none">
                    <img src={voice.image} alt="" className="size-full rounded-full object-cover" />
                    {selected && (
                      <span className="absolute -top-1 -right-1 flex size-3 items-center justify-center rounded-full bg-black text-white ring-2 ring-[#f5f3f1]">
                        <IconCheck className="size-2 text-white" strokeWidth={2.5} aria-hidden="true" />
                      </span>
                    )}
                  </span>
                  <span className="flex min-w-0 flex-1 items-center justify-between gap-3">
                    <span className="truncate text-[15px] leading-5 font-medium text-black">{voice.label}</span>
                    <span
                      className={cn(
                        'truncate text-[14px] leading-5 font-medium text-[#777169]',
                        selected ? 'hidden' : 'group-hover:hidden',
                      )}
                    >
                      {voice.description}
                    </span>
                    <span
                      className={cn(
                        'ml-auto size-9 flex-none items-center justify-center rounded-full bg-white text-black shadow-[0_0_1px_rgb(0_0_0_/_0.34),0_1px_2px_rgb(0_0_0_/_0.04),0_2px_4px_rgb(0_0_0_/_0.04)] [&>svg]:!size-4',
                        selected ? 'flex' : 'hidden group-hover:flex',
                      )}
                    >
                      <PlayIcon playing={selected && playing} />
                    </span>
                  </span>
                </span>
              </button>
            )
          })}
        </div>
        <div className="flex h-12 items-center justify-between px-4">
          <button
            type="button"
            className={cn(
              'inline-flex h-9 items-center rounded-full bg-white px-3.5 text-[14px] leading-5 text-black shadow-[0_0_1px_rgb(0_0_0_/_0.34),0_1px_2px_rgb(0_0_0_/_0.04),0_2px_4px_rgb(0_0_0_/_0.04)] transition hover:bg-[#fbfaf9]',
              focus,
            )}
          >
            Explore 10,000+ voices
          </button>
          <div className="flex items-center text-[#59544f]">
            <button
              type="button"
              aria-label="Previous voices"
              disabled={voicePage === 0}
              onClick={() => setVoicePage((current) => Math.max(0, current - 1))}
              className={cn(
                'flex size-8 items-center justify-center rounded-full disabled:opacity-30 [&>svg]:size-4',
                focus,
              )}
            >
              <Chevron direction="previous" />
            </button>
            <button
              type="button"
              aria-label="Next voices"
              disabled={voicePage === lastVoicePage}
              onClick={() => setVoicePage((current) => Math.min(lastVoicePage, current + 1))}
              className={cn(
                'flex size-8 items-center justify-center rounded-full disabled:opacity-30 [&>svg]:size-4',
                focus,
              )}
            >
              <Chevron direction="next" />
            </button>
          </div>
        </div>
      </div>

      <div className="flex min-w-0 flex-1 flex-col">
        <div className="flex h-[272px] flex-col overflow-y-auto [scrollbar-width:none]">
          <div className="pointer-events-none z-10 -mb-3 hidden h-11 flex-none items-end px-5 pb-3 md:flex">
            <label htmlFor="creative-tts-text" className="truncate text-[12px] leading-[21px] text-[#a9a49e]">
              Enter your own text
            </label>
          </div>
          <div className="relative min-h-0 flex-1">
            <div
              aria-hidden="true"
              className="absolute inset-0 overflow-hidden px-5 pt-3 text-[16px] leading-6 text-black whitespace-pre-wrap"
            >
              {highlightedText.map((part, index) =>
                part.startsWith('[') ? (
                  <span key={`${part}-${index}`} className="text-[#a9a49e]">
                    {part}
                  </span>
                ) : (
                  part
                ),
              )}
            </div>
            <textarea
              id="creative-tts-text"
              value={speechText}
              onChange={(event) => setSpeechText(event.target.value)}
              aria-label="Enter your own text"
              spellCheck={false}
              className={cn(
                'absolute inset-0 size-full resize-none overflow-hidden bg-transparent px-5 pt-3 text-[16px] leading-6 text-transparent caret-black outline-none',
                focus,
              )}
            />
            <div className="pointer-events-none absolute right-0 bottom-0 left-0 h-6 bg-gradient-to-t from-white" />
          </div>
        </div>
        <div className="flex h-12 items-start gap-1 px-3 pb-3">
          <SpeechSelect
            ariaLabel="Language"
            value={language}
            items={speechLanguageItems}
            onChange={setLanguage}
            menuWidth={214}
          />
          <div className="ml-auto">
            <CompactPlayButton playing={playing} loading={loading} onClick={toggle} />
          </div>
        </div>
      </div>

      <audio
        ref={audioRef}
        src={selectedVoice.preview}
        preload="none"
        className="hidden"
        onPlaying={() => {
          setLoading(false)
          setPlaying(true)
        }}
        onWaiting={() => setLoading(true)}
        onPause={() => {
          setLoading(false)
          setPlaying(false)
        }}
        onEnded={() => {
          setLoading(false)
          setPlaying(false)
        }}
      />
    </div>
  )
}
