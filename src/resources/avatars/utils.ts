import { AvatarVariant, getAvatarDetails, type AvatarDetails } from '@usespaceui/avatars'
import { PRESET_PALETTES } from '@usespaceui/gradients'
import { HISTORICAL_PERSONAS } from './seeds'

export function getRandomPersonas(count: number): string[] {
  return [...HISTORICAL_PERSONAS].sort(() => 0.5 - Math.random()).slice(0, count)
}

export function resolvePaletteColors(paletteIndex: number, customColors: string[]): string[] | undefined {
  if (paletteIndex === -2) return undefined
  if (paletteIndex >= 0 && paletteIndex < PRESET_PALETTES.length) {
    return [...PRESET_PALETTES[paletteIndex].colors]
  }
  return customColors.length === 5 ? [...customColors] : undefined
}

export function getSelectedAvatarDetails(pattern: AvatarVariant | 'all'): AvatarDetails {
  return getAvatarDetails(pattern === 'all' ? AvatarVariant.triton : pattern) ?? getAvatarDetails(AvatarVariant.triton)!
}

export const toLabel = (value: string) =>
  value.replace(/[-_]/g, ' ').replace(/\b\w/g, (character) => character.toUpperCase())
