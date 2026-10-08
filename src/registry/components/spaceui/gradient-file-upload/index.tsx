'use client'

import { Button } from '@/registry/components/button/button-squircle'
import { useFileUpload as useRegistryFileUpload } from '@/registry/hooks/form/use-file-upload'
import { cn } from '@/registry/lib/utils'
import { formatBytes, parseBytes } from '@/registry/utils/format-bytes'
import { sleep } from '@/registry/utils/sleep'
import { ready, tap, whisper } from '@usespaceui/sounds'
import {
  IconArrowUp,
  IconFile,
  IconFileSpreadsheet,
  IconFileText,
  IconFileZip,
  IconPhoto,
  IconPlayerPause,
  IconX,
} from '@tabler/icons-react'
import { AnimatePresence, motion } from 'motion/react'
import * as React from 'react'

const safeSound = (fn: () => void) => {
  if (typeof window === 'undefined') return
  try {
    fn()
  } catch {}
}

export type UploadPhase = 'idle' | 'dragging' | 'uploading' | 'success' | 'error'
export type ColorVariant = 'ocean' | 'sunset' | 'colorful' | 'mono'
export type UploadVariant = 'original' | 'glow'

export interface FileTypeInfo {
  extension: string
  icon: React.ComponentType<{ className?: string; strokeWidth?: number; size?: number | string }>
}

export function formatFileSize(bytes: number): string {
  return formatBytes(bytes, { decimals: 1 })
}

export function getFileTypeInfo(file: File | null): FileTypeInfo {
  if (!file) return { extension: 'FILE', icon: IconFile }
  const ext = file.name.split('.').pop()?.slice(0, 4).toUpperCase() || 'FILE'
  const type = file.type

  if (type.startsWith('image/')) return { extension: ext, icon: IconPhoto }
  if (/\b(csv|sheet|excel|spreadsheet)\b/i.test(type) || /xlsx?|csv/i.test(ext)) {
    return { extension: ext, icon: IconFileSpreadsheet }
  }
  if (/pdf|text|document/i.test(type) || /pdf|txt|doc/i.test(ext)) {
    return { extension: ext, icon: IconFileText }
  }
  if (/zip|archive|compressed/i.test(type) || /zip|rar|7z|tar|gz/i.test(ext)) {
    return { extension: ext, icon: IconFileZip }
  }
  return { extension: ext, icon: IconFile }
}

export interface UseFileUploadOptions {
  maxSizeMb?: number
  uploadDurationMs?: number
  onFileAccepted?: (file: File) => void
  onUpload?: (file: File) => Promise<{ status?: 'success' | 'error'; message?: string } | void>
}

