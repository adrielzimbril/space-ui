'use client'

import * as React from 'react'

/**
 * Inside this provider every staggered interval ticks at exactly its base interval, with no jitter.
 * Card Studio uses it so a pre-rendered loop has a known, exact length (4 states × 5s = 20s).
 */
export const ExactIntervalContext = React.createContext(false)

/**
 * Same as setInterval in a useEffect, but adds a random per-mount jitter to
 * the delay so multiple instances sharing the same base interval (e.g. bento
 * demo cards on the same page) don't all tick in lockstep.
 */
export function useStaggeredInterval(callback: () => void, intervalMs: number, enabled = true, jitterMs?: number) {
  const callbackRef = React.useRef(callback)
  callbackRef.current = callback
  const exact = React.use(ExactIntervalContext)

  const jitter = exact ? 0 : (jitterMs ?? intervalMs * 0.5)
  // Recomputed only when intervalMs/jitterMs actually change, not on every render —
  // a plain ref set once would ignore a later change to intervalMs entirely.
  const delay = React.useMemo(() => (jitter ? intervalMs + Math.random() * jitter : intervalMs), [intervalMs, jitter])

  React.useEffect(() => {
    if (!enabled) return
    const timer = setInterval(() => callbackRef.current(), delay)
    return () => clearInterval(timer)
  }, [enabled, delay])
}
