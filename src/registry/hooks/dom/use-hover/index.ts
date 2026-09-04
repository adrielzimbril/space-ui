'use client'

import * as React from 'react'
import { useEventListener } from '@/registry/hooks/dom/use-event-listener'

export type UseHoverReturn<T extends HTMLElement = HTMLElement> = [React.RefObject<T | null>, boolean] & {
  ref: React.RefObject<T | null>
  isHovered: boolean
  value: boolean
}

/**
 * React hook to observe mouse hover state on a target DOM element.
 *
 * @template T
 * @param {React.RefObject<T | null>} [elementRef] - Optional React ref of the element to watch.
 * @returns {boolean | UseHoverReturn<T>} Boolean hover state or [ref, isHovered] tuple if called without arguments.
 *
 * @example
 * // Pattern 1: Automatic Ref Tuple
 * const [ref, isHovered] = useHover<HTMLDivElement>();
 *
 * // Pattern 2: External Ref Passing
 * const buttonRef = useRef<HTMLButtonElement>(null);
 * const isHovered = useHover(buttonRef);
 */
export function useHover<T extends HTMLElement = HTMLElement>(): UseHoverReturn<T>
export function useHover<T extends HTMLElement = HTMLElement>(elementRef: React.RefObject<T | null>): boolean
export function useHover<T extends HTMLElement = HTMLElement>(elementRef?: React.RefObject<T | null>): any {
  const internalRef = React.useRef<T | null>(null)
  const targetRef = elementRef ?? internalRef
  const [value, setValue] = React.useState<boolean>(false)

  const handleMouseEnter = React.useCallback(() => setValue(true), [])
  const handleMouseLeave = React.useCallback(() => setValue(false), [])

  useEventListener('mouseenter', handleMouseEnter, targetRef as any)
  useEventListener('mouseleave', handleMouseLeave, targetRef as any)

  if (elementRef !== undefined) {
    return value
  }

  const tuple = [internalRef, value] as unknown as UseHoverReturn<T>
  ;(tuple as any).ref = internalRef
  ;(tuple as any).isHovered = value
  ;(tuple as any).value = value

  return tuple
}
