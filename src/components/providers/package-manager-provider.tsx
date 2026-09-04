'use client'

import React, { createContext, useContext, useMemo } from 'react'
import { useLocalStorage } from '@/registry/hooks/browser/use-local-storage'

export type PackageManager = 'pnpm' | 'npm' | 'yarn' | 'bun'

type PackageManagerContextValue = {
  packageManager: PackageManager
  setPackageManager: (pm: PackageManager) => void
}

const PackageManagerContext = createContext<PackageManagerContextValue>({
  packageManager: 'pnpm',
  setPackageManager: () => {},
})

const STORAGE_KEY = 'space-ui-pm'

export function PackageManagerProvider({ children }: { children: React.ReactNode }) {
  const [packageManager, setPackageManager] = useLocalStorage<PackageManager>(STORAGE_KEY, 'pnpm')

  const value = useMemo(
    () => ({
      packageManager,
      setPackageManager,
    }),
    [packageManager, setPackageManager],
  )

  return <PackageManagerContext.Provider value={value}>{children}</PackageManagerContext.Provider>
}

export function usePackageManager(): [PackageManager, (pm: PackageManager) => void] {
  const ctx = useContext(PackageManagerContext)
  return [ctx.packageManager, ctx.setPackageManager]
}
