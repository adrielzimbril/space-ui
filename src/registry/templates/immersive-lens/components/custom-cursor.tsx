'use client'

import React from 'react'
import { motion, type MotionValue } from 'motion/react'
import { ease, glass } from '../lib/data'

export interface CustomCursorProps {
  cursorX: MotionValue<number>
  cursorY: MotionValue<number>
  cursorActive: boolean
  cursorLabel: string
}

export function CustomCursor({ cursorX, cursorY, cursorActive, cursorLabel }: CustomCursorProps) {
  return (
    <motion.div
      aria-hidden="true"
      style={{
        x: cursorX,
        y: cursorY,
        translateX: '-50%',
        translateY: 'calc(-100% - 15px)',
      }}
      animate={{
        opacity: cursorActive ? 1 : 0,
        clipPath: cursorActive ? 'inset(0 0 0 0 round 8px)' : 'inset(0 50% 0 50% round 8px)',
      }}
      transition={{ duration: cursorActive ? 0.45 : 0.25, ease }}
      className={`pointer-events-none fixed left-0 top-0 z-[110] inline-flex min-w-[60px] items-center justify-center overflow-hidden rounded-[8px] px-[15px] text-[14px] font-semibold uppercase leading-[34px] text-white ${glass}`}
    >
      <span className="truncate">{cursorLabel}</span>
    </motion.div>
  )
}
