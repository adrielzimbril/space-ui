'use client'

import { useState, useCallback, type RefObject } from 'react'
import { useEventListener } from '@/registry/hooks/dom/use-event-listener'
import { useIsomorphicLayoutEffect } from '@/registry/hooks/lifecycle/use-isomorphic-layout-effect'

export type ScrollPositionTuple = [number, number]

export interface ScrollPositionObject {
  x: number
  y: number
  scrollX: number
  scrollY: number
}

export type ScrollPosition = ScrollPositionTuple & ScrollPositionObject

/**
 * React hook that returns the current window or container scroll offsets.
 * Supports both object destructuring ({ x, y, scrollX, scrollY }) and array tuple destructuring ([x, y]).
 *
 * @param {RefObject<HTMLElement | null>} [targetRef] - Optional element ref to measure instead of window.
 * @returns {ScrollPosition} Object & Tuple containing `{ x, y, scrollX, scrollY }`.
 *
 * @example
 * // Object destructuring with scrollX / scrollY:
 * const { scrollX, scrollY } = useScrollPosition();
 *
 * // Object destructuring with x / y:
 * const { x, y } = useScrollPosition();
 *
 * // Array destructuring:
 * const [x, y] = useScrollPosition();
 */
export function useScrollPosition<T extends HTMLElement = HTMLElement>(
  targetRef?: RefObject<T | null>,
): ScrollPosition {
  const getPosition = useCallback((): [number, number] => {
    if (typeof window === 'undefined') return [0, 0]
    if (targetRef && targetRef.current) {
      return [targetRef.current.scrollLeft, targetRef.current.scrollTop]
    }
    return [window.scrollX || window.pageXOffset || 0, window.scrollY || window.pageYOffset || 0]
  }, [targetRef])

  const [coords, setCoords] = useState<[number, number]>([0, 0])

  useIsomorphicLayoutEffect(() => {
    setCoords(getPosition())
  }, [getPosition])

  const handleScroll = useCallback(() => {
    setCoords(getPosition())
  }, [getPosition])

  useEventListener('scroll', handleScroll, targetRef as any, { passive: true })

  const [x, y] = coords
  const result = [x, y] as unknown as ScrollPosition
  ;(result as any).x = x
  ;(result as any).y = y
  ;(result as any).scrollX = x
  ;(result as any).scrollY = y

  return result
}
