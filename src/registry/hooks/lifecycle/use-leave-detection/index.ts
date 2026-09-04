'use client'

import { useState, useEffect, useRef, useCallback } from 'react'

export type ExitDirection = 'top' | 'bottom' | 'left' | 'right' | 'blur' | 'visibility' | 'none'

export interface UseLeaveDetectionOptions {
  /**
   * Whether to detect window blur (e.g., clicking into another window/app in split screen).
   * @default true
   */
  detectBlur?: boolean
  /**
   * Whether to detect tab switching via Page Visibility API.
   * @default true
   */
  detectVisibility?: boolean
  /**
   * Whether to only trigger leave once.
   * @default false
   */
  once?: boolean
  /**
   * Callback executed when user leaves the window/tab.
   */
  onLeave?: (direction: ExitDirection) => void
  /**
   * Callback executed when user returns into the window.
   */
  onEnter?: () => void
}

export interface UseLeaveDetectionReturn {
  hasLeft: boolean
  isOutside: boolean
  leaveCount: number
  direction: ExitDirection
  reset: () => void
}

/**
 * React hook that reliably detects when a user leaves the viewport, switches tabs,
 * or focuses another application in split-screen/multi-monitor setups (ideal for exit-intent modals).
 *
 * @param {UseLeaveDetectionOptions | (() => void)} [optionsOrCb] - Configuration options or direct leave callback.
 * @returns {UseLeaveDetectionReturn} Reactive exit status and methods.
 *
 * @example
 * // Pattern 1: Reactive hook state
 * const { isOutside, leaveCount, direction, reset } = useLeaveDetection({
 *   detectBlur: true,
 *   onLeave: (dir) => console.log('Left via:', dir),
 * });
 *
 * // Pattern 2: Direct callback
 * useLeaveDetection(() => openExitModal());
 */
export function useLeaveDetection(optionsOrCb?: UseLeaveDetectionOptions | (() => void)): UseLeaveDetectionReturn {
  const options: UseLeaveDetectionOptions =
    typeof optionsOrCb === 'function' ? { onLeave: optionsOrCb } : optionsOrCb || {}

  const { detectBlur = true, detectVisibility = true, once = false, onLeave, onEnter } = options

  const [hasLeft, setHasLeft] = useState<boolean>(false)
  const [isOutside, setIsOutside] = useState<boolean>(false)
  const [leaveCount, setLeaveCount] = useState<number>(0)
  const [direction, setDirection] = useState<ExitDirection>('none')

  const onLeaveRef = useRef(onLeave)
  onLeaveRef.current = onLeave

  const onEnterRef = useRef(onEnter)
  onEnterRef.current = onEnter

  const hasTriggeredRef = useRef<boolean>(false)

  const triggerLeave = useCallback(
    (dir: ExitDirection) => {
      if (once && hasTriggeredRef.current) return
      hasTriggeredRef.current = true

      setHasLeft(true)
      setIsOutside(true)
      setDirection(dir)
      setLeaveCount((c) => c + 1)
      onLeaveRef.current?.(dir)
    },
    [once],
  )

  const triggerEnter = useCallback(() => {
    setIsOutside(false)
    onEnterRef.current?.()
  }, [])

  const reset = useCallback(() => {
    hasTriggeredRef.current = false
    setHasLeft(false)
    setIsOutside(false)
    setDirection('none')
  }, [])

  useEffect(() => {
    if (typeof document === 'undefined' || typeof window === 'undefined') return

    // 1. Mouse cursor leaving viewport across any boundary (top, bottom, left, right)
    const handleMouseOut = (e: MouseEvent) => {
      // If moving to another DOM element inside the page, do not trigger
      if (e.relatedTarget) return

      const { clientX, clientY } = e
      const { innerWidth, innerHeight } = window

      let dir: ExitDirection = 'top'

      if (clientY <= 0) {
        dir = 'top'
      } else if (clientY >= innerHeight - 10) {
        dir = 'bottom'
      } else if (clientX <= 0) {
        dir = 'left'
      } else if (clientX >= innerWidth - 10) {
        dir = 'right'
      }

      triggerLeave(dir)
    }

    // 2. Mouse cursor re-entering window
    const handleMouseEnter = () => {
      triggerEnter()
    }

    // 3. Window blur (e.g. clicking outside or switching app on split-screen)
    const handleBlur = () => {
      if (detectBlur) {
        triggerLeave('blur')
      }
    }

    const handleFocus = () => {
      triggerEnter()
    }

    // 4. Tab visibility change (switching tabs / minimizing)
    const handleVisibilityChange = () => {
      if (!detectVisibility) return
      if (document.hidden) {
        triggerLeave('visibility')
      } else {
        triggerEnter()
      }
    }

    document.addEventListener('mouseout', handleMouseOut)
    document.addEventListener('mouseenter', handleMouseEnter)
    window.addEventListener('blur', handleBlur)
    window.addEventListener('focus', handleFocus)
    document.addEventListener('visibilitychange', handleVisibilityChange)

    return () => {
      document.removeEventListener('mouseout', handleMouseOut)
      document.removeEventListener('mouseenter', handleMouseEnter)
      window.removeEventListener('blur', handleBlur)
      window.removeEventListener('focus', handleFocus)
      document.removeEventListener('visibilitychange', handleVisibilityChange)
    }
  }, [detectBlur, detectVisibility, triggerLeave, triggerEnter])

  return {
    hasLeft,
    isOutside,
    leaveCount,
    direction,
    reset,
  }
}
