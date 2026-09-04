'use client'

import * as React from 'react'

/**
 * React hook that subscribes to a MotionValue and triggers a component re-render on value changes.
 *
 * @template T
 * @param {{ get: () => T, on: (event: string, cb: (v: T) => void) => () => void }} motionValue - MotionValue object.
 * @returns {T} The current value.
 *
 * @example
 * const scale = useMotionValue(1);
 * const currentScale = useMotionValueState(scale);
 */
export function useMotionValueState<T>(motionValue: {
  get: () => T
  on: (event: string, callback: (v: T) => void) => () => void
}): T {
  const [value, setValue] = React.useState<T>(() => motionValue.get())

  React.useEffect(() => {
    setValue(motionValue.get())
    const unsubscribe = motionValue.on('change', (latest) => setValue(latest))
    return () => unsubscribe()
  }, [motionValue])

  return value
}
