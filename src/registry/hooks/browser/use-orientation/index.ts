'use client'

import { useEffect, useState } from 'react'

export type OrientationType =
  'portrait-primary' | 'portrait-secondary' | 'landscape-primary' | 'landscape-secondary' | 'undetermined'

/**
 * React hook to observe screen orientation angle and type.
 *
 * @returns {{ angle: number, type: OrientationType }} The current screen orientation.
 *
 * @example
 * const { angle, type } = useOrientation();
 */
export function useOrientation() {
  const [orientation, setOrientation] = useState<{
    angle: number
    type: OrientationType
  }>({
    angle: 0,
    type: 'undetermined',
  })

  useEffect(() => {
    if (typeof window === 'undefined') return

    const handleOrientationChange = () => {
      const { angle, type } = window.screen.orientation || {
        angle: 0,
        type: 'undetermined',
      }
      setOrientation({ angle, type: type as OrientationType })
    }

    window.addEventListener('orientationchange', handleOrientationChange)
    handleOrientationChange()

    return () => window.removeEventListener('orientationchange', handleOrientationChange)
  }, [])

  return orientation
}
