import * as React from 'react'
import { useInView, type UseInViewOptions } from '@/registry/hooks/animation/use-in-view'

/**
 * Props for the `<InView>` component.
 */
export interface InViewProps extends UseInViewOptions {
  /** Optional HTML tag or React component to render as a wrapper (default: 'div'). */
  as?: React.ElementType
  /** CSS class name(s) for the wrapper element. */
  className?: string
  /**
   * Children elements, or a render prop function receiving the intersection observer status.
   */
  children:
    | React.ReactNode
    | ((props: {
        inView: boolean
        ref: (node?: Element | null) => void
        entry?: IntersectionObserverEntry
      }) => React.ReactNode)
}

/**
 * Declarative component wrapper that monitors when an element enters or leaves the viewport.
 *
 * @param {InViewProps} props - Component props.
 * @returns {React.ReactNode} The rendered element or render prop result.
 *
 * @example
 * <InView threshold={0.5} triggerOnce>
 *   {({ inView, ref }) => (
 *     <div ref={ref} className={inView ? 'animate-fade-in' : 'opacity-0'}>
 *       Header content visible: {String(inView)}
 *     </div>
 *   )}
 * </InView>
 */
export function InView({ as: Component = 'div', className, children, ...options }: InViewProps): React.ReactNode {
  const [ref, inView, entry] = useInView(options)

  if (typeof children === 'function') {
    return <>{(children as Function)({ inView, ref, entry })}</>
  }

  return (
    <Component ref={ref} className={className}>
      {children}
    </Component>
  )
}
