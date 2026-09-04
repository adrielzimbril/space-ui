export function hexToRgb(hex: string): [number, number, number] {
  const cleanHex = hex.replace('#', '')
  const r = parseInt(cleanHex.substring(0, 2), 16) / 255
  const g = parseInt(cleanHex.substring(2, 4), 16) / 255
  const b = parseInt(cleanHex.substring(4, 6), 16) / 255
  return [r, g, b]
}

export type BloopPalette = {
  main: [number, number, number]
  low: [number, number, number]
  mid: [number, number, number]
  high: [number, number, number]
}

export const BloopPaletteName = {
  blue: 'BLUE',
  darkBlue: 'DARK_BLUE',
  green: 'GREEN',
  yellow: 'YELLOW',
  orange: 'ORANGE',
  amber: 'AMBER',
  pink: 'PINK',
  purple: 'PURPLE',
  greyscale: 'GREYSCALE',
  charcoal: 'CHARCOAL',
  white: 'WHITE',
  black: 'BLACK',
} as const

export type BloopPaletteName = (typeof BloopPaletteName)[keyof typeof BloopPaletteName]

export const BLOOP_PALETTES: Record<BloopPaletteName, BloopPalette> = {
  [BloopPaletteName.blue]: {
    main: hexToRgb('#DCF7FF'),
    low: hexToRgb('#0181FE'),
    mid: hexToRgb('#A4EFFF'),
    high: hexToRgb('#FFFDEF'),
  },
  [BloopPaletteName.darkBlue]: {
    main: hexToRgb('#DAF5FF'),
    low: hexToRgb('#0066CC'),
    mid: hexToRgb('#2EC6F5'),
    high: hexToRgb('#72EAF5'),
  },
  [BloopPaletteName.green]: {
    main: hexToRgb('#def3e5'),
    low: hexToRgb('#53b559'),
    mid: hexToRgb('#9fddb1'),
    high: hexToRgb('#effaf3'),
  },
  [BloopPaletteName.yellow]: {
    main: hexToRgb('#fdf6dc'),
    low: hexToRgb('#f6c543'),
    mid: hexToRgb('#fae598'),
    high: hexToRgb('#fefbee'),
  },
  [BloopPaletteName.orange]: {
    main: hexToRgb('#fbe8db'),
    low: hexToRgb('#ee7c37'),
    mid: hexToRgb('#f4ba96'),
    high: hexToRgb('#fdf5f1'),
  },
  [BloopPaletteName.amber]: {
    main: hexToRgb('#FFE987'),
    low: hexToRgb('#E58B28'),
    mid: hexToRgb('#FB7256'),
    high: hexToRgb('#F3FDFE'),
  },
  [BloopPaletteName.pink]: {
    main: hexToRgb('#fdedf4'),
    low: hexToRgb('#f077af'),
    mid: hexToRgb('#fbbfd7'),
    high: hexToRgb('#fef8fb'),
  },
  [BloopPaletteName.purple]: {
    main: hexToRgb('#ede5fc'),
    low: hexToRgb('#8952ee'),
    mid: hexToRgb('#c9b1f6'),
    high: hexToRgb('#f8f5fd'),
  },
  [BloopPaletteName.greyscale]: {
    main: hexToRgb('#D7D7D7'),
    low: hexToRgb('#303030'),
    mid: hexToRgb('#989898'),
    high: hexToRgb('#FFFFFF'),
  },
  [BloopPaletteName.charcoal]: {
    main: hexToRgb('#494949'),
    low: hexToRgb('#000000'),
    mid: hexToRgb('#7F7F7F'),
    high: hexToRgb('#696969'),
  },
  [BloopPaletteName.white]: {
    main: hexToRgb('#FFFFFF'),
    low: hexToRgb('#FFFFFF'),
    mid: hexToRgb('#FFFFFF'),
    high: hexToRgb('#FFFFFF'),
  },
  [BloopPaletteName.black]: {
    main: hexToRgb('#000000'),
    low: hexToRgb('#000000'),
    mid: hexToRgb('#000000'),
    high: hexToRgb('#000000'),
  },
}
