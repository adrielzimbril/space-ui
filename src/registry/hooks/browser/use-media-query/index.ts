'use client'

import * as React from 'react'

function subscribe(callback: () => void, query: string): () => void {
  if (typeof window === 'undefined') return () => {}
  const mql = window.matchMedia(query)
  mql.addEventListener('change', callback)
  return () => mql.removeEventListener('change', callback)
}

/**
 * React 18/19 optimized media query hook using `useSyncExternalStore`.
 *
 * @param {string} query - The CSS media query string to match (e.g. '(max-width: 768px)').
 * @param {boolean} [serverFallback=false] - The fallback value used during Server-Side Rendering.
 * @returns {boolean} `true` if the media query matches, otherwise `false`.
 *
 * @example
 * const isMobile = useMediaQuery('(max-width: 768px)');
 * const isDark = useMediaQuery('(prefers-color-scheme: dark)');
 */
export function useMediaQuery(query: string, serverFallback = false): boolean {
  return React.useSyncExternalStore(
    React.useCallback((callback) => subscribe(callback, query), [query]),
    () => (typeof window !== 'undefined' ? window.matchMedia(query).matches : serverFallback),
    () => serverFallback,
  )
}

/**
 * Convenient shortcut hook to detect if the current viewport is mobile (<= 768px).
 *
 * @returns {boolean} `true` if viewport width is 768px or less.
 *
 * @example
 * const isMobile = useIsMobile();
 */
export function useIsMobile(): boolean {
  return useMediaQuery('(max-width: 768px)', false)
}
