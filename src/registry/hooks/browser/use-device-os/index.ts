'use client'

import { useState, useEffect } from 'react'

export type DeviceOSType = 'undetermined' | 'macos' | 'ios' | 'windows' | 'android' | 'linux'

/**
 * React hook to detect the operating system of the client device.
 *
 * @returns {DeviceOSType} The detected operating system name ('macos', 'windows', 'ios', 'android', 'linux').
 *
 * @example
 * const os = useDeviceOS();
 */
export function useDeviceOS(): DeviceOSType {
  const [os, setOS] = useState<DeviceOSType>('undetermined')

  useEffect(() => {
    if (typeof window === 'undefined' || typeof navigator === 'undefined') return

    const userAgent = window.navigator.userAgent.toLowerCase()
    const macosPlatforms = /(macintosh|macintel|macppc|mac68k|macos)/i
    const windowsPlatforms = /(win32|win64|windows|wince)/i
    const iosPlatforms = /(iphone|ipad|ipod)/i

    if (macosPlatforms.test(userAgent)) {
      setOS('macos')
    } else if (iosPlatforms.test(userAgent)) {
      setOS('ios')
    } else if (windowsPlatforms.test(userAgent)) {
      setOS('windows')
    } else if (/android/.test(userAgent)) {
      setOS('android')
    } else if (/linux/.test(userAgent)) {
      setOS('linux')
    }
  }, [])

  return os
}
