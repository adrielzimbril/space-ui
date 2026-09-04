export const REUI_STYLES = [
  { value: 'vega', label: 'Vega', description: 'Clean and familiar' },
  { value: 'nova', label: 'Nova', description: 'Reduced spacing' },
  { value: 'maia', label: 'Maia', description: 'Rounded and generous' },
  { value: 'lyra', label: 'Lyra', description: 'Sharp and technical' },
  { value: 'mira', label: 'Mira', description: 'Compact interfaces' },
  { value: 'luma', label: 'Luma', description: 'Fluid and luminous' },
  { value: 'sera', label: 'Sera', description: 'Editorial typography' },
  { value: 'rhea', label: 'Rhea', description: 'Soft and compact' },
  {
    value: 'haumea',
    label: 'Haumea',
    description: 'Celestial, crystalline and precise',
  },
] as const

export const REUI_BASE_COLORS = ['neutral', 'stone', 'zinc', 'gray', 'slate'] as const

export const REUI_THEMES = ['neutral', 'blue', 'green', 'orange', 'red', 'rose', 'violet', 'yellow'] as const

export const REUI_ICON_LIBRARIES = ['lucide', 'tabler', 'hugeicons', 'phosphor', 'remixicon'] as const

export const REUI_FONTS = [
  'inter',
  'geist',
  'figtree',
  'manrope',
  'ibm-plex-sans',
  'roboto',
  'outfit',
  'space-grotesk',
  'source-serif',
  'jetbrains-mono',
] as const

export const REUI_RADII = [
  { value: 'default', label: 'Default', css: '0.625rem' },
  { value: 'none', label: 'None', css: '0' },
  { value: 'small', label: 'Small', css: '0.45rem' },
  { value: 'medium', label: 'Medium', css: '0.625rem' },
  { value: 'large', label: 'Large', css: '0.875rem' },
] as const

export const REUI_MENU_COLORS = ['default', 'inverted', 'default-translucent', 'inverted-translucent'] as const

export type ReuiStyle = (typeof REUI_STYLES)[number]['value']
export type ReuiBaseColor = (typeof REUI_BASE_COLORS)[number]
export type ReuiTheme = (typeof REUI_THEMES)[number]
export type ReuiIconLibrary = (typeof REUI_ICON_LIBRARIES)[number]
export type ReuiFont = (typeof REUI_FONTS)[number]
export type ReuiRadius = (typeof REUI_RADII)[number]['value']
export type ReuiMenuColor = (typeof REUI_MENU_COLORS)[number]

export type ReuiCustomizerConfig = {
  base: 'base'
  style: ReuiStyle
  baseColor: ReuiBaseColor
  theme: ReuiTheme
  chartColor: ReuiTheme
  iconLibrary: ReuiIconLibrary
  font: ReuiFont
  fontHeading: ReuiFont | 'inherit'
  radius: ReuiRadius
  menuAccent: 'subtle' | 'bold'
  menuColor: ReuiMenuColor
}

export type ReuiLockableKey = Exclude<keyof ReuiCustomizerConfig, 'base'>

export type SavedReuiPreset = {
  id: string
  name: string
  createdAt: string
  config: ReuiCustomizerConfig
}

export const DEFAULT_REUI_CONFIG: ReuiCustomizerConfig = {
  base: 'base',
  style: 'haumea',
  baseColor: 'neutral',
  theme: 'violet',
  chartColor: 'violet',
  iconLibrary: 'hugeicons',
  font: 'outfit',
  fontHeading: 'inherit',
  radius: 'medium',
  menuAccent: 'subtle',
  menuColor: 'default',
}

export const REUI_CONFIG_STORAGE_KEY = 'space-ui:reui-config'
export const REUI_PRESETS_STORAGE_KEY = 'space-ui:reui-presets'

const themeValues: Record<ReuiTheme, { primary: string; ring: string }> = {
  neutral: { primary: 'oklch(0.26 0 0)', ring: 'oklch(0.62 0 0)' },
  blue: { primary: 'oklch(0.55 0.22 257)', ring: 'oklch(0.69 0.16 255)' },
  green: { primary: 'oklch(0.56 0.17 151)', ring: 'oklch(0.72 0.18 150)' },
  orange: { primary: 'oklch(0.65 0.21 42)', ring: 'oklch(0.75 0.17 55)' },
  red: { primary: 'oklch(0.58 0.24 27)', ring: 'oklch(0.7 0.19 25)' },
  rose: { primary: 'oklch(0.59 0.24 12)', ring: 'oklch(0.72 0.17 13)' },
  violet: { primary: 'oklch(0.54 0.25 293)', ring: 'oklch(0.7 0.18 293)' },
  yellow: { primary: 'oklch(0.75 0.18 80)', ring: 'oklch(0.84 0.16 84)' },
}

