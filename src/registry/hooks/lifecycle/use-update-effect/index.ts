'use client'

import { useRef, useEffect, type EffectCallback, type DependencyList } from 'react'

/**
 * React hook that runs an effect only on subsequent component updates, skipping the initial mount render.
 *
 * @param {EffectCallback} effect - The effect callback to execute on updates.
 * @param {DependencyList} [deps] - Dependency array.
 *
 * @example
 * useUpdateEffect(() => {
 *   console.log('Query changed:', query);
 * }, [query]);
 */
export function useUpdateEffect(effect: EffectCallback, deps?: DependencyList): void {
  const isFirstRender = useRef(true)

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false
      return
    }
    return effect()
  }, deps)
}
