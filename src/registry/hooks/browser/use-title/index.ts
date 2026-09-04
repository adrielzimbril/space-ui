'use client'

import { useRef } from 'react'
import { useIsomorphicLayoutEffect } from '@/registry/hooks/lifecycle/use-isomorphic-layout-effect'

export interface UseTitleOptions {
  /** Restore previous title when component unmounts (default: true). */
  restoreOnUnmount?: boolean
}

/**
 * React hook to dynamically set the document title with automatic restoration on unmount.
 *
 * @param {string} title - The document title string.
 * @param {UseTitleOptions} [options={ restoreOnUnmount: true }] - Title options.
 *
 * @example
 * useTitle('Dashboard - SpaceUI', { restoreOnUnmount: true });
 */
export function useTitle(title: string, options: UseTitleOptions = { restoreOnUnmount: true }): void {
  const prevTitle = useRef<string>(typeof document !== 'undefined' ? document.title : '')

  useIsomorphicLayoutEffect(() => {
    if (typeof document === 'undefined') return
    document.title = title
  }, [title])

  useIsomorphicLayoutEffect(() => {
    return () => {
      if (options.restoreOnUnmount && typeof document !== 'undefined') {
        document.title = prevTitle.current
      }
    }
  }, [options.restoreOnUnmount])
}
