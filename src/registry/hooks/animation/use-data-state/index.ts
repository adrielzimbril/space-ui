'use client'

/**
 * Normalizes boolean or string open/closed UI states into HTML `data-state` attributes ('open' | 'closed').
 *
 * @param {string | boolean | undefined} state - The raw UI state.
 * @returns {string | undefined} Normalized state string suitable for `data-state`.
 *
 * @example
 * const dataState = useDataState(isOpen); // => 'open' or 'closed'
 */
export function useDataState(state: string | boolean | undefined): string | undefined {
  if (typeof state === 'boolean') {
    return state ? 'open' : 'closed'
  }
  return state
}
