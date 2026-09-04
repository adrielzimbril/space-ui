'use client'

import { useRef, useState } from 'react'
import { cn } from '@/registry/lib/utils'
import { focus, SpeechLoadingSpinner } from '../../components/shared'
import { speechInitialText, speechVoices } from '../../data'
import { speechLanguageItems } from '../../data/flags'
import { SpeechSelect } from '../../components/speech-select'

export function SpeechDemo() {
  const [speechText, setSpeechText] = useState(speechInitialText)
  const [language, setLanguage] = useState('en')
  const [voiceId, setVoiceId] = useState<string>(speechVoices[0].id)
  const [playing, setPlaying] = useState(false)
  const [loading, setLoading] = useState(false)
  const speechAudioRef = useRef<HTMLAudioElement>(null)
  const selectedVoice = speechVoices.find((voice) => voice.id === voiceId) ?? speechVoices[0]

  const toggleSpeech = () => {
    const audio = speechAudioRef.current
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

  const highlightedText = speechText.split(/(\[[^\]]+\])/g)

  return (
    <article className="relative isolate h-full overflow-hidden rounded-[20px] bg-[#f5f3f1]">
      <div className="relative flex h-full flex-col px-5 pb-6 sm:px-7 sm:pb-8">
        <div className="relative z-20 h-[474px] overflow-visible">
          <div className="flex h-full items-center">
            <div className="relative isolate -mt-9 mx-auto w-full max-w-[592px] rounded-3xl bg-white ring-[.5px] ring-[#dedbd8] ring-inset">
              <div className="relative flex flex-col">
                <div className="relative flex h-40 flex-auto flex-col overflow-y-auto [scrollbar-width:none]">
                  <div className="relative flex flex-auto flex-col">
                    <div className="relative flex-auto">
                      <div className="px-5 pt-4 text-[16px] leading-6 text-black whitespace-pre-wrap">
                        {highlightedText.map((part, index) =>
                          part.startsWith('[') ? (
                            <span key={`${part}-${index}`} className="text-[#a9a49e]">
                              {part}
                            </span>
                          ) : (
                            part
                          ),
                        )}
                        ​
                      </div>
                      <textarea
                        value={speechText}
                        onChange={(event) => setSpeechText(event.target.value)}
                        aria-label="Enter your text here, ElevenLabs AI Voice Generator will read it for you"
                        maxLength={1000}
                        spellCheck={false}
                        className={cn(
                          focus,
                          'absolute inset-0 size-full resize-none overflow-hidden bg-transparent px-5 pt-4 text-[16px] leading-6 text-transparent caret-black outline-none',
                        )}
                      />
                    </div>
                  </div>
                  <div className="sticky bottom-0 h-6 flex-none bg-gradient-to-t from-white" />
                </div>

                <div className="relative z-10 flex items-center px-3 pb-3">
                  <SpeechSelect
                    ariaLabel="Language"
                    value={language}
                    items={speechLanguageItems}
                    onChange={setLanguage}
                    menuWidth={214}
                    hideTriggerLabelOnMobile
                  />

                  <SpeechSelect
                    ariaLabel="Voice"
                    value={voiceId}
                    items={speechVoices}
                    onChange={(nextVoiceId) => {
                      speechAudioRef.current?.pause()
                      setLoading(false)
                      setPlaying(false)
                      setVoiceId(nextVoiceId)
                    }}
                    menuWidth={372}
                    hideTriggerImageOnMobile
                  />

                  <button
                    type="button"
                    aria-label={playing ? 'Pause' : 'Play'}
                    disabled={loading}
                    onClick={toggleSpeech}
                    className={cn(
                      'ml-auto flex flex-none items-center justify-center rounded-full bg-black text-[15px] leading-none text-white transition-colors hover:bg-[#59544f] disabled:cursor-default',
                      loading ? 'size-9 px-0' : 'h-9 px-3.5',
                      focus,
                    )}
                  >
                    {loading ? <SpeechLoadingSpinner /> : playing ? 'Pause' : 'Play'}
                  </button>
                  <audio
                    ref={speechAudioRef}
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
              </div>
            </div>
          </div>
        </div>

        <div className="order-last mt-auto flex shrink-0 flex-col">
          <h3 className="text-[15px] leading-[22px] tracking-[.01em] font-normal text-[#777169]">
            <span className="inline-flex items-center gap-1.5">Ultra-realistic speech</span>
          </h3>
          <p className="mt-[18px] text-[15px] leading-[22px] tracking-[.01em] text-pretty text-black">
            Create controllable, expressive speech layered across 70+ languages.
          </p>
        </div>
      </div>
      <div className="pointer-events-none absolute inset-0 rounded-[20px] ring-[.5px] ring-black/[.075] ring-inset" />
    </article>
  )
}
