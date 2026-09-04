'use client'

import { useState } from 'react'
import { useEventListener } from '@/registry/hooks/dom/use-event-listener'

export interface MousePosition {
  x: number
  y: number
}

/**
 * React hook that tracks the global mouse pointer coordinate positions (X and Y).
 *
 * @returns {MousePosition} Object containing `{ x, y }` coordinates.
 *
 * @example
 * const { x, y } = useMousePosition();
 */
export function useMousePosition(): MousePosition {
  const [mousePosition, setMousePosition] = useState<MousePosition>({
    x: 0,
    y: 0,
  })

  useEventListener('mousemove', (event: MouseEvent) => {
    setMousePosition({ x: event.clientX, y: event.clientY })
  })

  return mousePosition
}
