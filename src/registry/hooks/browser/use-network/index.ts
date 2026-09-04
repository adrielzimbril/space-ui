'use client'

import * as React from 'react'
import { useEventListener } from '@/registry/hooks/dom/use-event-listener'

export interface NetworkState {
  isOnline: boolean
  isOffline: boolean
  online: boolean
  offline: boolean
  downlink?: number
  effectiveType?: string
  rtt?: number
  saveData?: boolean
}

export function useNetwork(): NetworkState {
  const [isOnline, setIsOnline] = React.useState<boolean>(() => {
    return typeof navigator !== 'undefined' && typeof navigator.onLine === 'boolean' ? navigator.onLine : true
  })

  const [connection, setConnection] = React.useState<{
    downlink?: number
    effectiveType?: string
    rtt?: number
    saveData?: boolean
  }>({})

  const updateNetworkInfo = React.useCallback(() => {
    if (typeof navigator === 'undefined') return
    setIsOnline(navigator.onLine)
    const conn =
      (navigator as any).connection || (navigator as any).mozConnection || (navigator as any).webkitConnection
    if (conn) {
      setConnection({
        downlink: conn.downlink,
        effectiveType: conn.effectiveType,
        rtt: conn.rtt,
        saveData: conn.saveData,
      })
    }
  }, [])

  useEventListener('online', () => setIsOnline(true))
  useEventListener('offline', () => setIsOnline(false))

  React.useEffect(() => {
    updateNetworkInfo()
  }, [updateNetworkInfo])

  return {
    isOnline,
    isOffline: !isOnline,
    online: isOnline,
    offline: !isOnline,
    ...connection,
  }
}

export function useOnlineStatus(): boolean {
  return useNetwork().isOnline
}

export function useOffline(): boolean {
  return useNetwork().isOffline
}
