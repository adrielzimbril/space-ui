'use client'

import React, { createContext, useContext, useEffect, useCallback, useMemo } from 'react'
import { DEFAULT_COLOR_CODE } from '@/lib/theme-colors'
import { useLocalStorage } from '@/registry/hooks/browser/use-local-storage'

export interface BrandPalette {
  name: string
  label: string
  primary: string
  primarySecondary: string
  primaryForeground: string
  previewGradient: string
  darkPrimary?: string
  darkPrimaryForeground?: string
}

export const BRAND_PALETTES: BrandPalette[] = [
  {
    name: 'zinc',
    label: 'Zinc',
    primary: '#0a0a0a',
    primarySecondary: '#27272a',
    primaryForeground: '#ffffff',
    previewGradient: 'linear-gradient(135deg, #18181b 0%, #3f3f46 100%)',
    darkPrimary: '#ffffff',
    darkPrimaryForeground: '#0a0a0a',
  },
  {
    name: 'blue',
    label: 'Blue',
    primary: '#ade9ff',
    primarySecondary: '#85d9fa',
    primaryForeground: '#0b2b3a',
    previewGradient: 'linear-gradient(135deg, #ade9ff 0%, #38bdf8 100%)',
    darkPrimary: '#ade9ff',
    darkPrimaryForeground: '#0b2b3a',
  },
  {
    name: 'green',
    label: 'Green',
    primary: '#adffad',
    primarySecondary: '#8bf38b',
    primaryForeground: '#0a2e0a',
    previewGradient: 'linear-gradient(135deg, #adffad 0%, #4ade80 100%)',
    darkPrimary: '#adffad',
    darkPrimaryForeground: '#0a2e0a',
  },
  {
    name: 'white-gold',
    label: 'White Gold',
    primary: '#f9f9f9',
    primarySecondary: '#e4e4e4',
    primaryForeground: '#18181b',
    previewGradient: 'linear-gradient(135deg, #ffffff 0%, #cbd5e1 100%)',
    darkPrimary: '#f9f9f9',
    darkPrimaryForeground: '#18181b',
  },
  {
    name: 'purple',
    label: 'Purple',
    primary: '#e2e4ff',
    primarySecondary: '#c8ccff',
    primaryForeground: '#1a1d4a',
    previewGradient: 'linear-gradient(135deg, #e2e4ff 0%, #a78bfa 100%)',
    darkPrimary: '#e2e4ff',
    darkPrimaryForeground: '#1a1d4a',
  },
  {
    name: 'indigo',
    label: 'Indigo',
    primary: '#b3baf5',
    primarySecondary: '#949ef0',
    primaryForeground: '#111742',
    previewGradient: 'linear-gradient(135deg, #b3baf5 0%, #818cf8 100%)',
    darkPrimary: '#b3baf5',
    darkPrimaryForeground: '#111742',
  },
  {
    name: 'yellow',
    label: 'Yellow',
    primary: '#ffe9ad',
    primarySecondary: '#fed97d',
    primaryForeground: '#382b05',
    previewGradient: 'linear-gradient(135deg, #ffe9ad 0%, #facc15 100%)',
    darkPrimary: '#ffe9ad',
    darkPrimaryForeground: '#382b05',
  },
  {
    name: 'red',
    label: 'Red',
    primary: '#ffadad',
    primarySecondary: '#f88c8c',
    primaryForeground: '#3d0c0c',
    previewGradient: 'linear-gradient(135deg, #ffadad 0%, #f87171 100%)',
    darkPrimary: '#ffadad',
    darkPrimaryForeground: '#3d0c0c',
  },
  {
    name: 'sky',
    label: 'Sky',
    primary: '#adffff',
    primarySecondary: '#7ef6f6',
    primaryForeground: '#063434',
    previewGradient: 'linear-gradient(135deg, #adffff 0%, #0ea5e9 100%)',
    darkPrimary: '#adffff',
    darkPrimaryForeground: '#063434',
  },
  {
    name: 'pink',
    label: 'Pink',
    primary: '#ffadff',
    primarySecondary: '#f78bf7',
    primaryForeground: '#3b0a3b',
    previewGradient: 'linear-gradient(135deg, #ffadff 0%, #f472b6 100%)',
    darkPrimary: '#ffadff',
    darkPrimaryForeground: '#3b0a3b',
  },
  {
    name: 'orange',
    label: 'Orange',
    primary: '#ffd3ad',
    primarySecondary: '#fdbd83',
    primaryForeground: '#3f1f05',
    previewGradient: 'linear-gradient(135deg, #ffd3ad 0%, #fb923c 100%)',
    darkPrimary: '#ffd3ad',
    darkPrimaryForeground: '#3f1f05',
  },
  {
    name: 'violet',
    label: 'Violet',
    primary: '#8e8eff',
    primarySecondary: '#6e6eff',
    primaryForeground: '#ffffff',
    previewGradient: 'linear-gradient(135deg, #8e8eff 0%, #6366f1 100%)',
    darkPrimary: '#8e8eff',
    darkPrimaryForeground: '#ffffff',
  },
  {
    name: 'greenish-yellow',
    label: 'Greenish Yellow',
    primary: '#ffeccc',
    primarySecondary: '#fed69b',
    primaryForeground: '#392404',
    previewGradient: 'linear-gradient(135deg, #ffeccc 0%, #fde047 100%)',
    darkPrimary: '#ffeccc',
    darkPrimaryForeground: '#392404',
  },
  {
    name: 'turquoise',
    label: 'Turquoise',
    primary: '#adfbff',
    primarySecondary: '#7cf7fc',
    primaryForeground: '#053133',
    previewGradient: 'linear-gradient(135deg, #adfbff 0%, #2dd4bf 100%)',
    darkPrimary: '#adfbff',
    darkPrimaryForeground: '#053133',
  },
  {
    name: 'gold',
    label: 'Gold',
    primary: '#ffd700',
    primarySecondary: '#e0bd00',
    primaryForeground: '#262000',
    previewGradient: 'linear-gradient(135deg, #ffd700 0%, #f59e0b 100%)',
    darkPrimary: '#ffd700',
    darkPrimaryForeground: '#262000',
  },
  {
    name: 'amber',
    label: 'Amber',
    primary: '#ffc107',
    primarySecondary: '#e0a800',
    primaryForeground: '#2a1e00',
    previewGradient: 'linear-gradient(135deg, #ffc107 0%, #d97706 100%)',
    darkPrimary: '#ffc107',
    darkPrimaryForeground: '#2a1e00',
  },
  {
    name: 'teal',
    label: 'Teal',
    primary: '#00bfa5',
    primarySecondary: '#009e88',
    primaryForeground: '#ffffff',
    previewGradient: 'linear-gradient(135deg, #00bfa5 0%, #0d9488 100%)',
    darkPrimary: '#00bfa5',
    darkPrimaryForeground: '#ffffff',
  },
  {
    name: 'cyan',
    label: 'Cyan',
    primary: '#00e5ff',
    primarySecondary: '#00b8cc',
    primaryForeground: '#00333b',
    previewGradient: 'linear-gradient(135deg, #00e5ff 0%, #0284c7 100%)',
    darkPrimary: '#00e5ff',
    darkPrimaryForeground: '#00333b',
  },
  {
    name: 'lime',
    label: 'Lime',
    primary: '#c8e6c9',
    primarySecondary: '#a5d6a7',
    primaryForeground: '#1b3e1d',
    previewGradient: 'linear-gradient(135deg, #c8e6c9 0%, #84cc16 100%)',
    darkPrimary: '#c8e6c9',
    darkPrimaryForeground: '#1b3e1d',
  },
  {
    name: 'pinkish-purple',
    label: 'Pinkish Purple',
    primary: '#d8b6ff',
    primarySecondary: '#bf8eff',
    primaryForeground: '#260f47',
    previewGradient: 'linear-gradient(135deg, #d8b6ff 0%, #c084fc 100%)',
    darkPrimary: '#d8b6ff',
    darkPrimaryForeground: '#260f47',
  },
  {
    name: 'pinkish-orange',
    label: 'Pinkish Orange',
    primary: '#ffab91',
    primarySecondary: '#ff8a65',
    primaryForeground: '#3d1207',
    previewGradient: 'linear-gradient(135deg, #ffab91 0%, #ea580c 100%)',
    darkPrimary: '#ffab91',
    darkPrimaryForeground: '#3d1207',
  },
  {
    name: 'pinkish-pink',
    label: 'Pinkish Pink',
    primary: '#ff83b0',
    primarySecondary: '#ff5493',
    primaryForeground: '#ffffff',
    previewGradient: 'linear-gradient(135deg, #ff83b0 0%, #db2777 100%)',
    darkPrimary: '#ff83b0',
    darkPrimaryForeground: '#ffffff',
  },
  {
    name: 'pinkish-green',
    label: 'Pinkish Green',
    primary: '#c5e1a5',
    primarySecondary: '#aed581',
    primaryForeground: '#20360a',
    previewGradient: 'linear-gradient(135deg, #c5e1a5 0%, #65a30d 100%)',
    darkPrimary: '#c5e1a5',
    darkPrimaryForeground: '#20360a',
  },
  {
    name: 'pinkish-blue',
    label: 'Pinkish Blue',
    primary: '#b3cde0',
    primarySecondary: '#94b8d1',
    primaryForeground: '#102738',
    previewGradient: 'linear-gradient(135deg, #b3cde0 0%, #3b82f6 100%)',
    darkPrimary: '#b3cde0',
    darkPrimaryForeground: '#102738',
  },
]