export function useGradientFileUpload({
  maxSizeMb = 50,
  uploadDurationMs = 2400,
  onFileAccepted,
  onUpload,
}: UseFileUploadOptions = {}) {
  const [file, setFile] = React.useState<File | null>(null)
  const [message, setMessage] = React.useState<string | null>(null)
  const [phase, setPhase] = React.useState<UploadPhase>('idle')
  const [progress, setProgress] = React.useState<number>(0)
  const uploadIdRef = React.useRef(0)
  const intervalRef = React.useRef<number | null>(null)

  const stopInterval = React.useCallback(() => {
    if (intervalRef.current !== null) {
      window.clearInterval(intervalRef.current)
      intervalRef.current = null
    }
  }, [])

  React.useEffect(() => stopInterval, [stopInterval])

  const startUpload = React.useCallback(
    async (targetFile: File) => {
      const currentId = uploadIdRef.current + 1
      uploadIdRef.current = currentId
      const isCurrent = () => uploadIdRef.current === currentId

      safeSound(() => whisper())
      setFile(targetFile)
      setMessage(null)
      setProgress(8)
      setPhase('uploading')
      onFileAccepted?.(targetFile)
      stopInterval()

      intervalRef.current = window.setInterval(() => {
        if (!isCurrent()) {
          stopInterval()
          return
        }
        setProgress((prev) => Math.min(prev + 6 + Math.random() * 9, 92))
      }, 180)

      const finalize = (result: { status: 'success' | 'error'; message?: string }) => {
        if (isCurrent()) {
          stopInterval()
          setProgress(100)
          setPhase(result.status)
          if (result.status === 'success') {
            safeSound(() => ready())
          }
          setMessage(result.message ?? (result.status === 'success' ? 'Upload complete' : 'Upload failed'))
        }
      }

      try {
        const maxBytes = parseBytes(`${maxSizeMb}MB`)
        if (targetFile.size > maxBytes) {
          await sleep(650)
          finalize({
            status: 'error',
            message: `File is larger than ${formatBytes(maxBytes, { decimals: 0 })}.`,
          })
          return
        }

        const res = onUpload ? await onUpload(targetFile) : await sleep(uploadDurationMs)

        finalize({
          status: (res && res.status) ?? 'success',
          message: res && res.message ? res.message : undefined,
        })
      } catch {
        finalize({
          status: 'error',
          message: 'An unexpected error occurred.',
        })
      }
    },
    [maxSizeMb, onFileAccepted, onUpload, stopInterval, uploadDurationMs],
  )

  const fail = React.useCallback(
    (errorMessage: string) => {
      uploadIdRef.current += 1
      stopInterval()
      setProgress(100)
      setPhase('error')
      setMessage(errorMessage)
    },
    [stopInterval],
  )

  const selectFiles = React.useCallback(
    (files: FileList | File[]) => {
      const [first] = Array.from(files)
      if (!first) {
        setPhase('idle')
        return
      }
      startUpload(first)
    },
    [startUpload],
  )

  const setDragging = React.useCallback((dragging: boolean) => {
    setPhase((current) => {
      if (current === 'uploading') return current
      return dragging ? 'dragging' : 'idle'
    })
  }, [])

  const reset = React.useCallback(() => {
    uploadIdRef.current += 1
    stopInterval()
    setFile(null)
    setMessage(null)
    setProgress(0)
    setPhase('idle')
  }, [stopInterval])

  return {
    file,
    message,
    phase,
    progress,
    isBusy: phase === 'uploading',
    isDragging: phase === 'dragging',
    resultState: phase === 'success' || phase === 'error' ? phase : null,
    selectFiles,
    setDragging,
    reset,
    fail,
    startUpload,
  }
}

export const useFileUpload = useGradientFileUpload

const CHROMATIC_CONFIGS: Record<
  ColorVariant,
  {
    border: Array<{ color: string; pos: string; size: string }>
  }
