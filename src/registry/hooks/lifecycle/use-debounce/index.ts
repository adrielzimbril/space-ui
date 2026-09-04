'use client'

import { useState, useEffect } from 'react'

/**
 * React hook that delays updating a value until after a specified delay period has elapsed without changes.
 *
 * @template T
 * @param {T} value - The input value to debounce.
 * @param {number} delay - Delay duration in milliseconds.
 * @returns {T} The debounced value.
 *
 * @example
 * const [query, setQuery] = useState('');
 * const debouncedQuery = useDebounce(query, 300);
 */
export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value)

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    return () => clearTimeout(handler)
  }, [value, delay])

  return debouncedValue
}
