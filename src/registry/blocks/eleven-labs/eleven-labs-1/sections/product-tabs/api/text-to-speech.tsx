'use client'

import { useRef, useState } from 'react'
import { cn } from '@/registry/lib/utils'
import { focus, SpeechLoadingSpinner } from '../../../components/shared'
import { SpeechSelect } from '../../../components/speech-select'
import { CodeLanguageSelect, ApiPromptInput, CopyIcon } from '../../../components/code-controls'
import { speechInitialText, speechVoices } from '../../../data'
import { speechLanguageItems } from '../../../data/flags'

export function ApiTextToSpeechDemo() {
  const [language, setLanguage] = useState('en')
  const [voiceId, setVoiceId] = useState<string>(speechVoices[0].id)
  const [codeLanguage, setCodeLanguage] = useState<'ts' | 'python'>('ts')
  const [prompt, setPrompt] = useState(speechInitialText)
  const [copied, setCopied] = useState(false)
  const [playing, setPlaying] = useState(false)
  const [loading, setLoading] = useState(false)
  const audioRef = useRef<HTMLAudioElement>(null)
  const selectedVoice = speechVoices.find((voice) => voice.id === voiceId) ?? speechVoices[0]
  const code =
    codeLanguage === 'ts'
      ? `import { ElevenLabsClient } from "@elevenlabs/elevenlabs-js";

const elevenlabs = new ElevenLabsClient();
const audio = await elevenlabs
  .textToSpeech.convert("${voiceId}", {
    text: "${prompt}",
    modelId: "eleven_v3",
    languageCode: "${language}",
  });`
      : `from elevenlabs.client import ElevenLabs

elevenlabs = ElevenLabs()
audio = elevenlabs.text_to_speech.convert(
  voice_id="${voiceId}",
  text="${prompt}",
  model_id="eleven_v3",
  language_code="${language}",
)`

  const copyCode = async () => {
    try {
      await navigator.clipboard.writeText(code)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1400)
    } catch {
      setCopied(false)
    }
  }

  const runCode = () => {
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
    <div className="absolute top-[68px] left-1/2 z-[5] flex h-80 w-[calc(100%-32px)] max-w-[640px] -translate-x-1/2 flex-col overflow-hidden rounded-3xl bg-white shadow-[inset_0_0_0_.5px_rgb(0_0_0_/_0.075)] md:top-[69px]">
      <div className="min-h-0 flex-1 overflow-auto px-5 pt-4 [font-family:var(--font-geist-mono),monospace] text-[12px] leading-[21px] text-black [scrollbar-width:none] sm:text-[13px] sm:leading-[26px]">
        {codeLanguage === 'ts' ? (
          <>
            <p className="mb-[26px]">
              <span className="text-[#f41a2f]">import</span> {'{ ElevenLabsClient } '}
              <span className="text-[#f41a2f]">from</span>{' '}
              <span className="text-[#052f70]">&quot;@elevenlabs/elevenlabs-js&quot;</span>;
            </p>
            <p>
              <span className="text-[#f41a2f]">const</span> <span className="text-[#0a59d2]">elevenlabs</span> = new
              ElevenLabsClient();
            </p>
            <p>
              <span className="text-[#f41a2f]">const</span> <span className="text-[#0a59d2]">audio</span> ={' '}
              <span className="text-[#f41a2f]">await</span> elevenlabs
            </p>
            <p className="pl-4">
              .textToSpeech.convert(&quot;
              <SpeechSelect
                ariaLabel="Voice"
                value={voiceId}
                items={speechVoices}
                onChange={setVoiceId}
                menuWidth={304}
                inlineCode
                triggerValue={voiceId}
              />
              &quot;, {'{'}
            </p>
            <p className="flex min-w-0 items-center pl-8">
              <span className="whitespace-pre text-[#0a59d2]">text:</span>
              <span className="whitespace-pre"> &quot;</span>
              <ApiPromptInput value={prompt} onChange={setPrompt} />
              <span className="whitespace-pre">&quot;,</span>
            </p>
            <p className="pl-8">
              <span className="text-[#0a59d2]">modelId:</span>{' '}
              <span className="text-[#052f70]">&quot;eleven_v3&quot;</span>,
            </p>
            <p className="pl-8">
              <span className="text-[#0a59d2]">languageCode:</span> &quot;
              <SpeechSelect
                ariaLabel="Language"
                value={language}
                items={speechLanguageItems}
                onChange={setLanguage}
                menuWidth={222}
                inlineCode
                triggerValue={language}
              />
              &quot;,
            </p>
            <p className="pl-4">{'});'}</p>
          </>
        ) : (
          <>
            <p className="mb-[26px]">
              <span className="text-[#f41a2f]">from</span> elevenlabs.client{' '}
              <span className="text-[#f41a2f]">import</span> ElevenLabs
            </p>
            <p>elevenlabs = ElevenLabs()</p>
            <p>audio = elevenlabs.text_to_speech.convert(</p>
            <p className="pl-4">
              voice_id=&quot;
              <SpeechSelect
                ariaLabel="Voice"
                value={voiceId}
                items={speechVoices}
                onChange={setVoiceId}
                menuWidth={304}
                inlineCode
                triggerValue={voiceId}
              />
              &quot;,
            </p>
            <p className="flex min-w-0 items-center pl-4">
              <span className="whitespace-pre">text=&quot;</span>
              <ApiPromptInput value={prompt} onChange={setPrompt} />
              <span className="whitespace-pre">&quot;,</span>
            </p>
            <p className="pl-4">model_id=&quot;eleven_v3&quot;,</p>
            <p className="pl-4">
              language_code=&quot;
              <SpeechSelect
                ariaLabel="Language"
                value={language}
                items={speechLanguageItems}
                onChange={setLanguage}
                menuWidth={222}
                inlineCode
                triggerValue={language}
              />
              &quot;,
            </p>
            <p>)</p>
          </>
        )}
      </div>

      <div className="flex h-12 flex-none items-center gap-1 px-3 pb-3">
        <button
          type="button"
          aria-label={copied ? 'Copied' : 'Copy code'}
          onClick={copyCode}
          className={cn(
            'flex size-9 flex-none items-center justify-center rounded-full text-[#59544f] transition hover:text-black',
            focus,
          )}
        >
          <CopyIcon copied={copied} />
        </button>
        <CodeLanguageSelect value={codeLanguage} onChange={setCodeLanguage} />
        <button
          type="button"
          onClick={runCode}
          disabled={loading}
          className={cn(
            'ml-auto flex h-9 items-center justify-center rounded-full bg-black px-3.5 text-[14px] leading-none text-white transition hover:bg-[#59544f] disabled:cursor-default',
            focus,
          )}
        >
          {loading ? (
            <SpeechLoadingSpinner />
          ) : playing ? (
            'Pause'
          ) : (
            <>
              <span className="sm:hidden">Run</span>
              <span className="hidden sm:contents">Run code</span>
            </>
          )}
        </button>
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
