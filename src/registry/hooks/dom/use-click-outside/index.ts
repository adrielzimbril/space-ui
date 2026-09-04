'use client'

import { type RefObject } from 'react'
import { useEventListener } from '@/registry/hooks/dom/use-event-listener'

/**
 * React hook that triggers a callback when a click or touch event occurs outside the referenced DOM element.
 *
 * @template T
 * @param {RefObject<T | null>} ref - React ref of the element to watch outside clicks for.
 * @param {(event: MouseEvent | TouchEvent) => void} handler - Callback invoked upon outside click.
 * @param {string} [mouseEvent='mousedown'] - DOM mouse event type to listen for.
 *
 * @example
 * const dropdownRef = useRef<HTMLDivElement>(null);
 * useClickOutside(dropdownRef, () => setIsOpen(false));
 */
export function useClickOutside<T extends HTMLElement = HTMLElement>(
  ref: RefObject<T | null>,
  handler: (event: MouseEvent | TouchEvent) => void,
  mouseEvent: 'mousedown' | 'mouseup' = 'mousedown',
): void {
  useEventListener(mouseEvent, (event: MouseEvent) => {
    const el = ref?.current
    if (!el || el.contains(event.target as Node)) {
      return
    }
    handler(event)
  })
}
