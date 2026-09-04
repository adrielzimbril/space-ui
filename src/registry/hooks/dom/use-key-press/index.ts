'use client'

import { useState } from 'react'
import { useEventListener } from '@/registry/hooks/dom/use-event-listener'

/**
 * React hook that returns `true` while a specific keyboard key is pressed down.
 *
 * @param {string} targetKey - The key value to watch (e.g. 'Escape', 'Enter', 'ArrowDown').
 * @returns {boolean} `true` while the key is pressed, `false` when released.
 *
 * @example
 * const isShiftPressed = useKeyPress('Shift');
 */
export function useKeyPress(targetKey: string): boolean {
  const [keyPressed, setKeyPressed] = useState<boolean>(false)

  function downHandler({ key }: KeyboardEvent): void {
    if (key === targetKey) {
      setKeyPressed(true)
    }
  }

  const upHandler = ({ key }: KeyboardEvent): void => {
    if (key === targetKey) {
      setKeyPressed(false)
    }
  }

  useEventListener('keydown', downHandler)
  useEventListener('keyup', upHandler)

  return keyPressed
}
