'use client'

import { useState, useEffect } from 'react'
import { parseToCookieType, getCookies } from '@/registry/utils/cookie'

/**
 * React hook that periodically polls browser cookies to detect changes across tabs.
 *
 * @param {number} [interval=1000] - Polling interval in milliseconds.
 * @returns {Record<string, any>} Real-time dictionary of current cookies.
 *
 * @example
 * const cookies = useCookieListener(2000);
 */
export function useCookieListener(interval = 1000): Record<string, any> {
  const [cookies, setCookies] = useState<Record<string, any>>(() => {
    if (typeof document === 'undefined') return {}
    return getCookies()
  })

  useEffect(() => {
    if (typeof window === 'undefined') return

    const intervalId = setInterval(() => {
      const currentCookies = getCookies()
      if (parseToCookieType(currentCookies) !== parseToCookieType(cookies)) {
        setCookies(currentCookies)
      }
    }, interval)

    return () => clearInterval(intervalId)
  }, [cookies, interval])

  return cookies
}
