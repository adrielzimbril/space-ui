'use client'

import React, { createContext, useContext, useEffect, useState, useCallback, useMemo } from 'react'
import * as spaceSounds from '@usespaceui/sounds'
import { useLocalStorage } from '@/registry/hooks/browser/use-local-storage'

const STORAGE_KEY = 'space-ui-sounds-enabled'

// Module-level state for zero-latency synchronous checks
let isSoundActive = false

export function isAudioEnabled() {
  return isSoundActive
}

export function bloomSound(...args: any[]) {
  if (!isSoundActive) return
  try {
    if (typeof spaceSounds.bloom === 'function') {
      spaceSounds.bloom(...args)
    }
  } catch (e) {
    // Ignore audio errors
  }
}

export function slideSound(...args: any[]) {
  if (!isSoundActive) return
  try {
    if (typeof spaceSounds.slide === 'function') {
      spaceSounds.slide(...(args.length ? args : ['in']))
    }
  } catch (e) {
    // Ignore audio errors
  }
}

export function toggleSound() {
  bloomSound()
}

type SoundContextValue = {
  enabled: boolean
  setEnabled: (value: boolean) => void
  suppressed: boolean
  playSound: (name: 'bloom' | 'slide' | 'click' | 'toggle', ...args: any[]) => void
}

const SoundContext = createContext<SoundContextValue>({
  enabled: false,
  setEnabled: () => {},
  suppressed: false,
  playSound: () => {},
})

export function SoundProvider({ children }: { children: React.ReactNode }) {
  const [enabled, setEnabledState] = useLocalStorage<boolean>(STORAGE_KEY, false)
  const [suppressed, setSuppressed] = useState(false)

  useEffect(() => {
    const coarse = window.matchMedia('(pointer: coarse)').matches
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (coarse || reducedMotion) {
      setSuppressed(true)
      isSoundActive = false
      return
    }

    isSoundActive = enabled
  }, [enabled])

  const updateEnabled = useCallback(
    (next: boolean) => {
      setEnabledState(next)
      isSoundActive = next
    },
    [setEnabledState],
  )

  const playSound = useCallback((name: 'bloom' | 'slide' | 'click' | 'toggle', ...args: any[]) => {
    if (name === 'bloom') bloomSound(...args)
    else if (name === 'slide') slideSound(...args)
    else bloomSound(...args)
  }, [])

  const value = useMemo(
    () => ({
      enabled: enabled && !suppressed,
      setEnabled: updateEnabled,
      suppressed,
      playSound,
    }),
    [enabled, suppressed, updateEnabled, playSound],
  )

  return <SoundContext.Provider value={value}>{children}</SoundContext.Provider>
}

export function useSoundToggle() {
  return useContext(SoundContext)
}

export function useUiSound() {
  const { playSound, enabled } = useContext(SoundContext)
  return { playSound, enabled, bloom: bloomSound, slide: slideSound }
}
