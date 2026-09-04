'use client'

import { useState, useEffect } from 'react'

/**
 * React hook to detect user inactivity/idle state after a specified timeout in ms.
 *
 * @param {number} [ms=60000] - Inactivity threshold in milliseconds (default: 60s).
 * @returns {boolean} `true` if user is currently idle.
 *
 * @example
 * const isIdle = useIdle(30000); // 30 seconds
 */
export function useIdle(ms = 60000): boolean {
  const [idle, setIdle] = useState(false)

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout>

    const handleActivity = () => {
      setIdle(false)
      clearTimeout(timeoutId)
      timeoutId = setTimeout(() => setIdle(true), ms)
    }

    const events = ['mousemove', 'mousedown', 'keydown', 'touchstart', 'scroll']
    events.forEach((name) => window.addEventListener(name, handleActivity, { passive: true }))

    timeoutId = setTimeout(() => setIdle(true), ms)

    return () => {
      clearTimeout(timeoutId)
      events.forEach((name) => window.removeEventListener(name, handleActivity))
    }
  }, [ms])

  return idle
}
