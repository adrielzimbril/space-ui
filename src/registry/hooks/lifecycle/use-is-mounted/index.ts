'use client'

import { useRef, useEffect, useCallback } from 'react'

/**
 * React hook returning a getter function to check if the component is currently mounted (useful for async cancellations).
 *
 * @returns {() => boolean} Function returning `true` if component is currently mounted.
 *
 * @example
 * const isMounted = useIsMounted();
 * const fetchData = async () => {
 *   const data = await api.get();
 *   if (isMounted()) setState(data);
 * };
 */
export function useIsMounted(): () => boolean {
  const isMounted = useRef(false)

  useEffect(() => {
    isMounted.current = true
    return () => {
      isMounted.current = false
    }
  }, [])

  return useCallback(() => isMounted.current, [])
}
