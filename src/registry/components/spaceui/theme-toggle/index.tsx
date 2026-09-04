'use client'

import React, { useState, useEffect, useCallback } from 'react'
import { flushSync } from 'react-dom'
import { useTheme } from 'next-themes'
import { Button, type ButtonProps } from '@/registry/primitives/button'
import { MorphIcon } from '@/registry/components/spaceui/morph-icon'
import { IconSun, IconMoon } from '@tabler/icons-react'
import { cn } from '@/registry/lib/utils'

export const THEME_TOGGLE_CONFIG = {
  circle: {
    label: 'Circle',
    directions: ['center', 'top-left', 'top-right', 'bottom-left', 'bottom-right', 'top-center', 'bottom-center'],
    defaultDirection: 'center',
    supportsBlur: true,
  },
  'circle-blur': {
    label: 'Circle Blur',
    directions: ['center', 'top-left', 'top-right', 'bottom-left', 'bottom-right', 'top-center', 'bottom-center'],
    defaultDirection: 'center',
    supportsBlur: false,
  },
  rectangle: {
    label: 'Rectangle',
    directions: [
      'bottom-up',
      'top-down',
      'left-right',
      'right-left',
      'top-left',
      'top-right',
      'bottom-left',
      'bottom-right',
    ],
    defaultDirection: 'bottom-up',
    supportsBlur: true,
  },
  polygon: {
    label: 'Polygon',
    directions: ['top-left', 'top-right'],
    defaultDirection: 'top-left',
    supportsBlur: true,
  },
} as const

export type Variant = keyof typeof THEME_TOGGLE_CONFIG
export type CircleDirection = (typeof THEME_TOGGLE_CONFIG)['circle']['directions'][number]
export type RectangleDirection = (typeof THEME_TOGGLE_CONFIG)['rectangle']['directions'][number]
export type PolygonDirection = (typeof THEME_TOGGLE_CONFIG)['polygon']['directions'][number]

export type StartPos = CircleDirection | RectangleDirection | PolygonDirection

export interface UseThemeToggleProps {
  variant?: Variant
  start?: StartPos
  blur?: boolean
}

const getStartCoordinates = (start: StartPos) => {
  switch (start) {
    case 'top-left':
      return { cx: '0', cy: '0' }
    case 'top-right':
      return { cx: '40', cy: '0' }
    case 'bottom-left':
      return { cx: '0', cy: '40' }
    case 'bottom-right':
      return { cx: '40', cy: '40' }
    case 'top-center':
      return { cx: '20', cy: '0' }
    case 'bottom-center':
      return { cx: '20', cy: '40' }
    case 'bottom-up':
    case 'top-down':
    case 'left-right':
    case 'right-left':
    case 'center':
    default:
      return { cx: '20', cy: '20' }
  }
}

