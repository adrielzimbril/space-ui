'use client'

import { useState, useEffect } from 'react'

export interface BatteryState {
  supported: boolean
  loading: boolean
  level: number | null
  charging: boolean | null
  chargingTime: number | null
  dischargingTime: number | null
}

/**
 * React hook to observe battery level and charging status via the Battery API.
 *
 * @returns {BatteryState} The current battery state.
 *
 * @example
 * const { level, charging } = useBatteryStatus();
 */
export function useBatteryStatus(): BatteryState {
  const [state, setState] = useState<BatteryState>({
    supported: true,
    loading: true,
    level: null,
    charging: null,
    chargingTime: null,
    dischargingTime: null,
  })

  useEffect(() => {
    if (typeof navigator === 'undefined' || !('getBattery' in navigator)) {
      setState((s) => ({ ...s, supported: false, loading: false }))
      return
    }

    let battery: any

    const onChange = () => {
      setState({
        supported: true,
        loading: false,
        level: battery.level,
        charging: battery.charging,
        chargingTime: battery.chargingTime,
        dischargingTime: battery.dischargingTime,
      })
    }

    ;(navigator as any).getBattery().then((b: any) => {
      battery = b
      onChange()
      battery.addEventListener('levelchange', onChange)
      battery.addEventListener('chargingchange', onChange)
    })

    return () => {
      if (battery) {
        battery.removeEventListener('levelchange', onChange)
        battery.removeEventListener('chargingchange', onChange)
      }
    }
  }, [])

  return state
}
