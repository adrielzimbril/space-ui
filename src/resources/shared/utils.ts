import { HISTORICAL_PERSONAS } from './seeds'

export function getRandomPersonas(count: number): string[] {
  return [...HISTORICAL_PERSONAS].sort(() => 0.5 - Math.random()).slice(0, count)
}

export const toLabel = (value: string) =>
  value.replace(/[-_]/g, ' ').replace(/\b\w/g, (character) => character.toUpperCase())
