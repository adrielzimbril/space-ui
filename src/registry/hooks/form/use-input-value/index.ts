'use client'

import { useState, useCallback, type ChangeEvent } from 'react'

export interface InputBinding {
  value: string
  onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
}

export interface InputActions {
  setValue: (value: string | ((prev: string) => string)) => void
  reset: () => void
  clear: () => void
}

export type InputTuple = [string, InputBinding, InputActions]

export type UseInputValueReturn = InputTuple &
  InputBinding &
  InputActions & {
    bind: InputBinding
  }

/**
 * Versatile React hook to manage controlled input and textarea fields.
 * Supports:
 * - Tuple destructuring: `const [value, bind, { reset }] = useInputValue('Space')`
 * - Object destructuring: `const { value, bind, reset, clear } = useInputValue('Space')`
 * - Direct element spreading: `<input {...useInputValue('')} />`
 *
 * @param {string} [initialValue=''] - Initial field value.
 * @returns {UseInputValueReturn} Input state, bindings and actions.
 *
 * @example
 * // Pattern 1: Tuple binding
 * const [val, bind] = useInputValue('Space UI');
 * return <Input {...bind} />;
 *
 * // Pattern 2: Direct spread
 * const nameInput = useInputValue('');
 * return <input {...nameInput} placeholder="Your name" />;
 */
export function useInputValue(initialValue: string = ''): UseInputValueReturn {
  const [value, setValue] = useState<string>(initialValue)

  const onChange = useCallback((e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setValue(e.target.value)
  }, [])

  const reset = useCallback(() => {
    setValue(initialValue)
  }, [initialValue])

  const clear = useCallback(() => {
    setValue('')
  }, [])

  const bind: InputBinding = {
    value,
    onChange,
  }

  const actions: InputActions = {
    setValue,
    reset,
    clear,
  }

  const result = [value, bind, actions] as unknown as UseInputValueReturn

  result.value = value
  result.onChange = onChange
  result.bind = bind
  result.setValue = setValue
  result.reset = reset
  result.clear = clear

  return result
}