export const createAnimation = (variant: Variant = 'circle', start?: StartPos, blur: boolean = false) => {
  const config = THEME_TOGGLE_CONFIG[variant] ?? THEME_TOGGLE_CONFIG.circle
  const validDirections = config.directions as readonly string[]
  const effectiveStart = start && validDirections.includes(start) ? start : config.defaultDirection
  const getSvgDataUrl = (v: Variant, s: StartPos) => {
    if (v === 'circle-blur') {
      if (s === 'center') {
        return `data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40"><defs><filter id="blur"><feGaussianBlur stdDeviation="2"/></filter></defs><circle cx="20" cy="20" r="18" fill="white" filter="url(%23blur)"/></svg>`
      }
      const coords = getStartCoordinates(s)
      if (!coords) throw new Error(`Invalid start position: ${s}`)
      return `data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40"><defs><filter id="blur"><feGaussianBlur stdDeviation="2"/></filter></defs><circle cx="${coords.cx}" cy="${coords.cy}" r="18" fill="white" filter="url(%23blur)"/></svg>`
    }
    if (s === 'center') return
    if (v === 'rectangle') return ''
    const coords = getStartCoordinates(s)
    if (!coords) throw new Error(`Invalid start position: ${s}`)
    return v === 'circle'
      ? `data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40"><circle cx="${coords.cx}" cy="${coords.cy}" r="20" fill="white"/></svg>`
      : ''
  }

  const svgDataUrl = getSvgDataUrl(variant, effectiveStart)
  const startTransformOrigin = (() => {
    switch (effectiveStart) {
      case 'top-left':
        return 'top left'
      case 'top-right':
        return 'top right'
      case 'bottom-left':
        return 'bottom left'
      case 'bottom-right':
        return 'bottom right'
      case 'top-center':
        return 'top center'
      case 'bottom-center':
        return 'bottom center'
      case 'bottom-up':
      case 'top-down':
      case 'left-right':
      case 'right-left':
      default:
        return 'center'
    }
  })()

  if (variant === 'rectangle') {
    const polygon = (() => {
      switch (effectiveStart) {
        case 'top-down':
          return { from: 'polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)', to: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)' }
        case 'left-right':
          return { from: 'polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)', to: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)' }
        case 'right-left':
          return {
            from: 'polygon(100% 0%, 100% 0%, 100% 100%, 100% 100%)',
            to: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
          }
        case 'top-left':
          return { from: 'polygon(0% 0%, 0% 0%, 0% 0%, 0% 0%)', to: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)' }
        case 'top-right':
          return {
            from: 'polygon(100% 0%, 100% 0%, 100% 100%, 100% 0%)',
            to: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
          }
        case 'bottom-left':
          return {
            from: 'polygon(0% 100%, 0% 100%, 0% 100%, 0% 100%)',
            to: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
          }
        case 'bottom-right':
          return {
            from: 'polygon(100% 100%, 100% 100%, 100% 100%, 100% 100%)',
            to: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
          }
        case 'bottom-up':
        default:
          return {
            from: 'polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)',
            to: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
          }
      }
    })()

    const suffix = blur ? '-blur' : ''
    return {
      name: `${variant}-${effectiveStart}${suffix}`,
      css: `
        ::view-transition-group(root) { animation-duration: 0.7s; animation-timing-function: cubic-bezier(0.16, 1, 0.3, 1); }
        ::view-transition-new(root) { animation-name: reveal-light-${effectiveStart}${suffix}; z-index: 2; ${blur ? 'filter: blur(2px);' : ''} }
        ::view-transition-old(root) { animation: none; z-index: 1; }
        .dark::view-transition-new(root) { animation-name: reveal-dark-${effectiveStart}${suffix}; z-index: 2; ${blur ? 'filter: blur(2px);' : ''} }
        @keyframes reveal-dark-${effectiveStart}${suffix} {
          from { clip-path: ${polygon.from}; ${blur ? 'filter: blur(8px);' : ''} }
          ${blur ? '50% { filter: blur(4px); }' : ''}
          to { clip-path: ${polygon.to}; ${blur ? 'filter: blur(0px);' : ''} }
        }
        @keyframes reveal-light-${effectiveStart}${suffix} {
          from { clip-path: ${polygon.from}; ${blur ? 'filter: blur(8px);' : ''} }
          ${blur ? '50% { filter: blur(4px); }' : ''}
          to { clip-path: ${polygon.to}; ${blur ? 'filter: blur(0px);' : ''} }
        }
      `,
    }
  }

  if (variant === 'circle' && effectiveStart === 'center') {
    const suffix = blur ? '-blur' : ''
    return {
      name: `${variant}-${effectiveStart}${suffix}`,
      css: `
        ::view-transition-group(root) { animation-duration: 0.7s; animation-timing-function: cubic-bezier(0.16, 1, 0.3, 1); }
        ::view-transition-new(root) { animation-name: reveal-light${suffix}; z-index: 2; ${blur ? 'filter: blur(2px);' : ''} }
        ::view-transition-old(root) { animation: none; z-index: 1; }
        .dark::view-transition-new(root) { animation-name: reveal-dark${suffix}; z-index: 2; ${blur ? 'filter: blur(2px);' : ''} }
        @keyframes reveal-dark${suffix} {
          from { clip-path: circle(0% at 50% 50%); ${blur ? 'filter: blur(8px);' : ''} }
          ${blur ? '50% { filter: blur(4px); }' : ''}
          to { clip-path: circle(100% at 50% 50%); ${blur ? 'filter: blur(0px);' : ''} }
        }
        @keyframes reveal-light${suffix} {
          from { clip-path: circle(0% at 50% 50%); ${blur ? 'filter: blur(8px);' : ''} }
          ${blur ? '50% { filter: blur(4px); }' : ''}
          to { clip-path: circle(100% at 50% 50%); ${blur ? 'filter: blur(0px);' : ''} }
        }
      `,
    }
  }

  if (variant === 'circle-blur') {
    if (effectiveStart === 'center') {
      return {
        name: `${variant}-${effectiveStart}`,
        css: `
          ::view-transition-group(root) { animation-timing-function: cubic-bezier(0.16, 1, 0.3, 1); }
          ::view-transition-new(root) { mask: url('${svgDataUrl}') center / 0 no-repeat; mask-origin: content-box; -webkit-mask: url('${svgDataUrl}') center / 0 no-repeat; -webkit-mask-origin: content-box; animation: scale 1s; transform-origin: center; z-index: 2; }
          ::view-transition-old(root) { animation: none; z-index: 1; }
          @keyframes scale { from { mask-size: 0px; -webkit-mask-size: 0px; } to { mask-size: 350vmax; -webkit-mask-size: 350vmax; } }
        `,
      }
    } else {
      return {
        name: `${variant}-${effectiveStart}`,
        css: `
          ::view-transition-group(root) { animation-timing-function: cubic-bezier(0.16, 1, 0.3, 1); }
          ::view-transition-new(root) { mask: url('${svgDataUrl}') ${effectiveStart.replace('-', ' ')} / 0 no-repeat; mask-origin: content-box; -webkit-mask: url('${svgDataUrl}') ${effectiveStart.replace('-', ' ')} / 0 no-repeat; -webkit-mask-origin: content-box; animation: scale 1s; transform-origin: ${startTransformOrigin}; z-index: 2; }
          ::view-transition-old(root) { animation: none; z-index: 1; }
          @keyframes scale { from { mask-size: 0px; -webkit-mask-size: 0px; } to { mask-size: 350vmax; -webkit-mask-size: 350vmax; } }
        `,
      }
    }
  }

  if (variant === 'polygon') {
    const polygon = (() => {
      switch (effectiveStart) {
        case 'top-right':
          return {
            darkFrom: 'polygon(150% -71%, 250% 71%, 250% 71%, 150% -71%)',
            darkTo: 'polygon(150% -71%, 250% 71%, 50% 171%, -71% 50%)',
            lightFrom: 'polygon(-71% 50%, 50% 171%, 50% 171%, -71% 50%)',
            lightTo: 'polygon(-71% 50%, 50% 171%, 250% 71%, 150% -71%)',
          }
        case 'top-left':
        default:
          return {
            darkFrom: 'polygon(50% -71%, -50% 71%, -50% 71%, 50% -71%)',
            darkTo: 'polygon(50% -71%, -50% 71%, 50% 171%, 171% 50%)',
            lightFrom: 'polygon(171% 50%, 50% 171%, 50% 171%, 171% 50%)',
            lightTo: 'polygon(171% 50%, 50% 171%, -50% 71%, 50% -71%)',
          }
      }
    })()
    const suffix = blur ? '-blur' : ''
    return {
      name: `${variant}-${effectiveStart}${suffix}`,
      css: `
        ::view-transition-group(root) { animation-duration: 0.7s; animation-timing-function: cubic-bezier(0.16, 1, 0.3, 1); }
        ::view-transition-new(root) { animation-name: reveal-light-${effectiveStart}${suffix}; z-index: 2; ${blur ? 'filter: blur(2px);' : ''} }
        ::view-transition-old(root) { animation: none; z-index: 1; }
        .dark::view-transition-new(root) { animation-name: reveal-dark-${effectiveStart}${suffix}; z-index: 2; ${blur ? 'filter: blur(2px);' : ''} }
        @keyframes reveal-dark-${effectiveStart}${suffix} {
          from { clip-path: ${polygon.darkFrom}; ${blur ? 'filter: blur(8px);' : ''} }
          ${blur ? '50% { filter: blur(4px); }' : ''}
          to { clip-path: ${polygon.darkTo}; ${blur ? 'filter: blur(0px);' : ''} }
        }
        @keyframes reveal-light-${effectiveStart}${suffix} {
          from { clip-path: ${polygon.lightFrom}; ${blur ? 'filter: blur(8px);' : ''} }
          ${blur ? '50% { filter: blur(4px); }' : ''}
          to { clip-path: ${polygon.lightTo}; ${blur ? 'filter: blur(0px);' : ''} }
        }
      `,
    }
  }

  if (variant === 'circle' && effectiveStart !== 'center') {
    const coords = (() => {
      switch (effectiveStart) {
        case 'top-left':
          return '0% 0%'
        case 'top-right':
          return '100% 0%'
        case 'bottom-left':
          return '0% 100%'
        case 'bottom-right':
          return '100% 100%'
        case 'top-center':
          return '50% 0%'
        case 'bottom-center':
          return '50% 100%'
        default:
          return '50% 50%'
      }
    })()
    const suffix = blur ? '-blur' : ''
    return {
      name: `${variant}-${effectiveStart}${suffix}`,
      css: `
        ::view-transition-group(root) { animation-duration: 1s; animation-timing-function: cubic-bezier(0.16, 1, 0.3, 1); }
        ::view-transition-new(root) { animation-name: reveal-light-${effectiveStart}${suffix}; z-index: 2; ${blur ? 'filter: blur(2px);' : ''} }
        ::view-transition-old(root) { animation: none; z-index: 1; }
        .dark::view-transition-new(root) { animation-name: reveal-dark-${effectiveStart}${suffix}; z-index: 2; ${blur ? 'filter: blur(2px);' : ''} }
        @keyframes reveal-dark-${effectiveStart}${suffix} {
          from { clip-path: circle(0% at ${coords}); ${blur ? 'filter: blur(8px);' : ''} }
          ${blur ? '50% { filter: blur(4px); }' : ''}
          to { clip-path: circle(150% at ${coords}); ${blur ? 'filter: blur(0px);' : ''} }
        }
        @keyframes reveal-light-${effectiveStart}${suffix} {
          from { clip-path: circle(0% at ${coords}); ${blur ? 'filter: blur(8px);' : ''} }
          ${blur ? '50% { filter: blur(4px); }' : ''}
          to { clip-path: circle(150% at ${coords}); ${blur ? 'filter: blur(0px);' : ''} }
        }
      `,
    }
  }

  const suffix = blur ? '-blur' : ''
  return {
    name: `${variant}-${effectiveStart}${suffix}`,
    css: `
      ::view-transition-group(root) { animation-timing-function: cubic-bezier(0.7, 0, 0.84, 0); }
      ::view-transition-new(root) { mask: url('${svgDataUrl}') ${effectiveStart.replace('-', ' ')} / 0 no-repeat; mask-origin: content-box; -webkit-mask: url('${svgDataUrl}') ${effectiveStart.replace('-', ' ')} / 0 no-repeat; -webkit-mask-origin: content-box; animation: scale-${effectiveStart}${suffix} 1s; transform-origin: ${startTransformOrigin}; z-index: 2; ${blur ? 'filter: blur(2px);' : ''} }
      ::view-transition-old(root) { animation: none; z-index: 1; }
      @keyframes scale-${effectiveStart}${suffix} {
        from { mask-size: 0px; -webkit-mask-size: 0px; ${blur ? 'filter: blur(8px);' : ''} }
        ${blur ? '50% { filter: blur(4px); }' : ''}
        to { mask-size: 2000vmax; -webkit-mask-size: 2000vmax; ${blur ? 'filter: blur(0px);' : ''} }
      }
    `,
  }
}

