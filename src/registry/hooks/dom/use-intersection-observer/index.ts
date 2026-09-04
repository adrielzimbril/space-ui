'use client'

import { useEffect, useState, type RefObject } from 'react'

/**
 * React hook to monitor an element's visibility using the native IntersectionObserver API.
 *
 * @param {RefObject<Element | null>} elementRef - The element to observe.
 * @param {IntersectionObserverInit} [options={}] - IntersectionObserver configuration options.
 * @returns {IntersectionObserverEntry | null} The current IntersectionObserverEntry or `null`.
 *
 * @example
 * const sectionRef = useRef<HTMLDivElement>(null);
 * const entry = useIntersectionObserver(sectionRef, { threshold: 0.5 });
 * const isVisible = entry?.isIntersecting;
 */
export function useIntersectionObserver(
  elementRef: RefObject<Element | null>,
  { threshold = 0, root = null, rootMargin = '0%' }: IntersectionObserverInit = {},
): IntersectionObserverEntry | null {
  const [entry, setEntry] = useState<IntersectionObserverEntry | null>(null)

  useEffect(() => {
    const node = elementRef?.current
    if (typeof window === 'undefined' || !node || !('IntersectionObserver' in window)) return

    const observer = new IntersectionObserver(([entry]) => setEntry(entry), {
      threshold,
      root,
      rootMargin,
    })

    observer.observe(node)
    return () => observer.disconnect()
  }, [elementRef, threshold, root, rootMargin])

  return entry
}
