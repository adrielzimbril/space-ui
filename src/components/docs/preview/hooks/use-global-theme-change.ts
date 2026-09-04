'use client'

import { useEffect, useRef } from 'react'
import { useTheme } from 'next-themes'

/**
 * Hook that listens to global site theme transitions and fires a callback.
 * Uses both next-themes state and a MutationObserver on document.documentElement.classList
 * to guarantee that any theme transition triggers the callback.
 */
export function useGlobalThemeChange(onChange: () => void) {
  const { theme, resolvedTheme } = useTheme()
  const globalThemeKey = `${theme ?? ''}-${resolvedTheme ?? ''}`
  const prevGlobalThemeRef = useRef(globalThemeKey)
  const isInitialMountRef = useRef(true)
  const onChangeRef = useRef(onChange)

  useEffect(() => {
    onChangeRef.current = onChange
  }, [onChange])

  // 1. NextThemes state change listener
  useEffect(() => {
    if (isInitialMountRef.current) {
      isInitialMountRef.current = false
      prevGlobalThemeRef.current = globalThemeKey
      return
    }

    if (prevGlobalThemeRef.current !== globalThemeKey) {
      prevGlobalThemeRef.current = globalThemeKey
      onChangeRef.current()
    }
  }, [globalThemeKey])

  // 2. DOM MutationObserver on document.documentElement class attribute
  useEffect(() => {
    if (typeof document === 'undefined') return
    let lastIsDark = document.documentElement.classList.contains('dark')

    const observer = new MutationObserver(() => {
      const currentIsDark = document.documentElement.classList.contains('dark')
      if (currentIsDark !== lastIsDark) {
        lastIsDark = currentIsDark
        onChangeRef.current()
      }
    })

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    })

    return () => observer.disconnect()
  }, [])
}