export const useThemeToggle = ({ variant = 'circle', start, blur = false }: UseThemeToggleProps = {}) => {
  const { theme, setTheme, resolvedTheme } = useTheme()
  const [isDark, setIsDark] = useState(false)

  useEffect(() => {
    setIsDark(resolvedTheme === 'dark')
  }, [resolvedTheme])

  const styleId = 'theme-transition-styles'
  const injectStyles = useCallback((css: string) => {
    let el = document.getElementById(styleId)
    if (!el) {
      el = document.createElement('style')
      el.id = styleId
      document.head.appendChild(el)
    }
    el.textContent = css
  }, [])

  const triggerTransition = useCallback(
    (newTheme: 'light' | 'dark' | 'system', isDarkNew: boolean) => {
      setIsDark(isDarkNew)

      if (typeof document === 'undefined') return

      const { css } = createAnimation(variant, start, blur)
      injectStyles(css)

      const applyTheme = () => {
        flushSync(() => {
          setTheme(newTheme)
        })
        if (newTheme === 'dark') {
          document.documentElement.classList.add('dark')
        } else if (newTheme === 'light') {
          document.documentElement.classList.remove('dark')
        } else {
          const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
          document.documentElement.classList.toggle('dark', prefersDark)
        }
      }

      if (!document.startViewTransition) {
        applyTheme()
        const el = document.getElementById(styleId)
        if (el) el.remove()
        return
      }

      const transition = document.startViewTransition(applyTheme)

      transition.finished.finally(() => {
        const el = document.getElementById(styleId)
        if (el) el.remove()
      })
    },
    [setTheme, variant, start, blur, injectStyles],
  )

  const toggleTheme = useCallback(() => {
    const currentIsDark = resolvedTheme ? resolvedTheme === 'dark' : isDark
    const nextIsDark = !currentIsDark
    const nextTheme = nextIsDark ? 'dark' : 'light'
    triggerTransition(nextTheme, nextIsDark)
  }, [resolvedTheme, isDark, triggerTransition])

  const setCrazyLightTheme = useCallback(() => triggerTransition('light', false), [triggerTransition])
  const setCrazyDarkTheme = useCallback(() => triggerTransition('dark', true), [triggerTransition])
  const setCrazySystemTheme = useCallback(() => {
    const prefersDark = typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches
    triggerTransition('system', prefersDark)
  }, [triggerTransition])

  return { isDark, setIsDark, toggleTheme, setCrazyLightTheme, setCrazyDarkTheme, setCrazySystemTheme }
}

