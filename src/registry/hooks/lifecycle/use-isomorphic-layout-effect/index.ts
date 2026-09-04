'use client'

import { useEffect, useLayoutEffect } from 'react'

/**
 * Custom `useLayoutEffect` that safely falls back to `useEffect` during SSR to prevent React hydration warnings.
 */
export const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect
