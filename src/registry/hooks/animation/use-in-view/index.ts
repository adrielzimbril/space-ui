'use client'

import * as React from 'react'

export interface UseInViewOptions extends IntersectionObserverInit {
  triggerOnce?: boolean
  inViewOnce?: boolean
  once?: boolean
  skip?: boolean
  inView?: boolean
  initialInView?: boolean
  fallbackInView?: boolean
  inViewMargin?: string
  margin?: string
  onChange?: (inView: boolean, entry: IntersectionObserverEntry) => void
}

export type UseInViewReturn = [(node?: Element | null) => void, boolean, IntersectionObserverEntry | undefined] & {
  ref: (node?: Element | null) => void
  inView: boolean
  entry?: IntersectionObserverEntry
}

export function useInView(options: UseInViewOptions = {}): UseInViewReturn {
  const {
    threshold = 0,
    root = null,
    rootMargin = options.inViewMargin ?? options.margin ?? '0px',
    triggerOnce = options.inViewOnce ?? options.once ?? false,
    skip = options.inView === false,
    initialInView = false,
    fallbackInView = false,
    onChange,
  } = options

  const [ref, setRef] = React.useState<Element | null>(null)
  const [inView, setInView] = React.useState<boolean>(initialInView)
  const [entry, setEntry] = React.useState<IntersectionObserverEntry | undefined>(undefined)

  const onChangeRef = React.useRef(onChange)
  onChangeRef.current = onChange

  const callbackRef = React.useCallback((node?: Element | null) => {
    setRef(node ?? null)
  }, [])

  React.useEffect(() => {
    if (skip || !ref) return

    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
      setInView(fallbackInView)
      return
    }

    let isCancelled = false

    const observer = new IntersectionObserver(
      (entries) => {
        for (const currentEntry of entries) {
          if (currentEntry.target === ref && !isCancelled) {
            const isIntersecting = currentEntry.isIntersecting
            setInView(isIntersecting)
            setEntry(currentEntry)
            onChangeRef.current?.(isIntersecting, currentEntry)

            if (isIntersecting && triggerOnce) {
              observer.unobserve(ref)
              observer.disconnect()
            }
          }
        }
      },
      {
        threshold,
        root,
        rootMargin,
      },
    )

    observer.observe(ref)

    return () => {
      isCancelled = true
      observer.disconnect()
    }
  }, [ref, threshold, root, rootMargin, triggerOnce, skip, fallbackInView])

  const result = [callbackRef, inView, entry] as UseInViewReturn
  result.ref = callbackRef
  result.inView = inView
  result.entry = entry

  return result
}
