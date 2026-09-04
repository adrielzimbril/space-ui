'use client'

import { useRef, useEffect, type EffectCallback } from 'react'

/**
 * React hook that runs an effect strictly once during the component's lifetime (safe against React 18 StrictMode double-execution).
 *
 * @param {EffectCallback} effect - The effect callback to execute once.
 *
 * @example
 * useSingleEffect(() => {
 *   analytics.trackPageView('/home');
 * });
 */
export function useSingleEffect(effect: EffectCallback): void {
  const executed = useRef(false)

  useEffect(() => {
    if (executed.current) return
    executed.current = true
    return effect()
  }, [])
}