const neutralValues: Record<ReuiBaseColor, { background: string; foreground: string; muted: string; border: string }> =
  {
    neutral: {
      background: 'oklch(1 0 0)',
      foreground: 'oklch(0.145 0 0)',
      muted: 'oklch(0.97 0 0)',
      border: 'oklch(0.91 0 0)',
    },
    stone: {
      background: 'oklch(0.99 0.003 48)',
      foreground: 'oklch(0.147 0.004 49)',
      muted: 'oklch(0.97 0.004 49)',
      border: 'oklch(0.9 0.007 48)',
    },
    zinc: {
      background: 'oklch(0.99 0.002 286)',
      foreground: 'oklch(0.141 0.005 286)',
      muted: 'oklch(0.967 0.003 265)',
      border: 'oklch(0.9 0.006 286)',
    },
    gray: {
      background: 'oklch(0.99 0.002 248)',
      foreground: 'oklch(0.13 0.027 262)',
      muted: 'oklch(0.967 0.003 264)',
      border: 'oklch(0.9 0.01 256)',
    },
    slate: {
      background: 'oklch(0.99 0.003 248)',
      foreground: 'oklch(0.129 0.042 264)',
      muted: 'oklch(0.968 0.007 247)',
      border: 'oklch(0.89 0.015 252)',
    },
  }

const fontFamilies: Record<ReuiFont, string> = {
  inter: 'Inter, ui-sans-serif, system-ui, sans-serif',
  geist: 'Geist, ui-sans-serif, system-ui, sans-serif',
  figtree: 'Figtree, ui-sans-serif, system-ui, sans-serif',
  manrope: 'Manrope, ui-sans-serif, system-ui, sans-serif',
  'ibm-plex-sans': '"IBM Plex Sans", ui-sans-serif, system-ui, sans-serif',
  roboto: 'Roboto, ui-sans-serif, system-ui, sans-serif',
  outfit: 'Outfit, ui-sans-serif, system-ui, sans-serif',
  'space-grotesk': '"Space Grotesk", ui-sans-serif, system-ui, sans-serif',
  'source-serif': '"Source Serif 4", ui-serif, Georgia, serif',
  'jetbrains-mono': '"JetBrains Mono", ui-monospace, monospace',
}

export function getReuiPreviewStyle(config: ReuiCustomizerConfig) {
  const neutral = neutralValues[config.baseColor]
  const theme = themeValues[config.theme]
  const chart = themeValues[config.chartColor]
  const radius = REUI_RADII.find((item) => item.value === config.radius)?.css ?? '0.625rem'

  return {
    '--background': neutral.background,
    '--foreground': neutral.foreground,
    '--card': neutral.background,
    '--card-foreground': neutral.foreground,
    '--popover': neutral.background,
    '--popover-foreground': neutral.foreground,
    '--primary': theme.primary,
    '--primary-foreground': 'oklch(0.985 0 0)',
    '--secondary': neutral.muted,
    '--secondary-foreground': neutral.foreground,
    '--muted': neutral.muted,
    '--muted-foreground': 'oklch(0.52 0.02 260)',
    '--accent': config.menuAccent === 'bold' ? theme.primary : neutral.muted,
    '--accent-foreground': config.menuAccent === 'bold' ? 'oklch(0.985 0 0)' : neutral.foreground,
    '--border': neutral.border,
    '--input': neutral.border,
    '--ring': theme.ring,
    '--chart-1': chart.primary,
    '--chart-2': themeValues.green.primary,
    '--chart-3': themeValues.orange.primary,
    '--chart-4': themeValues.rose.primary,
    '--chart-5': themeValues.blue.primary,
    '--radius': radius,
    '--font-sans': fontFamilies[config.font],
    '--font-heading': config.fontHeading === 'inherit' ? fontFamilies[config.font] : fontFamilies[config.fontHeading],
  } as CSSProperties
}

export function encodeReuiPreset(config: ReuiCustomizerConfig) {
  const bytes = new TextEncoder().encode(JSON.stringify(config))
  let binary = ''
  for (const byte of bytes) binary += String.fromCharCode(byte)
  return btoa(binary).replaceAll('+', '-').replaceAll('/', '_').replaceAll('=', '')
}

export function decodeReuiPreset(value: string): ReuiCustomizerConfig | null {
  try {
    const normalized = value.replaceAll('-', '+').replaceAll('_', '/')
    const binary = atob(normalized.padEnd(normalized.length + ((4 - (normalized.length % 4)) % 4), '='))
    const bytes = Uint8Array.from(binary, (character) => character.charCodeAt(0))
    const parsed = JSON.parse(new TextDecoder().decode(bytes))
    return { ...DEFAULT_REUI_CONFIG, ...parsed, base: 'base' }
  } catch {
    return null
  }
}
import type { CSSProperties } from 'react'
