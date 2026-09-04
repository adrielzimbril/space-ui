'use client'

import * as React from 'react'
import { AnimatePresence, motion, type HTMLMotionProps } from 'motion/react'
import { cn } from '@/registry/lib/utils'

export type MorphIconVariant = 'blur-scale' | 'rotate-scale' | 'flip' | 'spring'

export interface MorphIconProps extends Omit<HTMLMotionProps<'span'>, 'children'> {
  /** Key identifying the active state/icon */
  activeKey: React.Key
  /** The icon to render */
  children: React.ReactNode
  /** Animation transition style */
  variant?: MorphIconVariant
  /** Animation duration in seconds */
  duration?: number
}

const variantsMap: Record<
  MorphIconVariant,
  {
    initial: HTMLMotionProps<'span'>['initial']
    animate: HTMLMotionProps<'span'>['animate']
    exit: HTMLMotionProps<'span'>['exit']
  }
> = {
  'blur-scale': {
    initial: { scale: 0.2, opacity: 0, filter: 'blur(4px)', rotate: -15 },
    animate: { scale: 1, opacity: 1, filter: 'blur(0px)', rotate: 0 },
    exit: { scale: 0.2, opacity: 0, filter: 'blur(4px)', rotate: 15 },
  },
  'rotate-scale': {
    initial: { scale: 0, opacity: 0, rotate: -90 },
    animate: { scale: 1, opacity: 1, rotate: 0 },
    exit: { scale: 0, opacity: 0, rotate: 90 },
  },
  flip: {
    initial: { rotateY: 90, opacity: 0 },
    animate: { rotateY: 0, opacity: 1 },
    exit: { rotateY: -90, opacity: 0 },
  },
  spring: {
    initial: { scale: 0.3, y: 4, opacity: 0 },
    animate: { scale: 1, y: 0, opacity: 1 },
    exit: { scale: 0.3, y: -4, opacity: 0 },
  },
}

export function MorphIcon({
  activeKey,
  children,
  className,
  variant = 'blur-scale',
  duration = 0.22,
  ...props
}: MorphIconProps): React.ReactElement {
  const selectedVariant = variantsMap[variant] ?? variantsMap['blur-scale']

  return (
    <AnimatePresence mode="popLayout" initial={false}>
      <motion.span
        key={activeKey}
        data-slot="morph-icon"
        className={cn('inline-flex items-center justify-center pointer-events-none shrink-0', className)}
        initial={selectedVariant.initial}
        animate={selectedVariant.animate}
        exit={selectedVariant.exit}
        transition={{ duration, ease: [0.16, 1, 0.3, 1] }}
        {...props}
      >
        {children}
      </motion.span>
    </AnimatePresence>
  )
}
