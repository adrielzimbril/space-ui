'use client'

import { useRef, useCallback } from 'react'
import { useIsomorphicLayoutEffect } from '@/registry/hooks/lifecycle/use-isomorphic-layout-effect'

/**
 * React hook to return a stable memoized callback reference that always executes the latest handler logic without re-subscribing.
 *
 * @template T
 * @param {T} fn - The callback function to memoize.
 * @returns {T} Stable function reference.
 *
 * @example
 * const handleClick = useEventCallback((event) => {
 *   console.log('Current count:', count);
 * });
 */
export function useEventCallback<T extends (...args: any[]) => any>(fn: T): T {
  const ref = useRef<T>(fn)

  useIsomorphicLayoutEffect(() => {
    ref.current = fn
  })

  return useCallback((...args: any[]) => ref.current(...args), []) as T
}