> = {
  ocean: {
    border: [
      { color: 'rgb(100, 80, 220)', pos: '33% -7.4%', size: '4.375rem 2.5rem' },
      { color: 'rgb(60, 120, 255)', pos: '12% -5%', size: '3.75rem 2.1875rem' },
      { color: 'rgb(80, 100, 200)', pos: '2.1% 68.3%', size: '2.5rem 4.375rem' },
      { color: 'rgb(50, 140, 220)', pos: '2.1% 68.3%', size: '1.25rem 2.1875rem' },
      { color: 'rgb(120, 80, 255)', pos: '74.4% 100%', size: '11.25rem 2rem' },
      { color: 'rgb(70, 130, 255)', pos: '55% 100%', size: '5.3125rem 1.625rem' },
      { color: 'rgb(140, 100, 240)', pos: '93.9% 0%', size: '4.625rem 2rem' },
      { color: 'rgb(90, 110, 230)', pos: '100% 27.1%', size: '1.625rem 2.625rem' },
      { color: 'rgb(130, 70, 255)', pos: '100% 27.1%', size: '3.25rem 3rem' },
    ],
  },
  sunset: {
    border: [
      { color: 'rgb(255, 80, 50)', pos: '33% -7.4%', size: '4.375rem 2.5rem' },
      { color: 'rgb(255, 160, 40)', pos: '12% -5%', size: '3.75rem 2.1875rem' },
      { color: 'rgb(255, 120, 60)', pos: '2.1% 68.3%', size: '2.5rem 4.375rem' },
      { color: 'rgb(255, 200, 50)', pos: '2.1% 68.3%', size: '1.25rem 2.1875rem' },
      { color: 'rgb(255, 100, 80)', pos: '74.4% 100%', size: '11.25rem 2rem' },
      { color: 'rgb(255, 180, 60)', pos: '55% 100%', size: '85px 26px' },
      { color: 'rgb(255, 60, 60)', pos: '93.9% 0%', size: '4.625rem 2rem' },
      { color: 'rgb(255, 140, 50)', pos: '100% 27.1%', size: '1.625rem 2.625rem' },
      { color: 'rgb(255, 90, 70)', pos: '100% 27.1%', size: '3.25rem 3rem' },
    ],
  },
  colorful: {
    border: [
      { color: 'rgb(255, 50, 100)', pos: '33% -7.4%', size: '4.375rem 2.5rem' },
      { color: 'rgb(40, 140, 255)', pos: '12% -5%', size: '3.75rem 2.1875rem' },
      { color: 'rgb(50, 200, 80)', pos: '2.1% 68.3%', size: '2.5rem 4.375rem' },
      { color: 'rgb(30, 185, 170)', pos: '2.1% 68.3%', size: '1.25rem 2.1875rem' },
      { color: 'rgb(100, 70, 255)', pos: '74.4% 100%', size: '11.25rem 2rem' },
      { color: 'rgb(40, 140, 255)', pos: '55% 100%', size: '5.3125rem 1.625rem' },
      { color: 'rgb(255, 120, 40)', pos: '93.9% 0%', size: '4.625rem 2rem' },
      { color: 'rgb(240, 50, 180)', pos: '100% 27.1%', size: '1.625rem 2.625rem' },
      { color: 'rgb(180, 40, 240)', pos: '100% 27.1%', size: '3.25rem 3rem' },
    ],
  },
  mono: {
    border: [
      { color: 'rgb(180, 180, 180)', pos: '33% -7.4%', size: '4.375rem 2.5rem' },
      { color: 'rgb(140, 140, 140)', pos: '12% -5%', size: '3.75rem 2.1875rem' },
      { color: 'rgb(160, 160, 160)', pos: '2.1% 68.3%', size: '2.5rem 4.375rem' },
      { color: 'rgb(130, 130, 130)', pos: '2.1% 68.3%', size: '1.25rem 2.1875rem' },
      { color: 'rgb(170, 170, 170)', pos: '74.4% 100%', size: '11.25rem 2rem' },
      { color: 'rgb(150, 150, 150)', pos: '55% 100%', size: '5.3125rem 1.625rem' },
      { color: 'rgb(190, 190, 190)', pos: '93.9% 0%', size: '4.625rem 2rem' },
      { color: 'rgb(145, 145, 145)', pos: '100% 27.1%', size: '1.625rem 2.625rem' },
      { color: 'rgb(165, 165, 165)', pos: '100% 27.1%', size: '3.25rem 3rem' },
    ],
  },
}

function buildRadialPerimeters(variant: ColorVariant): string {
  const p = CHROMATIC_CONFIGS[variant] || CHROMATIC_CONFIGS.ocean
  return p.border
    .map((item) => `radial-gradient(ellipse ${item.size} at ${item.pos}, ${item.color}, transparent)`)
    .join(',\n    ')
}

function buildRadialAtmospheres(variant: ColorVariant): string {
  const p = CHROMATIC_CONFIGS[variant] || CHROMATIC_CONFIGS.ocean
  const alpha = variant === 'mono' ? 0.225 : 0.45
  return p.border
    .map((item) => {
      const c = item.color.replace('rgb(', 'rgba(').replace(')', `, ${alpha})`)
      const [w, h] = item.size.split(' ').map((s) => {
        const val = parseFloat(s)
        const unit = s.replace(/[\d.]/g, '')
        return `${(val * 0.9).toFixed(4)}${unit}`
      })
      return `radial-gradient(ellipse ${w} ${h} at ${item.pos}, ${c}, transparent)`
    })
    .join(',\n    ')
}

interface LuminousBorderProps extends React.HTMLAttributes<HTMLDivElement> {
  borderRadius?: number
  borderWidth?: number
  brightness?: number
  saturation?: number
  hueRange?: number
  duration?: number
  colorVariant?: ColorVariant
  staticColors?: boolean
  children: React.ReactNode
}

