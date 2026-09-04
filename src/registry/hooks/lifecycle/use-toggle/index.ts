'use client'

import { useState, useCallback } from 'react'

/**
 * React hook to manage boolean toggle states with explicit set/toggle handlers.
 *
 * @param {boolean} [initialValue=false] - Initial boolean state.
 * @returns {[boolean, (value?: boolean) => void, (next: boolean) => void]} Tuple of [value, toggle, setValue].
 *
 * @example
 * const [isOpen, toggleOpen, setIsOpen] = useToggle(false);
 */
export function useToggle(initialValue = false): [boolean, (value?: boolean) => void, (next: boolean) => void] {
  const [value, setValue] = useState<boolean>(initialValue)

  const toggle = useCallback((next?: boolean) => {
    setValue((current) => (typeof next === 'boolean' ? next : !current))
  }, [])

  return [value, toggle, setValue]
}
