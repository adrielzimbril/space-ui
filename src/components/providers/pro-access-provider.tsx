'use client'

import * as React from 'react'
import { useAuth } from '@/components/providers/auth-provider'

const ProAccessContext = React.createContext<boolean | undefined>(undefined)

export function ProAccessProvider({ hasProAccess, children }: { hasProAccess: boolean; children: React.ReactNode }) {
  return <ProAccessContext.Provider value={hasProAccess}>{children}</ProAccessContext.Provider>
}

export function useProAccess(): boolean {
  const contextValue = React.useContext(ProAccessContext)
  const { user } = useAuth()

  if (typeof contextValue === 'boolean' && contextValue) {
    return true
  }

  if (!user) {
    return contextValue ?? false
  }

  const appMeta = (user.app_metadata || {}) as Record<string, any>
  const userMeta = (user.user_metadata || {}) as Record<string, any>

  return Boolean(
    appMeta.plan === 'pro' ||
    appMeta.plan === 'lifetime' ||
    appMeta.has_paid === true ||
    appMeta.subscription_status === 'active' ||
    appMeta.subscription_status === 'trialing' ||
    userMeta.is_pro ||
    userMeta.isPro ||
    userMeta.plan === 'pro',
  )
}
