'use client'

import { useState, useEffect } from 'react'

export interface PerformanceMode {
  isMobile: boolean
  prefersReducedMotion: boolean
  shouldReduceAnimations: boolean
}

export function usePerformanceMode(): PerformanceMode {
  const [mode, setMode] = useState<PerformanceMode>({
    isMobile: false,
    prefersReducedMotion: false,
    shouldReduceAnimations: false,
  })

  useEffect(() => {
    const checkPerformanceMode = () => {
      const isMobile = window.innerWidth < 768
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      setMode({
        isMobile,
        prefersReducedMotion,
        shouldReduceAnimations: isMobile || prefersReducedMotion,
      })
    }

    checkPerformanceMode()
    window.addEventListener('resize', checkPerformanceMode)

    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (motionQuery.addEventListener) {
      motionQuery.addEventListener('change', checkPerformanceMode)
    } else {
      motionQuery.addListener(checkPerformanceMode)
    }

    return () => {
      window.removeEventListener('resize', checkPerformanceMode)
      if (motionQuery.removeEventListener) {
        motionQuery.removeEventListener('change', checkPerformanceMode)
      } else {
        motionQuery.removeListener(checkPerformanceMode)
      }
    }
  }, [])

  return mode
}
