'use client'

import { useMediaQuery } from '@/registry/hooks/browser/use-media-query'

/**
 * React hook that detects the user's OS color scheme preference ('dark' | 'light').
 *
 * @returns {'dark' | 'light'} The preferred color scheme.
 *
 * @example
 * const theme = usePrefersTheme();
 */
export function usePrefersTheme(): 'dark' | 'light' {
  const isDark = useMediaQuery('(prefers-color-scheme: dark)', false)
  return isDark ? 'dark' : 'light'
}

export function useIsDarkMode(): boolean {
  return useMediaQuery('(prefers-color-scheme: dark)', false)
}
