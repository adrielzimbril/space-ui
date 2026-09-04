import type React from 'react'

export type AudioMode = 'ambient' | 'mic' | 'file'

export interface OrbSmoothProps {
  /** Background Texture URL */
  textureUrl?: string
  /** Audio Reactivity Mode */
  audioMode?: AudioMode
  /** Audio Element Ref (used for "file" mode) */
  audioElement?: React.RefObject<HTMLAudioElement | null>
  /** Current audio src — rebinds the analyser when the file or URL changes */
  audioSrc?: string
  /** Legacy mic toggle (overridden by audioMode if provided) */
  useMicrophone?: boolean

  circleSize?: number
  alpha?: number
  animated?: boolean
  cornerRadius?: number // Infinity for sphere

  sphereScale?: number
  spherePower?: number
  fbmScale?: number
  fbmPower?: number
  fbmAmplitude?: number
  fbmSpeed?: number
  noiseSpeed?: number
  noiseAmplitude?: number
  noiseScale?: number

  exposure?: number
  contrast?: number
  saturation?: number
  fadeInDuration?: number

  ringColorOpacity?: number
  fluidColor?: [number, number, number]
  fluidColorOpacity?: number
  grainOpacity?: number
  grainAnimated?: boolean
  watercolorStrength?: number
  timeScale?: number
  overallSoundScale?: number
  onTextureReady?: (textureUrl: string) => void

  size?: number
  className?: string
  style?: React.CSSProperties
}
