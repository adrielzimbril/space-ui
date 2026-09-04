import * as React from 'react'

/**
 * Props for the `<For>` list-rendering component.
 *
 * @template T
 */
export interface ForProps<T> {
  /** The array of items to iterate over. */
  each: readonly T[] | T[] | null | undefined
  /** Fallback content rendered when the array is empty or null. */
  fallback?: React.ReactNode
  /** Render function for each item in the array. */
  children: (item: T, index: number) => React.ReactNode
}

/**
 * Declarative list rendering component with built-in empty fallback support.
 *
 * @template T
 * @param {ForProps<T>} props - Component props.
 * @returns {React.ReactNode} The mapped items or empty fallback.
 *
 * @example
 * <For each={items} fallback={<EmptyState message="No items found." />}>
 *   {(item, index) => (
 *     <ItemCard key={item.id} title={item.title} index={index} />
 *   )}
 * </For>
 */
export function For<T>({ each, fallback = null, children }: ForProps<T>): React.ReactNode {
  if (!each || each.length === 0) {
    return fallback
  }

  return <>{each.map((item, index) => children(item, index))}</>
}