type BrandColorContextValue = {
  activePalette: BrandPalette
  setPalette: (paletteName: string) => void
  resetPalette: () => void
}

const BrandColorContext = createContext<BrandColorContextValue>({
  activePalette: BRAND_PALETTES[0],
  setPalette: () => {},
  resetPalette: () => {},
})

const STORAGE_KEY = 'space-ui-brand-color'

function applyPaletteToDOM(palette: BrandPalette) {
  if (typeof document === 'undefined') return
  const isDark = document.documentElement.classList.contains('dark')

  if (palette.name === 'zinc') {
    document.documentElement.style.removeProperty('--primary')
    document.documentElement.style.removeProperty('--primary-foreground')
    document.documentElement.style.removeProperty('--brand')
    document.documentElement.style.removeProperty('--brand-secondary')
    document.documentElement.style.removeProperty('--brand-gradient')
    document.documentElement.setAttribute('data-brand-palette', 'zinc')
    return
  }

  const primary = isDark && palette.darkPrimary ? palette.darkPrimary : palette.primary
  const primaryFg = isDark && palette.darkPrimaryForeground ? palette.darkPrimaryForeground : palette.primaryForeground

  document.documentElement.style.setProperty('--primary', primary)
  document.documentElement.style.setProperty('--primary-foreground', primaryFg)
  document.documentElement.style.setProperty('--brand', primary)
  document.documentElement.style.setProperty('--brand-secondary', palette.primarySecondary)
  document.documentElement.style.setProperty('--brand-gradient', palette.previewGradient)
  document.documentElement.setAttribute('data-brand-palette', palette.name)
}

