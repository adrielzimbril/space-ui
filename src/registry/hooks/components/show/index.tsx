import * as React from 'react'

/**
 * Props for the `<Show>` flow-control component.
 *
 * @template T
 */
export interface ShowProps<T> {
  /** The data value or condition to check for truthiness. */
  when: T | null | undefined | false
  /** Fallback content rendered when `when` is falsy. */
  fallback?: React.ReactNode
  /** Content rendered when `when` is truthy. Accepts a render function receiving the non-null data. */
  children: React.ReactNode | ((item: NonNullable<T>) => React.ReactNode)
}

/**
 * Declarative component that renders its children only when `when` is truthy,
 * safely unwrapping non-null data in its render function.
 *
 * @template T
 * @param {ShowProps<T>} props - Component props.
 * @returns {React.ReactNode} The rendered children or fallback.
 *
 * @example
 * <Show when={user} fallback={<LoadingSpinner />}>
 *   {(activeUser) => <ProfileCard name={activeUser.name} email={activeUser.email} />}
 * </Show>
 */
export function Show<T>({ when, fallback = null, children }: ShowProps<T>): React.ReactNode {
  if (when) {
    if (typeof children === 'function') {
      return (children as (item: NonNullable<T>) => React.ReactNode)(when as NonNullable<T>)
    }
    return children
  }

  return fallback
}