export type ThemeToggleSize =
  'xs' | 'sm' | 'md' | 'default' | 'lg' | 'xl' | 'icon' | 'icon-xs' | 'icon-sm' | 'icon-lg' | 'icon-xl'

const BUTTON_SIZE_MAP: Record<ThemeToggleSize, ButtonProps['size']> = {
  xs: 'icon-xs',
  'icon-xs': 'icon-xs',
  sm: 'icon-sm',
  'icon-sm': 'icon-sm',
  md: 'icon',
  default: 'icon',
  icon: 'icon',
  lg: 'icon-lg',
  'icon-lg': 'icon-lg',
  xl: 'icon-xl',
  'icon-xl': 'icon-xl',
}

export interface ThemeToggleButtonProps extends UseThemeToggleProps, Omit<ButtonProps, 'onClick' | 'size'> {
  buttonVariant?: ButtonProps['variant']
  size?: ThemeToggleSize
  iconSize?: string
}

export const ThemeToggleButton = ({
  className,
  size = 'icon',
  variant = 'circle',
  buttonVariant = 'secondary',
  start,
  blur = false,
  iconSize,
  title,
  ...props
}: ThemeToggleButtonProps) => {
  const { isDark, toggleTheme } = useThemeToggle({ variant, start, blur })
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const buttonSize = (size && BUTTON_SIZE_MAP[size]) || 'icon'

  const calculatedIconClass =
    iconSize ||
    (size === 'icon-xs' || size === 'xs'
      ? 'size-3.5'
      : size === 'icon-sm' || size === 'sm'
        ? 'size-4'
        : size === 'icon-lg' || size === 'lg'
          ? 'size-5'
          : size === 'icon-xl' || size === 'xl'
            ? 'size-5.5'
            : 'size-4.5')

  if (!mounted) {
    return (
      <Button
        className={cn('relative overflow-hidden cursor-pointer', className)}
        size={buttonSize}
        variant={buttonVariant}
        title="Toggle theme"
        aria-label="Toggle theme"
        {...props}
      >
        <span className={calculatedIconClass} />
        <span className="sr-only">Toggle theme</span>
      </Button>
    )
  }

  return (
    <Button
      onClick={toggleTheme}
      size={buttonSize}
      variant={buttonVariant}
      className={cn('relative overflow-hidden cursor-pointer', className)}
      title={title || `Theme: ${isDark ? 'dark' : 'light'} (click to switch)`}
      aria-label={title || 'Toggle theme'}
      suppressHydrationWarning
      {...props}
    >
      <MorphIcon activeKey={isDark ? 'dark' : 'light'} variant="blur-scale">
        {isDark ? <IconSun className={calculatedIconClass} /> : <IconMoon className={calculatedIconClass} />}
      </MorphIcon>
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}
