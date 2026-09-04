'use client'

import { useState, useCallback } from 'react'
import { useSingleEffect } from '@/registry/hooks/lifecycle/use-single-effect'
import { useEventCallback } from '@/registry/hooks/lifecycle/use-event-callback'
import { deleteCookie, getCookie, getCookies, setCookie } from '@/registry/utils/cookie'

/**
 * React hook to manage cookies in the browser.
 *
 * @template T
 * @param {string} cookieName - Name of the cookie.
 * @returns {[(name?: string) => T, (newValue: T, expireDays?: number) => void, (name?: string) => void, Record<string, any>]} A tuple of [getter, setter, deleter, allCookies].
 *
 * @example
 * const [getTheme, setTheme, removeTheme] = useCookie('user_theme');
 * setTheme('dark', 30); // 30 days
 */
export function useCookie<T>(cookieName: string) {
  const [cookies, setCookies] = useState<Record<string, any>>({})

  const refreshCookies = useEventCallback(() => {
    setCookies(getCookies())
  })

  useSingleEffect(() => {
    refreshCookies()
  })

  const get = useCallback(
    (name: string = cookieName): T => {
      return getCookie(name) as T
    },
    [cookieName],
  )

  const set = useCallback(
    (newValue: T, expireDays = 1) => {
      setCookie(cookieName, newValue, expireDays)
      refreshCookies()
    },
    [cookieName, refreshCookies],
  )

  const remove = useCallback(
    (name: string = cookieName) => {
      deleteCookie(name)
      refreshCookies()
    },
    [cookieName, refreshCookies],
  )

  return [get, set, remove, cookies] as const
}

export const useCookies = useCookie
