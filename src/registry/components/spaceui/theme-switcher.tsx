'use client'

import { Switch } from '@/registry/primitives/switch'
import { IconMoon, IconSun } from '@tabler/icons-react'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'

export const ThemeSwitcher = ({ className }: { className?: string }) => {
  const { resolvedTheme: theme, setTheme } = useTheme()

  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  return (
    isClient && (
      <Switch
        className={className}
        leftIcon={<IconSun />}
        rightIcon={<IconMoon />}
        checked={theme === 'dark'}
        onCheckedChange={(checked) => setTheme(checked ? 'dark' : 'light')}
      />
    )
  )
}
