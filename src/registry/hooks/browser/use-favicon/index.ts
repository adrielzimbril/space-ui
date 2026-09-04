'use client'

import { useEffect } from 'react'

/**
 * React hook to dynamically update the document favicon URL.
 *
 * @param {string} href - The URL or path to the favicon image.
 *
 * @example
 * useFavicon(hasUnread ? '/favicon-unread.ico' : '/favicon.ico');
 */
export function useFavicon(href: string): void {
  useEffect(() => {
    if (typeof document === 'undefined') return

    let link: HTMLLinkElement | null = document.querySelector("link[rel*='icon']")

    if (!link) {
      link = document.createElement('link')
      link.type = 'image/x-icon'
      link.rel = 'shortcut icon'
      document.getElementsByTagName('head')[0].appendChild(link)
    }

    link.href = href
  }, [href])
}