const LuminousBorder = React.forwardRef<HTMLDivElement, LuminousBorderProps>(
  (
    {
      children,
      borderRadius = 20,
      borderWidth = 1,
      brightness = 1.35,
      saturation = 1.25,
      hueRange = 26,
      duration = 2.4,
      colorVariant = 'ocean',
      staticColors = false,
      className,
      style,
      ...props
    },
    ref,
  ) => {
    const rawId = React.useId()
    const id = React.useMemo(() => `orbit-${rawId.replace(/[^a-zA-Z0-9]/g, '')}`, [rawId])
    const containerRef = React.useRef<HTMLDivElement | null>(null)

    React.useEffect(() => {
      const el = containerRef.current
      if (!el) return

      let animationFrameId: number
      const startTime = performance.now()
      const durMs = duration * 1000

      const updateAngle = (now: number) => {
        const elapsed = (now - startTime) % durMs
        const angle = (elapsed / durMs) * 360
        el.style.setProperty(`--orbit-deg-${id}`, `${angle.toFixed(2)}deg`)
        animationFrameId = requestAnimationFrame(updateAngle)
      }

      animationFrameId = requestAnimationFrame(updateAngle)
      return () => cancelAnimationFrame(animationFrameId)
    }, [id, duration])

    const cssString = React.useMemo(() => {
      const innerRadiusRem = `${(Math.max(0, borderRadius - borderWidth) / 16).toFixed(4)}rem`
      const outerRadiusRem = `${(borderRadius / 16).toFixed(4)}rem`
      const edgeWidthRem = `${(borderWidth / 16).toFixed(4)}rem`
      const edgeAlpha = 0.52
      const surfaceAlpha = 0.42
      const diffusionAlpha = 0.35

      const chromaAnimation = staticColors ? '' : `animation: orbit-chroma-${id} 12s ease-in-out infinite;`

      const chromaKeyframes = staticColors
        ? ''
        : `
@keyframes orbit-chroma-${id} {
  0% { filter: hue-rotate(-${hueRange}deg) brightness(${brightness.toFixed(2)}) saturate(${saturation.toFixed(2)}); }
  50% { filter: hue-rotate(${hueRange}deg) brightness(${brightness.toFixed(2)}) saturate(${saturation.toFixed(2)}); }
  100% { filter: hue-rotate(-${hueRange}deg) brightness(${brightness.toFixed(2)}) saturate(${saturation.toFixed(2)}); }
}`

      const conicEdgeGradient = `conic-gradient(
        from var(--orbit-deg-${id}),
        transparent 0%, transparent 54%,
        rgba(255, 255, 255, 0.1) 57%,
        rgba(255, 255, 255, 0.3) 60%,
        rgba(255, 255, 255, 0.6) 63%,
        rgba(255, 255, 255, 0.75) 66%,
        rgba(255, 255, 255, 0.6) 69%,
        rgba(255, 255, 255, 0.3) 72%,
        rgba(255, 255, 255, 0.1) 75%,
        transparent 78%, transparent 100%
      )`

      const conicBloomGradient = `conic-gradient(
        from var(--orbit-deg-${id}),
        transparent 0%, transparent 58%,
        rgba(255, 255, 255, 0.03) 62%,
        rgba(255, 255, 255, 0.08) 65%,
        rgba(255, 255, 255, 0.2) 67%,
        rgba(255, 255, 255, 0.45) 69%,
        rgba(255, 255, 255, 0.85) 70%,
        rgba(255, 255, 255, 0.85) 70.5%,
        rgba(255, 255, 255, 0.45) 71.5%,
        rgba(255, 255, 255, 0.2) 73%,
        rgba(255, 255, 255, 0.08) 75%,
        rgba(255, 255, 255, 0.03) 78%,
        transparent 82%
      )`

      const perimeterLayers = buildRadialPerimeters(colorVariant)
      const surfaceLayers = buildRadialAtmospheres(colorVariant)

      return `
@property --orbit-deg-${id} {
  syntax: "<angle>";
  initial-value: 0deg;
  inherits: true;
}

@property --orbit-alpha-${id} {
  syntax: "<number>";
  initial-value: 1;
  inherits: true;
}

[data-glow-orbit="${id}"] {
  position: relative;
  border-radius: ${outerRadiusRem};
  overflow: hidden;
}

[data-glow-orbit="${id}"][data-active] {
  animation:
    orbit-rotation-${id} ${duration}s linear infinite,
    orbit-fade-${id} 0.6s ease forwards;
}

[data-glow-orbit="${id}"][data-active]::after {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: ${innerRadiusRem};
  padding: ${edgeWidthRem};
  clip-path: inset(0 round ${outerRadiusRem});
  background: ${conicEdgeGradient}, ${perimeterLayers};
  -webkit-mask:
    conic-gradient(
      from var(--orbit-deg-${id}),
      transparent 0%, transparent 30%,
      rgba(255, 255, 255, 0.1) 36%, rgba(255, 255, 255, 0.35) 44%,
      white 52%, white 80%,
      rgba(255, 255, 255, 0.35) 86%, rgba(255, 255, 255, 0.1) 92%,
      transparent 95%, transparent 100%
    ),
    linear-gradient(#fff 0 0) content-box,
    linear-gradient(#fff 0 0);
  -webkit-mask-composite: source-in, xor;
  mask:
    conic-gradient(
      from var(--orbit-deg-${id}),
      transparent 0%, transparent 30%,
      rgba(255, 255, 255, 0.1) 36%, rgba(255, 255, 255, 0.35) 44%,
      white 52%, white 80%,
      rgba(255, 255, 255, 0.35) 86%, rgba(255, 255, 255, 0.1) 92%,
      transparent 95%, transparent 100%
    ),
    linear-gradient(#fff 0 0) content-box,
    linear-gradient(#fff 0 0);
  mask-composite: intersect, exclude;
  pointer-events: none;
  z-index: 2;
  opacity: calc(var(--orbit-alpha-${id}, 1) * ${edgeAlpha} * var(--orbit-scale, 1));
  ${chromaAnimation}
}

[data-glow-orbit="${id}"][data-active]::before {
  content: "";
  position: absolute;
  inset: 0;
  corner-shape: squircle;
  border-radius: ${outerRadiusRem};
  background: ${surfaceLayers};
  -webkit-mask-image:
    conic-gradient(
      from var(--orbit-deg-${id}),
      transparent 0%, transparent 30%,
      rgba(255, 255, 255, 0.1) 36%, rgba(255, 255, 255, 0.35) 44%,
      white 52%, white 80%,
      rgba(255, 255, 255, 0.35) 86%, rgba(255, 255, 255, 0.1) 92%,
      transparent 95%, transparent 100%
    ),
    linear-gradient(white, transparent 1.75rem, transparent calc(100% - 1.75rem), white),
    linear-gradient(to right, white, transparent 1.75rem, transparent calc(100% - 1.75rem), white);
  -webkit-mask-composite: source-in, source-over;
  mask-image:
    conic-gradient(
      from var(--orbit-deg-${id}),
      transparent 0%, transparent 30%,
      rgba(255, 255, 255, 0.1) 36%, rgba(255, 255, 255, 0.35) 44%,
      white 52%, white 80%,
      rgba(255, 255, 255, 0.35) 86%, rgba(255, 255, 255, 0.1) 92%,
      transparent 95%, transparent 100%
    ),
    linear-gradient(white, transparent 1.75rem, transparent calc(100% - 1.75rem), white),
    linear-gradient(to right, white, transparent 1.75rem, transparent calc(100% - 1.75rem), white);
  mask-composite: intersect, add;
  pointer-events: none;
  z-index: 1;
  opacity: calc(var(--orbit-alpha-${id}, 1) * ${surfaceAlpha} * var(--orbit-scale, 1));
  clip-path: inset(0 round ${outerRadiusRem});
  ${chromaAnimation}
}

[data-glow-orbit="${id}"] [data-glow-diffusion] {
  display: block;
  position: absolute;
  inset: 0;
  corner-shape: squircle;
  border-radius: ${innerRadiusRem};
  clip-path: inset(0 round ${outerRadiusRem});
  background: ${conicBloomGradient};
  -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  mask-composite: exclude;
  padding: ${edgeWidthRem};
  filter: blur(0.5rem) brightness(${brightness.toFixed(2)}) saturate(${saturation.toFixed(2)});
  pointer-events: none;
  z-index: 3;
  opacity: calc(var(--orbit-alpha-${id}, 1) * ${diffusionAlpha} * var(--orbit-scale, 1));
}

@keyframes orbit-rotation-${id} {
  to { --orbit-deg-${id}: 360deg; }
}

@keyframes orbit-fade-${id} {
  to { --orbit-alpha-${id}: 1; }
}
${chromaKeyframes}
`
    }, [id, borderRadius, borderWidth, duration, brightness, saturation, hueRange, staticColors, colorVariant])

    return (
      <>
        <style dangerouslySetInnerHTML={{ __html: cssString }} />
        <div
          ref={(node) => {
            containerRef.current = node
            if (typeof ref === 'function') ref(node)
            else if (ref) (ref as React.MutableRefObject<HTMLDivElement | null>).current = node
          }}
          data-glow-orbit={id}
          data-active=""
          className={cn('relative', className)}
          style={{
            borderRadius: `${(borderRadius / 16).toFixed(4)}rem`,
            ...style,
          }}
          {...props}
        >
          {children}
          <div data-glow-diffusion="" aria-hidden="true" />
        </div>
      </>
    )
  },
)
LuminousBorder.displayName = 'LuminousBorder'

