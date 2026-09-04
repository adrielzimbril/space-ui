'use client'

import { useEffect, useRef, useState } from 'react'
import { AudioAnalyzer } from './audio-analyzer'
import { toastManager } from '@/registry/primitives/toast'
import type { AudioMode } from './types'

export function useCorsAudioSrc(src: string) {
  const [playSrc, setPlaySrc] = useState(src)

  useEffect(() => {
    let revoke: string | undefined
    if (!src) {
      setPlaySrc('')
      return
    }
    if (src.startsWith('blob:') || src.startsWith('data:') || src.startsWith('/')) {
      setPlaySrc(src)
      return
    }
    fetch(src)
      .then((response) => {
        if (!response.ok) throw new Error('audio fetch failed')
        return response.blob()
      })
      .then((blob) => {
        revoke = URL.createObjectURL(blob)
        setPlaySrc(revoke)
      })
      .catch(() => setPlaySrc(src))
    return () => {
      if (revoke) URL.revokeObjectURL(revoke)
    }
  }, [src])

  return playSrc
}

export function useOrbAudio(
  audioMode: AudioMode | undefined,
  audioElement: React.RefObject<HTMLAudioElement | null> | undefined,
  audioSrc?: string,
  useMicrophone?: boolean,
) {
  const analyzerRef = useRef<AudioAnalyzer | null>(null)

  useEffect(() => {
    const mode = audioMode || (useMicrophone ? 'mic' : 'ambient')
    let cancelled = false
    let timer = 0

    const release = () => {
      analyzerRef.current?.dispose()
      analyzerRef.current = null
    }

    async function attachFile() {
      const el = audioElement?.current
      if (cancelled) return
      if (!el || (!el.src && !audioSrc)) {
        timer = window.setTimeout(attachFile, 120)
        return
      }
      if (audioSrc && !el.src) el.src = audioSrc
      const analyzer = new AudioAnalyzer()
      const ok = await analyzer.initElement(el)
      if (cancelled) {
        analyzer.dispose()
        return
      }
      if (ok) analyzerRef.current = analyzer
    }

    async function attachMic() {
      const analyzer = new AudioAnalyzer()
      const ok = await analyzer.initMic()
      if (cancelled) {
        analyzer.dispose()
        return
      }
      if (ok) analyzerRef.current = analyzer
      else {
        toastManager.add({
          type: 'warning',
          title: 'Microphone access denied',
          description: 'Please allow microphone access to enable audio reactivity.',
        })
      }
    }

    release()
    if (mode === 'mic') attachMic()
    else if (mode === 'file') attachFile()

    return () => {
      cancelled = true
      window.clearTimeout(timer)
      release()
    }
  }, [audioMode, audioElement, audioSrc, useMicrophone])

  return analyzerRef
}
