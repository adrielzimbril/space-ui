'use client'

import * as React from 'react'
import Link from 'next/link'
import { motion } from 'motion/react'
import { Badge } from '@/registry/components/spaceui/badge-squircle'
import { LiquidBorder } from '@/registry/components/spaceui/liquid-metal-border'
import { DEFAULT_ORBS, type OrbConfig } from '@/registry/components/button/rainbow-glow-button'
import { cn } from '@/registry/lib/utils'

import { RainbowGlowBorder } from '@/registry/components/spaceui/rainbow-glow-border'

export interface ProBadgeProps {
  size?: '2xs' | 'xs' | 'sm' | 'default'
  className?: string
  badgeClassName?: string
  asLink?: boolean
  href?: string
  text?: string
  liquid?: boolean
  variant?: 'liquid' | 'glow' | 'default'
}

export function ProBadge({
  size = 'xs',
  className,
  badgeClassName,
  asLink = false,
  href = '/pricing',
  text = 'PRO',
  liquid = true,
  variant,
}: ProBadgeProps) {
  const isMini = size === '2xs'
  const badgeSize = isMini ? 'xs' : size
  const borderPadding = isMini ? 'p-[0.09125rem]' : size === 'default' ? 'p-1' : 'p-0.75'
  const glowPadding = isMini ? 'p-[1.25px]' : size === 'default' ? 'p-[2px]' : 'p-[1.5px]'

  // Determine active visual effect
  const effect = variant ?? (liquid ? 'liquid' : 'default')

  const badgeContent = (
    <Badge
      size={badgeSize}
      variant="primary"
      className={cn(
        'bg-primary! select-none uppercase leading-none font-bold',
        size === '2xs' && 'text-[9px] px-1.5 py-0.5',
        badgeClassName,
      )}
    >
      {text}
    </Badge>
  )

  let renderedBadge: React.ReactNode

  if (effect === 'glow') {
    renderedBadge = (
      <RainbowGlowBorder
        className={cn(
          'inline-flex items-center justify-center squircle rounded-7xl leading-none shrink-0',
          glowPadding,
          asLink && 'transition-transform duration-200 hover:scale-105 active:scale-95',
          className,
        )}
      >
        {badgeContent}
      </RainbowGlowBorder>
    )
  } else if (effect === 'liquid') {
    renderedBadge = (
      <LiquidBorder
        className={cn(
          'inline-flex items-center justify-center squircle rounded-7xl leading-none shrink-0',
          borderPadding,
          asLink && 'transition-transform duration-200 hover:scale-105 active:scale-95',
          className,
        )}
      >
        {badgeContent}
      </LiquidBorder>
    )
  } else {
    renderedBadge = (
      <span
        className={cn(
          'inline-flex items-center justify-center squircle rounded-7xl leading-none shrink-0',
          asLink && 'transition-transform duration-200 hover:scale-105 active:scale-95',
          className,
        )}
      >
        {badgeContent}
      </span>
    )
  }

  if (asLink) {
    return (
      <Link
        href={href}
        onClick={(e) => {
          e.stopPropagation()
        }}
        title="Space UI Pro — View plans"
        aria-label="Space UI Pro — View plans"
        className="inline-flex items-center justify-center shrink-0 z-10 cursor-pointer leading-none"
      >
        {renderedBadge}
      </Link>
    )
  }

  return <span className="inline-flex items-center justify-center shrink-0 leading-none">{renderedBadge}</span>
}
