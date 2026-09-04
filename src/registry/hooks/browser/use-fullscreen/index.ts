'use client'

import { useState, useCallback, useEffect, type RefObject } from 'react'

/**
 * React hook to control and observe full-screen mode for the window or an element.
 *
 * @param {RefObject<HTMLElement | null>} [elementRef] - Optional element ref to fullscreen (defaults to documentElement).
 * @returns {{ isFullscreen: boolean, enter: () => Promise<void>, exit: () => Promise<void>, toggle: () => Promise<void> }} Fullscreen state and actions.
 *
 * @example
 * const { isFullscreen, toggle } = useFullscreen();
 */
export function useFullscreen(elementRef?: RefObject<HTMLElement | null>) {
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false)

  const enter = useCallback(async () => {
    if (typeof document === 'undefined') return
    const element = elementRef?.current || document.documentElement
    if (element.requestFullscreen) {
      await element.requestFullscreen()
    }
  }, [elementRef])

  const exit = useCallback(async () => {
    if (typeof document === 'undefined') return
    if (document.fullscreenElement && document.exitFullscreen) {
      await document.exitFullscreen()
    }
  }, [])

  const toggle = useCallback(async () => {
    if (isFullscreen) {
      await exit()
    } else {
      await enter()
    }
  }, [isFullscreen, enter, exit])

  useEffect(() => {
    if (typeof document === 'undefined') return

    const handleFullscreenChange = () => {
      setIsFullscreen(Boolean(document.fullscreenElement))
    }

    document.addEventListener('fullscreenchange', handleFullscreenChange)
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange)
  }, [])

  return { isFullscreen, enter, exit, toggle }
}
