'use client'

import { useState, type RefObject } from 'react'
import { useIsomorphicLayoutEffect } from '@/registry/hooks/lifecycle/use-isomorphic-layout-effect'

export interface ElementSize {
  width: number
  height: number
}

/**
 * React hook to measure and observe the dynamic pixel dimensions (width & height) of a DOM element using `ResizeObserver`.
 *
 * @template T
 * @param {RefObject<T | null>} targetRef - React ref of the DOM element to measure.
 * @returns {ElementSize} Object with `{ width, height }`.
 *
 * @example
 * const cardRef = useRef<HTMLDivElement>(null);
 * const { width, height } = useSize(cardRef);
 */
export function useSize<T extends HTMLElement = HTMLElement>(targetRef: RefObject<T | null>): ElementSize {
  const [size, setSize] = useState<ElementSize>({ width: 0, height: 0 })

  useIsomorphicLayoutEffect(() => {
    const target = targetRef.current
    if (!target || typeof ResizeObserver === 'undefined') return

    const observer = new ResizeObserver(([entry]) => {
      if (entry) {
        const { width, height } = entry.contentRect
        setSize({ width, height })
      }
    })

    observer.observe(target)
    return () => observer.disconnect()
  }, [targetRef])

  return size
}
