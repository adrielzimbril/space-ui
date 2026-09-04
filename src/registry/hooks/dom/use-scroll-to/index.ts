'use client'

import { useCallback, type RefObject } from 'react'

export type ScrollTarget = number | ScrollToOptions | string | HTMLElement | RefObject<HTMLElement | null>

export interface ScrollToMethods {
  scrollTo: (target?: ScrollTarget, options?: ScrollIntoViewOptions & ScrollToOptions) => void
  scrollToElement: (
    idOrElement: string | HTMLElement | RefObject<HTMLElement | null>,
    options?: ScrollIntoViewOptions,
  ) => void
  scrollToElementById: (id: string, options?: ScrollIntoViewOptions) => void
  scrollToTop: (options?: ScrollToOptions) => void
  scrollToBottom: (options?: ScrollToOptions) => void
}

export type ScrollToTuple = [
  (target?: ScrollTarget, options?: ScrollIntoViewOptions & ScrollToOptions) => void,
  (idOrElement: string | HTMLElement | RefObject<HTMLElement | null>, options?: ScrollIntoViewOptions) => void,
]

export type ScrollToFunction = ((target?: ScrollTarget, options?: ScrollIntoViewOptions & ScrollToOptions) => void) &
  ScrollToTuple &
  ScrollToMethods

/**
 * React hook providing versatile programmatic smooth scrolling helper functions.
 * Can be used as a direct callable function, an array tuple, or a destructured object.
 *
 * @param {RefObject<HTMLElement | null>} [containerRef] - Optional container ref to scroll instead of window.
 * @returns {ScrollToFunction} Callable scrolling function & helper object.
 *
 * @example
 * // Direct function usage
 * const scrollTo = useScrollTo();
 * scrollTo({ top: 0, behavior: 'smooth' });
 * scrollTo('#faq-section');
 *
 * // Object helpers
 * const { scrollToTop, scrollToBottom, scrollToElement } = useScrollTo();
 * scrollToTop();
 *
 * // Tuple destructuring
 * const [scrollTo, scrollToElement] = useScrollTo();
 */
export function useScrollTo<T extends HTMLElement = HTMLElement>(containerRef?: RefObject<T | null>): ScrollToFunction {
  const getContainer = useCallback((): HTMLElement | Window => {
    if (containerRef && containerRef.current) {
      return containerRef.current
    }
    return typeof window !== 'undefined' ? window : ({} as Window)
  }, [containerRef])

  const scrollTo = useCallback(
    (target?: ScrollTarget, options?: ScrollIntoViewOptions & ScrollToOptions) => {
      if (typeof window === 'undefined') return
      const container = getContainer()

      // 1. Number passed (vertical scroll)
      if (typeof target === 'number') {
        container.scrollTo({ top: target, behavior: 'smooth', ...options })
        return
      }

      // 2. String ID or Selector
      if (typeof target === 'string') {
        const cleanId = target.startsWith('#') ? target.slice(1) : target
        const el = document.getElementById(cleanId) || document.querySelector(target)
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start', ...options })
        }
        return
      }

      // 3. React Ref object
      if (target && typeof target === 'object' && 'current' in target) {
        if (target.current) {
          target.current.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
            ...options,
          })
        }
        return
      }

      // 4. HTML Element instance
      if (target instanceof HTMLElement) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
          ...options,
        })
        return
      }

      // 5. ScrollToOptions object
      if (typeof target === 'object') {
        container.scrollTo({ behavior: 'smooth', ...target })
        return
      }

      // Default: top
      container.scrollTo({ top: 0, behavior: 'smooth', ...options })
    },
    [getContainer],
  )

  const scrollToElement = useCallback(
    (idOrElement: string | HTMLElement | RefObject<HTMLElement | null>, options?: ScrollIntoViewOptions) => {
      scrollTo(idOrElement as ScrollTarget, options)
    },
    [scrollTo],
  )

  const scrollToElementById = useCallback(
    (id: string, options?: ScrollIntoViewOptions) => {
      scrollTo(id, options)
    },
    [scrollTo],
  )

  const scrollToTop = useCallback(
    (options?: ScrollToOptions) => {
      scrollTo({ top: 0, behavior: 'smooth', ...options })
    },
    [scrollTo],
  )

  const scrollToBottom = useCallback(
    (options?: ScrollToOptions) => {
      if (typeof window === 'undefined') return
      const container = getContainer()
      const scrollHeight = container instanceof Window ? document.documentElement.scrollHeight : container.scrollHeight
      container.scrollTo({ top: scrollHeight, behavior: 'smooth', ...options })
    },
    [getContainer, scrollTo],
  )

  const fn = function (target?: ScrollTarget, options?: ScrollIntoViewOptions & ScrollToOptions) {
    scrollTo(target, options)
  } as unknown as ScrollToFunction

  fn[0] = scrollTo
  fn[1] = scrollToElement
  fn.scrollTo = scrollTo
  fn.scrollToElement = scrollToElement
  fn.scrollToElementById = scrollToElementById
  fn.scrollToTop = scrollToTop
  fn.scrollToBottom = scrollToBottom

  return fn
}
