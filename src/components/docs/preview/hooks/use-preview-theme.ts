'use client'

import { useState, useEffect, useCallback } from 'react'
import { useGlobalThemeChange } from '@/components/docs/preview/hooks/use-global-theme-change'
import { useLayoutMode } from '@/components/providers/layout-mode-provider'
import { type ThemeOverride, getEffectivePreviewTheme } from '@/config/preview-config'

/**
 * Shared hook to manage preview theme state.
 *
 * Rules:
 * 1. Default theme is 'system' (tracks the global site theme).
 * 2. Allows local overrides ('light' | 'dark').
 * 3. Automatically resets back to 'system' whenever the global site theme changes.
 * 4. Stays bidirectionally in sync with activePreview in Split / Dual mode.
 */
export function usePreviewTheme(name?: string) {
  const { activePreview, setActivePreview } = useLayoutMode()
  const isSelfActive = Boolean(name && activePreview?.name === name)
  const [localThemeOverride, setLocalThemeOverride] = useState<ThemeOverride>('system')

  // When active in layout mode, activePreview is the single source of truth;
  // otherwise use the component's local state.
  const themeOverride: ThemeOverride =
    isSelfActive && activePreview?.themeOverride !== undefined ? activePreview.themeOverride : localThemeOverride

  // Reset local preview theme override to 'system' whenever global site theme changes
  useGlobalThemeChange(
    useCallback(() => {
      setLocalThemeOverride('system')
    }, []),
  )

  // Synchronously update local state and activePreview
  const setThemeOverride = useCallback(
    (next: ThemeOverride) => {
      setLocalThemeOverride(next)
      if (name) {
        setActivePreview((current: any) => {
          if (current && current.name === name) {
            return { ...current, themeOverride: next }
          }
          return current
        })
      }
    },
    [name, setActivePreview],
  )

  return {
    themeOverride,
    setThemeOverride,
  }
}
