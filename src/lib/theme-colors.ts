export enum DEFAULT_COLOR_CODE {
  BLUE = '#ade9ff',
  GREEN = '#adffad',
  WHITE_GOLD = '#f9f9f9',
  PURPLE = '#e2e4ff',
  INDIGO = '#b3baf5',
  YELLOW = '#ffe9ad',
  RED = '#ffadad',
  SKY = '#adffff',
  PINK = '#ffadff',
  ORANGE = '#ffd3ad',
  VIOLET = '#8e8eff',
  GREENISH_YELLOW = '#ffeccc',
  TURQUOISE = '#adfbff',
  GOLD = '#ffd700',
  AMBER = '#ffc107',
  TEAL = '#00bfa5',
  CYAN = '#00e5ff',
  LIME = '#c8e6c9',
  PINKISH_PURPLE = '#d8b6ff',
  PINKISH_ORANGE = '#ffab91',
  PINKISH_PINK = '#ff83b0',
  PINKISH_GREEN = '#c5e1a5',
  PINKISH_BLUE = '#b3cde0',
}

export type ColorCodeKey = keyof typeof DEFAULT_COLOR_CODE

export interface ColorDefinition {
  name: string
  label: string
  hex: DEFAULT_COLOR_CODE | string
  isDarkText: boolean
  fgClass: string
}

const DARK_TEXT_COLORS = new Set<string>([
  DEFAULT_COLOR_CODE.BLUE,
  DEFAULT_COLOR_CODE.GREEN,
  DEFAULT_COLOR_CODE.WHITE_GOLD,
  DEFAULT_COLOR_CODE.PURPLE,
  DEFAULT_COLOR_CODE.INDIGO,
  DEFAULT_COLOR_CODE.YELLOW,
  DEFAULT_COLOR_CODE.RED,
  DEFAULT_COLOR_CODE.SKY,
  DEFAULT_COLOR_CODE.PINK,
  DEFAULT_COLOR_CODE.ORANGE,
  DEFAULT_COLOR_CODE.GREENISH_YELLOW,
  DEFAULT_COLOR_CODE.TURQUOISE,
  DEFAULT_COLOR_CODE.GOLD,
  DEFAULT_COLOR_CODE.AMBER,
  DEFAULT_COLOR_CODE.CYAN,
  DEFAULT_COLOR_CODE.LIME,
  DEFAULT_COLOR_CODE.PINKISH_PURPLE,
  DEFAULT_COLOR_CODE.PINKISH_ORANGE,
  DEFAULT_COLOR_CODE.PINKISH_GREEN,
  DEFAULT_COLOR_CODE.PINKISH_BLUE,
])

export function isDarkForeground(hex: string): boolean {
  return DARK_TEXT_COLORS.has(hex)
}

export function getColorForegroundClass(hex: string): string {
  return isDarkForeground(hex) ? 'text-zinc-950' : 'text-white'
}

export const THEME_COLORS: Record<string, { label: string; hex: string; fgClass: string }> = {
  zinc: { label: 'Zinc', hex: '#0a0a0a', fgClass: 'text-white' },
  blue: { label: 'Blue', hex: DEFAULT_COLOR_CODE.BLUE, fgClass: 'text-zinc-950' },
  green: { label: 'Green', hex: DEFAULT_COLOR_CODE.GREEN, fgClass: 'text-zinc-950' },
  whiteGold: { label: 'White Gold', hex: DEFAULT_COLOR_CODE.WHITE_GOLD, fgClass: 'text-zinc-950' },
  purple: { label: 'Purple', hex: DEFAULT_COLOR_CODE.PURPLE, fgClass: 'text-zinc-950' },
  indigo: { label: 'Indigo', hex: DEFAULT_COLOR_CODE.INDIGO, fgClass: 'text-zinc-950' },
  yellow: { label: 'Yellow', hex: DEFAULT_COLOR_CODE.YELLOW, fgClass: 'text-zinc-950' },
  red: { label: 'Red', hex: DEFAULT_COLOR_CODE.RED, fgClass: 'text-zinc-950' },
  sky: { label: 'Sky', hex: DEFAULT_COLOR_CODE.SKY, fgClass: 'text-zinc-950' },
  pink: { label: 'Pink', hex: DEFAULT_COLOR_CODE.PINK, fgClass: 'text-zinc-950' },
  orange: { label: 'Orange', hex: DEFAULT_COLOR_CODE.ORANGE, fgClass: 'text-zinc-950' },
  violet: { label: 'Violet', hex: DEFAULT_COLOR_CODE.VIOLET, fgClass: 'text-white' },
  greenishYellow: { label: 'Greenish Yellow', hex: DEFAULT_COLOR_CODE.GREENISH_YELLOW, fgClass: 'text-zinc-950' },
  turquoise: { label: 'Turquoise', hex: DEFAULT_COLOR_CODE.TURQUOISE, fgClass: 'text-zinc-950' },
  gold: { label: 'Gold', hex: DEFAULT_COLOR_CODE.GOLD, fgClass: 'text-zinc-950' },
  amber: { label: 'Amber', hex: DEFAULT_COLOR_CODE.AMBER, fgClass: 'text-zinc-950' },
  teal: { label: 'Teal', hex: DEFAULT_COLOR_CODE.TEAL, fgClass: 'text-white' },
  cyan: { label: 'Cyan', hex: DEFAULT_COLOR_CODE.CYAN, fgClass: 'text-zinc-950' },
  lime: { label: 'Lime', hex: DEFAULT_COLOR_CODE.LIME, fgClass: 'text-zinc-950' },
  pinkishPurple: { label: 'Pinkish Purple', hex: DEFAULT_COLOR_CODE.PINKISH_PURPLE, fgClass: 'text-zinc-950' },
  pinkishOrange: { label: 'Pinkish Orange', hex: DEFAULT_COLOR_CODE.PINKISH_ORANGE, fgClass: 'text-zinc-950' },
  pinkishPink: { label: 'Pinkish Pink', hex: DEFAULT_COLOR_CODE.PINKISH_PINK, fgClass: 'text-white' },
  pinkishGreen: { label: 'Pinkish Green', hex: DEFAULT_COLOR_CODE.PINKISH_GREEN, fgClass: 'text-zinc-950' },
  pinkishBlue: { label: 'Pinkish Blue', hex: DEFAULT_COLOR_CODE.PINKISH_BLUE, fgClass: 'text-zinc-950' },
}
