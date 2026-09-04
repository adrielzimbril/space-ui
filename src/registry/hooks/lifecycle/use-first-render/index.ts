'use client'

import { useRef } from 'react'

/**
 * React hook that returns `true` strictly during the component's initial render, and `false` thereafter.
 *
 * @returns {boolean} `true` on first render, otherwise `false`.
 *
 * @example
 * const isFirst = useFirstRender();
 */
export function useFirstRender(): boolean {
  const isFirst = useRef(true)

  if (isFirst.current) {
    isFirst.current = false
    return true
  }

  return isFirst.current
}
