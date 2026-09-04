'use client'

import * as React from 'react'

export interface LockBodyScrollReturn {
  isLocked: boolean
  setIsLocked: React.Dispatch<React.SetStateAction<boolean>>
  lock: () => void
  unlock: () => void
  toggle: () => void
}

export function useLockBodyScroll(initialLocked: boolean = false): LockBodyScrollReturn {
  const [isLocked, setIsLocked] = React.useState<boolean>(initialLocked)

  React.useEffect(() => {
    if (typeof document === 'undefined') return

    const originalPaddingRight = document.documentElement.style.paddingRight
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth

    if (isLocked) {
      if (scrollbarWidth > 0) {
        document.documentElement.style.paddingRight = `${scrollbarWidth}px`
      }
      document.documentElement.style.overflow = 'hidden'
    } else {
      document.documentElement.style.removeProperty('overflow')
      document.documentElement.style.paddingRight = originalPaddingRight
    }

    return () => {
      document.documentElement.style.removeProperty('overflow')
      document.documentElement.style.paddingRight = originalPaddingRight
    }
  }, [isLocked])

  return {
    isLocked,
    setIsLocked,
    lock: () => setIsLocked(true),
    unlock: () => setIsLocked(false),
    toggle: () => setIsLocked((prev) => !prev),
  }
}

export const usePreventBodyScroll = useLockBodyScroll
