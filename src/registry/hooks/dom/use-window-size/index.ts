'use client'

import { useState } from 'react'
import { useEventListener } from '@/registry/hooks/dom/use-event-listener'
import { useIsomorphicLayoutEffect } from '@/registry/hooks/lifecycle/use-isomorphic-layout-effect'

export interface WindowSize {
  width: number
  height: number
}

/**
 * React hook to observe the current inner dimensions (width & height) of the browser window.
 *
 * @returns {WindowSize} Object with current `{ width, height }` in pixels.
 *
 * @example
 * const { width, height } = useWindowSize();
 */
export function useWindowSize(): WindowSize {
  const [windowSize, setWindowSize] = useState<WindowSize>({
    width: 0,
    height: 0,
  })

  useIsomorphicLayoutEffect(() => {
    if (typeof window !== 'undefined') {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      })
    }
  }, [])

  useEventListener('resize', () => {
    if (typeof window !== 'undefined') {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      })
    }
  })

  return windowSize
}