export function BrandColorProvider({ children }: { children: React.ReactNode }) {
  const [paletteName, setPaletteName, removePaletteName] = useLocalStorage<string>(STORAGE_KEY, 'zinc')

  const activePalette = useMemo(() => {
    return BRAND_PALETTES.find((p) => p.name === paletteName) || BRAND_PALETTES[0]
  }, [paletteName])

  useEffect(() => {
    applyPaletteToDOM(activePalette)

    // Observer for dark mode changes to update palette values
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
          applyPaletteToDOM(activePalette)
        }
      })
    })

    observer.observe(document.documentElement, { attributes: true })
    return () => observer.disconnect()
  }, [activePalette])

  const setPalette = useCallback(
    (name: string) => {
      const found = BRAND_PALETTES.find((p) => p.name === name) || BRAND_PALETTES[0]
      setPaletteName(found.name)
    },
    [setPaletteName],
  )

  const resetPalette = useCallback(() => {
    removePaletteName()
  }, [removePaletteName])

  const value = useMemo(
    () => ({
      activePalette,
      setPalette,
      resetPalette,
    }),
    [activePalette, setPalette, resetPalette],
  )

  return <BrandColorContext.Provider value={value}>{children}</BrandColorContext.Provider>
}

export function useBrandColor() {
  return useContext(BrandColorContext)
}