interface AmbientGlowProps extends React.HTMLAttributes<HTMLDivElement> {
  borderRadius?: number
  brightness?: number
  saturation?: number
  colorVariant?: ColorVariant
  duration?: number
  staticColors?: boolean
  children: React.ReactNode
}

function AmbientGlow({
  children,
  borderRadius = 20,
  brightness = 1.35,
  saturation = 1.25,
  colorVariant = 'ocean',
  duration = 2.4,
  staticColors = false,
  className,
  style,
  ...props
}: AmbientGlowProps) {
  const gradientColors = React.useMemo(() => {
    switch (colorVariant) {
      case 'sunset':
        return 'linear-gradient(90deg, #ef4444, #f97316 40%, #eab308 80%, #ef4444)'
      case 'colorful':
        return 'linear-gradient(90deg, #06b6d4, #3b82f6 30%, #a855f7 60%, #ec4899 90%)'
      case 'mono':
        return 'linear-gradient(90deg, #52525b, #a1a1aa 50%, #52525b)'
      case 'ocean':
      default:
        return 'linear-gradient(90deg, #0ea5e9, #2dd4bf 45%, #fde047 82%, #0ea5e9)'
    }
  }, [colorVariant])

  return (
    <div
      className={cn('relative isolate', className)}
      style={{
        borderRadius: `${(borderRadius / 16).toFixed(4)}rem`,
        ...style,
      }}
      {...props}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-[-0.09375rem] -z-10 [corner-shape:inherit] rounded-[inherit] opacity-90 transition-opacity duration-300"
        style={{
          background: gradientColors,
          backgroundSize: '250% 250%',
          animation: staticColors ? 'none' : `glow-breathe ${duration * 2}s ease-in-out infinite`,
          filter: `blur(0.25rem) brightness(${brightness}) saturate(${saturation})`,
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 [corner-shape:inherit] rounded-[inherit] bg-muted"
      />
      {children}
    </div>
  )
}

function ProgressBar({
  className,
  progress,
  state = 'idle',
}: {
  className?: string
  progress: number
  state?: UploadPhase
}) {
  return (
    <div className={cn('pointer-events-none w-full', className)}>
      <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted border border-muted">
        <motion.div
          className={cn(
            'h-full rounded-full transition-colors duration-300',
            state === 'success' ? 'bg-emerald-500' : state === 'error' ? 'bg-destructive' : 'bg-primary',
          )}
          initial={{ width: '0%' }}
          animate={{
            width: `${progress}%`,
          }}
          transition={{
            width: { duration: 0.28, ease: 'easeOut' },
          }}
        />
      </div>
    </div>
  )
}

export interface GradientFileUploadProps {
  accept?: string
  maxSizeMb?: number
  uploadDurationMs?: number
  title?: string
  description?: string
  variant?: UploadVariant
  className?: string
  onFileAccepted?: (file: File) => void
  onUpload?: (file: File) => Promise<{ status?: 'success' | 'error'; message?: string } | void>
}

export function GradientFileUpload({
  accept = '*',
  maxSizeMb = 50,
  uploadDurationMs = 2400,
  variant = 'original',
  className,
  onFileAccepted,
  onUpload,
}: GradientFileUploadProps) {
  const upload = useGradientFileUpload({
    maxSizeMb,
    uploadDurationMs,
    onFileAccepted,
    onUpload,
  })

  const registryUpload = useRegistryFileUpload({
    accept,
    maxSize: `${maxSizeMb}MB`,
    multiple: false,
    onFilesAdded: (addedFiles) => {
      const first = addedFiles[0]
      const fileObj = first?.file
      if (fileObj && typeof window !== 'undefined' && fileObj instanceof window.File) {
        upload.startUpload(fileObj)
      }
    },
    onError: (errors) => {
      if (errors.length > 0) {
        upload.fail(errors[0])
      }
    },
  })

  const typeInfo = React.useMemo(() => getFileTypeInfo(upload.file), [upload.file])
  const Icon = typeInfo.icon
  const colorVariant: ColorVariant = upload.resultState === 'error' ? 'sunset' : 'ocean'

  const roundedProgress = Math.round(upload.progress)
  const uploadedBytes = upload.file ? Math.round((upload.file.size * upload.progress) / 100) : 0

  const isDraggingActive = !upload.isBusy && (registryUpload.isDragging || upload.isDragging)

  const statusLabel =
    upload.phase === 'success'
      ? 'Uploaded'
      : upload.phase === 'error'
        ? 'Error'
        : upload.phase === 'uploading'
          ? `Uploading ${roundedProgress}%`
          : isDraggingActive
            ? 'Release to upload'
            : 'Ready'

  const sizeLabel = upload.file
    ? upload.phase === 'uploading'
      ? `${formatBytes(uploadedBytes, { decimals: 1 })} of ${formatBytes(upload.file.size, { decimals: 1 })}`
      : formatBytes(upload.file.size, { decimals: 1 })
    : `Up to ${formatBytes(parseBytes(`${maxSizeMb}MB`), { decimals: 0 })}`

  const ContainerComponent = variant === 'glow' ? AmbientGlow : LuminousBorder

  return (
    <ContainerComponent
      borderRadius={20}
      brightness={upload.resultState ? 1.4 : 1.25}
      colorVariant={colorVariant}
      duration={upload.phase === 'uploading' ? 1.7 : 2.4}
      hueRange={upload.resultState ? 0 : 26}
      saturation={upload.resultState ? 1.5 : 1.2}
      staticColors={!!upload.resultState}
      className={cn('mx-auto block w-full max-w-lg rounded-2xl border border-muted bg-background', className)}
    >
      <motion.div
        aria-busy={upload.isBusy}
        aria-live="polite"
        role="button"
        tabIndex={upload.isBusy ? -1 : 0}
        onClick={() => {
          if (!upload.isBusy) {
            safeSound(() => tap())
            registryUpload.openFileDialog()
          }
        }}
        onDragEnter={(e) => {
          if (!upload.isBusy) registryUpload.handleDragEnter(e)
        }}
        onDragLeave={registryUpload.handleDragLeave}
        onDragOver={(e) => {
          if (!upload.isBusy) registryUpload.handleDragOver(e)
        }}
        onDrop={(e) => {
          if (!upload.isBusy) registryUpload.handleDrop(e)
        }}
        onKeyDown={(e) => {
          if ((e.key === 'Enter' || e.key === ' ') && !upload.isBusy) {
            e.preventDefault()
            safeSound(() => tap())
            registryUpload.openFileDialog()
          }
        }}
        animate={{
          paddingBottom: upload.file ? '2.5rem' : '0.75rem',
        }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        className={cn(
          'group relative flex items-center justify-between w-full overflow-hidden px-3 pt-3 text-foreground',
          'rounded-2xl bg-background transition-[border-color,background-color] duration-300',
          'focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring',
        )}
      >
        <AnimatePresence initial={false}>
          {isDraggingActive && !upload.file && !upload.isBusy ? (
            <motion.div
              aria-hidden="true"
              key="drag-surface"
              className="pointer-events-none absolute inset-0 z-0 bg-accent opacity-20"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 0.2, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            />
          ) : null}
        </AnimatePresence>

        <motion.div
          aria-hidden="true"
          className={cn(
            'pointer-events-none absolute inset-y-0 left-0 z-0',
            upload.resultState === 'success'
              ? 'bg-emerald-500'
              : upload.resultState === 'error'
                ? 'bg-destructive'
                : 'bg-primary',
          )}
          initial={false}
          animate={{
            width: upload.file ? `${Math.max(upload.progress, 6)}%` : '0%',
            opacity: upload.file ? 0.08 : 0,
          }}
          transition={{
            width: { duration: 0.35, ease: [0.16, 1, 0.3, 1] },
            opacity: { duration: 0.35, ease: [0.16, 1, 0.3, 1] },
          }}
        />

        <input
          {...registryUpload.getInputProps({
            disabled: upload.isBusy,
            className: 'sr-only',
          })}
        />

        <div className="relative z-10 flex items-center gap-4 w-full">
          <motion.div
            className={cn(
              'relative flex flex-col size-12 shrink-0 items-center justify-between overflow-hidden squircle rounded-xl border border-muted bg-muted p-2',
              (upload.file || upload.isBusy) && 'bg-background! border-background',
            )}
            layout
            transition={{ type: 'spring', stiffness: 420, damping: 34 }}
          >
            <Icon className="size-4 shrink-0 text-foreground" strokeWidth={1.8} />
            <span className="text-[0.625rem] font-bold uppercase tracking-wider text-muted-foreground">
              {typeInfo.extension}
            </span>
          </motion.div>

          <div className="min-w-0 flex-1">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={upload.file ? upload.file.name : upload.phase}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.18, ease: 'easeOut' }}
              >
                <p className="truncate text-sm font-semibold leading-tight mt-1 text-foreground">
                  {upload.file?.name ?? 'Select a file'}
                </p>
                <div className="mt-1 flex min-w-0 flex-wrap items-center gap-x-1.5 gap-y-1 text-xs text-muted-foreground">
                  <span className="font-medium tabular-nums">{upload.message ?? statusLabel}</span>
                  <span aria-hidden="true">·</span>
                  <span className="truncate tabular-nums">{sizeLabel}</span>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="flex shrink-0 items-center gap-2">
            {upload.isBusy && (
              <Button
                type="button"
                variant="secondary"
                size="icon-sm"
                squircle
                disabled
                aria-label="Upload in progress"
                className="cursor-not-allowed bg-background! opacity-60"
                onClick={(e) => e.stopPropagation()}
              >
                <IconPlayerPause className="size-3.5 fill-current" />
              </Button>
            )}
            {(upload.file || upload.resultState) && !upload.isBusy && (
              <Button
                type="button"
                variant="secondary"
                size="icon-sm"
                squircle
                aria-label="Remove file"
                className="bg-background! border-background"
                onClick={(e) => {
                  e.stopPropagation()
                  safeSound(() => tap())
                  registryUpload.clearFiles()
                  upload.reset()
                }}
              >
                <IconX className="size-3.5" />
              </Button>
            )}
            {!upload.file && !upload.isBusy && (
              <Button
                type="button"
                variant="primary"
                size="icon-sm"
                squircle
                aria-label="Choose file"
                onClick={(e) => {
                  e.stopPropagation()
                  safeSound(() => tap())
                  registryUpload.openFileDialog()
                }}
              >
                <IconArrowUp className="size-3.5" />
              </Button>
            )}
          </div>
        </div>

        <AnimatePresence initial={false}>
          {upload.file ? (
            <motion.div
              key="upload-progress"
              className="absolute inset-x-3 bottom-3.5 z-10"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 6 }}
              transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            >
              <ProgressBar progress={upload.progress} state={upload.phase} />
            </motion.div>
          ) : null}
        </AnimatePresence>
      </motion.div>
    </ContainerComponent>
  )
}
