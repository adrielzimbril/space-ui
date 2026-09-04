'use client'

import { useEffect, useRef } from 'react'

/**
 * React hook to alternate the document title when the tab is inactive (e.g. for unread messages).
 *
 * @param {string} notificationText - Text to display when user leaves tab.
 * @param {number} [interval=1000] - Flashing interval in ms.
 *
 * @example
 * useTabNotification('(1) New Message!', 1000);
 */
export function useTabNotification(notificationText: string, interval = 1000): void {
  const originalTitle = useRef<string>('')

  useEffect(() => {
    if (typeof document === 'undefined') return
    originalTitle.current = document.title

    let timer: ReturnType<typeof setInterval>
    let isOriginal = false

    const handleVisibilityChange = () => {
      if (document.hidden && notificationText) {
        timer = setInterval(() => {
          document.title = isOriginal ? originalTitle.current : notificationText
          isOriginal = !isOriginal
        }, interval)
      } else {
        clearInterval(timer)
        document.title = originalTitle.current
      }
    }

    document.addEventListener('visibilitychange', handleVisibilityChange)

    return () => {
      clearInterval(timer)
      document.removeEventListener('visibilitychange', handleVisibilityChange)
      if (typeof document !== 'undefined') {
        document.title = originalTitle.current
      }
    }
  }, [notificationText, interval])
}
