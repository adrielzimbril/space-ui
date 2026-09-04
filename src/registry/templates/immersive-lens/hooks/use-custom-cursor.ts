'use client'

import { useEffect, useState } from 'react'
import { useMotionValue, useSpring } from 'motion/react'

export function useCustomCursor() {
  const [cursorActive, setCursorActive] = useState(false)
  const [cursorLabel, setCursorLabel] = useState('Zoom')

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const cursorX = useSpring(mouseX, { stiffness: 600, damping: 48, mass: 0.22 })
  const cursorY = useSpring(mouseY, { stiffness: 600, damping: 48, mass: 0.22 })

  useEffect(() => {
    const onMove = (event: PointerEvent) => {
      mouseX.set(event.clientX)
      mouseY.set(event.clientY)
    }

    window.addEventListener('pointermove', onMove)
    return () => window.removeEventListener('pointermove', onMove)
  }, [mouseX, mouseY])

  return {
    cursorActive,
    setCursorActive,
    cursorLabel,
    setCursorLabel,
    cursorX,
    cursorY,
    mouseX,
    mouseY,
  }
}
