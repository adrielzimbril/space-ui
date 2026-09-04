'use client'

import { useState, useCallback, type ChangeEvent } from 'react'

export interface UseCharacterLimitOptions {
  /** Maximum number of allowed characters. */
  maxLength: number
  /** Initial text value. */
  initialValue?: string
}

/**
 * React hook for text inputs with character limit tracking and overflow warnings.
 *
 * @param {UseCharacterLimitOptions} options - Character limit options.
 * @returns {{ value: string, count: number, remaining: number, isExceeded: boolean, handleChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void, setValue: (val: string) => void }} Form control properties.
 *
 * @example
 * const { value, count, remaining, handleChange } = useCharacterLimit({ maxLength: 280 });
 */
export function useCharacterLimit({ maxLength, initialValue = '' }: UseCharacterLimitOptions) {
  const [value, setValue] = useState(initialValue)

  const handleChange = useCallback((e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setValue(e.target.value)
  }, [])

  const count = value.length
  const remaining = maxLength - count
  const isExceeded = remaining < 0

  return {
    value,
    count,
    remaining,
    isExceeded,
    handleChange,
    setValue,
  }
}
