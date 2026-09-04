'use client'

import * as React from 'react'

/**
 * React hook that detects if the client device is running macOS.
 *
 * @returns {boolean} `true` if user agent matches macOS, otherwise `false`.
 *
 * @example
 * const isMac = useIsMac();
 * const shortcut = isMac ? '⌘K' : 'Ctrl+K';
 */
export function useIsMac(): boolean {
  const [isMac, setIsMac] = React.useState(false)

  React.useEffect(() => {
    if (typeof navigator !== 'undefined') {
      const platform = (navigator as any).userAgentData?.platform || navigator.platform || ''
      setIsMac(/Mac|iPod|iPhone|iPad/.test(platform))
    }
  }, [])

  return isMac
}
