'use client'

import { useState, useCallback, useRef } from 'react'

export type MutationFunction<TData = any, TVariables = any> = (variables: TVariables) => Promise<TData> | TData

export interface UseMutationOptions<TData = any, TVariables = any> {
  mutationFn?: MutationFunction<TData, TVariables>
  onSuccess?: (data: TData, variables: TVariables) => void
  onError?: (error: any, variables: TVariables) => void
  onSettled?: (data: TData | null, error: any | null, variables: TVariables) => void
}

export interface UseMutationReturn<TData = any, TVariables = any> {
  data: TData | null
  response: TData | null
  error: any | null
  loading: boolean
  isLoading: boolean
  isSuccess: boolean
  isError: boolean
  isIdle: boolean
  mutate: (variables?: TVariables) => Promise<TData | null>
  mutateAsync: (variables?: TVariables) => Promise<TData>
  reset: () => void
}

/**
 * React hook for managing asynchronous mutations, state tracking, and error handling.
 *
 * @template TData, TVariables
 * @param {MutationFunction<TData, TVariables> | UseMutationOptions<TData, TVariables> | string} fnOrOptionsOrUrl - Async mutation callback, options object, or API URL string.
 * @param {UseMutationOptions<TData, TVariables>} [options] - Optional lifecycle callbacks (onSuccess, onError, onSettled).
 * @returns {UseMutationReturn<TData, TVariables>} Mutation trigger methods, loading status, and results.
 *
 * @example
 * const { mutate, loading, data, error } = useMutation(async (user) => {
 *   return await api.createUser(user);
 * });
 */
export function useMutation<TData = any, TVariables = any>(
  fnOrOptionsOrUrl: MutationFunction<TData, TVariables> | UseMutationOptions<TData, TVariables> | string,
  options?: UseMutationOptions<TData, TVariables>,
): UseMutationReturn<TData, TVariables> {
  const isFunction = typeof fnOrOptionsOrUrl === 'function'
  const isStringUrl = typeof fnOrOptionsOrUrl === 'string'

  let mutationFn: MutationFunction<TData, TVariables> | undefined
  let resolvedOptions: UseMutationOptions<TData, TVariables> = options || {}

  if (isFunction) {
    mutationFn = fnOrOptionsOrUrl as MutationFunction<TData, TVariables>
  } else if (isStringUrl) {
    mutationFn = async (variables: TVariables) => {
      const res = await fetch(fnOrOptionsOrUrl as string, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(variables),
      })
      if (!res.ok) throw new Error(`Request failed with status ${res.status}`)
      return res.json()
    }
  } else if (typeof fnOrOptionsOrUrl === 'object' && fnOrOptionsOrUrl !== null) {
    resolvedOptions = { ...fnOrOptionsOrUrl, ...options }
    mutationFn = resolvedOptions.mutationFn
  }

  const [data, setData] = useState<TData | null>(null)
  const [error, setError] = useState<any | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  const optionsRef = useRef(resolvedOptions)
  optionsRef.current = resolvedOptions

  const mutationFnRef = useRef(mutationFn)
  mutationFnRef.current = mutationFn

  const mutateAsync = useCallback(async (variables?: TVariables): Promise<TData> => {
    setLoading(true)
    setStatus('loading')
    setError(null)

    try {
      if (!mutationFnRef.current) {
        throw new Error('No mutation function provided to useMutation')
      }

      const result = await mutationFnRef.current(variables as TVariables)
      setData(result)
      setStatus('success')
      optionsRef.current.onSuccess?.(result, variables as TVariables)
      optionsRef.current.onSettled?.(result, null, variables as TVariables)
      return result
    } catch (err: any) {
      setError(err)
      setStatus('error')
      optionsRef.current.onError?.(err, variables as TVariables)
      optionsRef.current.onSettled?.(null, err, variables as TVariables)
      throw err
    } finally {
      setLoading(false)
    }
  }, [])

  const mutate = useCallback(
    async (variables?: TVariables): Promise<TData | null> => {
      try {
        return await mutateAsync(variables)
      } catch {
        return null
      }
    },
    [mutateAsync],
  )

  const reset = useCallback(() => {
    setData(null)
    setError(null)
    setLoading(false)
    setStatus('idle')
  }, [])

  return {
    data,
    response: data,
    error,
    loading,
    isLoading: loading,
    isSuccess: status === 'success',
    isError: status === 'error',
    isIdle: status === 'idle',
    mutate,
    mutateAsync,
    reset,
  }
}
