'use client'

import { useRef, useEffect, type RefObject } from 'react'
import { useIsomorphicLayoutEffect } from '@/registry/hooks/lifecycle/use-isomorphic-layout-effect'

/**
 * React hook that binds an event listener to the window, document, or a specific DOM element.
 *
 * @template K, T
 * @param {K} eventName - Standard DOM event name.
 * @param {(event: any) => void} handler - Event handler function.
 * @param {RefObject<T> | T | null} [element] - Optional DOM target element or React ref.
 * @param {boolean | AddEventListenerOptions} [options] - Standard addEventListener options.
 *
 * @example
 * useEventListener('keydown', (e) => {
 *   if (e.key === 'Escape') closeModal();
 * });
 */
export function useEventListener<K extends keyof WindowEventMap>(
  eventName: K,
  handler: (event: WindowEventMap[K]) => void,
  element?: undefined,
  options?: boolean | AddEventListenerOptions,
): void

export function useEventListener<K extends keyof HTMLElementEventMap, T extends HTMLElement = HTMLDivElement>(
  eventName: K,
  handler: (event: HTMLElementEventMap[K]) => void,
  element: RefObject<T>,
  options?: boolean | AddEventListenerOptions,
): void

export function useEventListener<K extends keyof DocumentEventMap>(
  eventName: K,
  handler: (event: DocumentEventMap[K]) => void,
  element: Document,
  options?: boolean | AddEventListenerOptions,
): void

export function useEventListener(
  eventName: string,
  handler: (event: Event) => void,
  element?: any,
  options?: boolean | AddEventListenerOptions,
) {
  const savedHandler = useRef(handler)

  useIsomorphicLayoutEffect(() => {
    savedHandler.current = handler
  }, [handler])

  useEffect(() => {
    const targetElement: any = element?.current ?? element ?? (typeof window !== 'undefined' ? window : null)

    if (!targetElement?.addEventListener) return

    const eventListener: typeof handler = (event) => savedHandler.current(event)

    targetElement.addEventListener(eventName, eventListener, options)

    return () => {
      targetElement.removeEventListener(eventName, eventListener, options)
    }
  }, [eventName, element, options])
}
