'use client'

import * as React from 'react'

/**
 * Props for the `<RenderAfter>` delayed rendering component.
 */
export interface RenderAfterProps {
  /** Delay duration in milliseconds before rendering children. */
  delay: number
  /** Optional fallback content to render during the delay period. */
  fallback?: React.ReactNode
  /** Content to render once the delay has elapsed. */
  children: React.ReactNode
}

/**
 * Delays the rendering of child components by a specified number of milliseconds.
 *
 * @param {RenderAfterProps} props - Component props.
 * @returns {React.ReactNode} The rendered children once time has elapsed, or fallback.
 *
 * @example
 * <RenderAfter delay={500} fallback={<SkeletonLoader />}>
 *   <ExpensiveDataChart />
 * </RenderAfter>
 */
export function RenderAfter({ delay, fallback = null, children }: RenderAfterProps): React.ReactNode {
  const [ready, setReady] = React.useState(false)

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setReady(true)
    }, delay)

    return () => clearTimeout(timer)
  }, [delay])

  if (!ready) {
    return fallback
  }

  return <>{children}</>
}
