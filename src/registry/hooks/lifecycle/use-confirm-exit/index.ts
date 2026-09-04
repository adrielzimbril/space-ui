'use client'

import { bindEvent, unbindEvent } from '@/registry/utils/event'
import { useCallback, useEffect } from 'react'

export function useConfirmExit(enabled: boolean | (() => boolean), message = 'Are you sure you want to exit?') {
  const handler = useCallback(
    (e: Event) => {
      const finalEnabled = typeof enabled === 'function' ? enabled() : true

      if (!finalEnabled) {
        return
      }

      e.preventDefault()

      // NOTE: modern browsers no longer support custom messages with .returnValue
      if (message) {
        // @ts-ignore
        e.returnValue = message
      }

      return message
    },
    [enabled, message],
  )

  useEffect(() => {
    if (!enabled) {
      return
    }

    bindEvent(window, 'beforeunload', handler)

    return () => unbindEvent(window, 'beforeunload', handler)
  }, [enabled, handler])
}
