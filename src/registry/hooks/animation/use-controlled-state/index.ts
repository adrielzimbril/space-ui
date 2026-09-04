'use client'

import { useState, useCallback } from 'react'

export interface UseControlledStateOptions<T> {
  prop?: T
  value?: T
  defaultProp?: T
  defaultValue?: T
  onChange?: (value: T) => void
}

/**
 * React hook supporting both controlled and uncontrolled component state patterns seamlessly.
 * Supports both object options `{ prop, defaultProp, onChange }` and positional parameters `(prop, defaultProp, onChange)`.
 *
 * @template T
 * @param {UseControlledStateOptions<T> | T | undefined} optionsOrProp - Options object or controlled prop.
 * @param {T} [defaultValue] - Default value if using positional parameters.
 * @param {(value: T) => void} [onChange] - Change callback if using positional parameters.
 * @returns {[T, (value: T | ((prev: T) => T)) => void]} Tuple of [currentValue, setValue].
 *
 * @example
 * // Object pattern:
 * const [val, setVal] = useControlledState({ prop: props.value, defaultProp: 'Off', onChange: props.onChange });
 *
 * // Positional pattern:
 * const [val, setVal] = useControlledState(props.value, 'Off', props.onChange);
 */
export function useControlledState<T>(
  optionsOrProp?: UseControlledStateOptions<T> | T,
  defaultValue?: T,
  onChange?: (value: T) => void,
): [T, (value: T | ((prev: T) => T)) => void] {
  const isObjectCall =
    optionsOrProp !== null &&
    typeof optionsOrProp === 'object' &&
    ('prop' in optionsOrProp ||
      'defaultProp' in optionsOrProp ||
      'value' in optionsOrProp ||
      'defaultValue' in optionsOrProp ||
      'onChange' in optionsOrProp)

  const controlledValue = isObjectCall
    ? ((optionsOrProp as UseControlledStateOptions<T>).prop ?? (optionsOrProp as UseControlledStateOptions<T>).value)
    : (optionsOrProp as T | undefined)

  const fallbackValue = isObjectCall
    ? ((optionsOrProp as UseControlledStateOptions<T>).defaultProp ??
      (optionsOrProp as UseControlledStateOptions<T>).defaultValue ??
      ('' as unknown as T))
    : (defaultValue ?? ('' as unknown as T))

  const changeHandler = isObjectCall ? (optionsOrProp as UseControlledStateOptions<T>).onChange : onChange

  const [internalValue, setInternalValue] = useState<T>(fallbackValue)
  const isControlled = controlledValue !== undefined
  const value = isControlled ? controlledValue : internalValue

  const setValue = useCallback(
    (next: T | ((prev: T) => T)) => {
      const nextValue = typeof next === 'function' ? (next as (prev: T) => T)(value) : next
      if (!isControlled) {
        setInternalValue(nextValue)
      }
      changeHandler?.(nextValue)
    },
    [isControlled, changeHandler, value],
  )

  return [value, setValue]
}
