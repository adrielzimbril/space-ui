'use client'

import { cn } from '@/registry/lib/utils'
import { Squishmoji } from '@usespaceui/squishmoji/react'
import * as React from 'react'

export function SpaceUILogo({ size = 32, className }: { size?: number; className?: string }) {
  return (
    <div
      className={cn('relative flex items-center justify-center shrink-0 overflow-visible', className)}
      style={{ width: size, height: size }}
    >
      <Squishmoji
        seed="o"
        shape="lion"
        expression="loving"
        backgroundStyle="all"
        animate
        animOnHover
        size={Math.round(size * 1.4)}
        className="relative origin-center transition-transform"
      />
    </div>
  )
}
