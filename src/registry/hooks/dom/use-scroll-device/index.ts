'use client'

import { useState, useRef } from 'react'
import { useEventListener } from '@/registry/hooks/dom/use-event-listener'

export type ScrollDirectionY = 'up' | 'down' | 'none'
export type ScrollDirectionX = 'left' | 'right' | 'none'
export type ScrollDirection =
  'up' | 'down' | 'left' | 'right' | 'up-left' | 'up-right' | 'down-left' | 'down-right' | 'none'

export type ScrollDeviceType = 'wheel' | 'touchpad' | 'touch' | 'keyboard' | null

export interface ScrollDeviceStatus {
  device: ScrollDeviceType
  direction: ScrollDirection
  directionX: ScrollDirectionX
  directionY: ScrollDirectionY
  isScrolling: boolean
  isScrollingUp: boolean
  isScrollingDown: boolean
  isScrollingLeft: boolean
  isScrollingRight: boolean
  isDiagonal: boolean
  deltaX: number
  deltaY: number
}

export interface UseScrollDeviceOptions {
  /**
   * Minimum delta in pixels before triggering direction change.
   * @default 3
   */
  threshold?: number
  /**
   * Inactivity delay (in ms) to reset scrolling state to idle.
   * @default 250
   */
  idleTimeout?: number
}

/**
 * React hook to detect real-time 8-directional scrolling (cardinal and diagonal)
 * and hardware input gestures (mouse wheel, touchpad 2D swipe, touch, keyboard).
 *
 * @param {UseScrollDeviceOptions | number} [options=3] - Options or threshold.
 * @returns {ScrollDeviceStatus} 8-directional scroll state, coordinates and device details.
 *
 * @example
 * const { device, direction, isDiagonal, isScrollingLeft } = useScrollDevice();
 */
export function useScrollDevice(options: UseScrollDeviceOptions | number = 3): ScrollDeviceStatus {
  const threshold = typeof options === 'number' ? options : (options?.threshold ?? 3)
  const idleTimeout = typeof options === 'object' ? (options?.idleTimeout ?? 250) : 250

  const [direction, setDirection] = useState<ScrollDirection>('none')
  const [directionX, setDirectionX] = useState<ScrollDirectionX>('none')
  const [directionY, setDirectionY] = useState<ScrollDirectionY>('none')
  const [device, setDevice] = useState<ScrollDeviceType>(null)
  const [isScrolling, setIsScrolling] = useState<boolean>(false)
  const [deltaX, setDeltaX] = useState<number>(0)
  const [deltaY, setDeltaY] = useState<number>(0)

  const idleTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const touchStartPos = useRef<{ x: number; y: number }>({ x: 0, y: 0 })

  const resetIdle = () => {
    setIsScrolling(true)
    if (idleTimer.current) clearTimeout(idleTimer.current)
    idleTimer.current = setTimeout(() => {
      setIsScrolling(false)
      setDirection('none')
      setDirectionX('none')
      setDirectionY('none')
      setDeltaX(0)
      setDeltaY(0)
    }, idleTimeout)
  }

  const computeDirections = (dX: number, dY: number) => {
    setDeltaX(dX)
    setDeltaY(dY)

    const hasX = Math.abs(dX) >= threshold
    const hasY = Math.abs(dY) >= threshold

    let dirX: ScrollDirectionX = 'none'
    let dirY: ScrollDirectionY = 'none'
    let dir: ScrollDirection = 'none'

    if (hasX) dirX = dX > 0 ? 'right' : 'left'
    if (hasY) dirY = dY > 0 ? 'down' : 'up'

    if (hasX && hasY) {
      if (dirY === 'up' && dirX === 'left') dir = 'up-left'
      else if (dirY === 'up' && dirX === 'right') dir = 'up-right'
      else if (dirY === 'down' && dirX === 'left') dir = 'down-left'
      else if (dirY === 'down' && dirX === 'right') dir = 'down-right'
    } else if (hasY) {
      dir = dirY
    } else if (hasX) {
      dir = dirX
    }

    setDirectionX(dirX)
    setDirectionY(dirY)
    setDirection(dir)
    resetIdle()
  }

  // Direct wheel / trackpad gesture listener (catches X and Y even without page scrollbars)
  useEventListener(
    'wheel',
    (event: WheelEvent) => {
      const isTouchpad =
        !Number.isInteger(event.deltaY) ||
        !Number.isInteger(event.deltaX) ||
        Math.abs(event.deltaX) > 0 ||
        Math.abs(event.deltaY) < 35

      setDevice(isTouchpad ? 'touchpad' : 'wheel')
      computeDirections(event.deltaX, event.deltaY)
    },
    undefined,
    { passive: true },
  )

  // Touch swipe listener
  useEventListener(
    'touchstart',
    (event: TouchEvent) => {
      if (event.touches.length > 0) {
        touchStartPos.current = {
          x: event.touches[0].clientX,
          y: event.touches[0].clientY,
        }
        setDevice('touch')
      }
    },
    undefined,
    { passive: true },
  )

  useEventListener(
    'touchmove',
    (event: TouchEvent) => {
      if (event.touches.length > 0) {
        setDevice('touch')
        const dX = touchStartPos.current.x - event.touches[0].clientX
        const dY = touchStartPos.current.y - event.touches[0].clientY
        computeDirections(dX, dY)
        touchStartPos.current = {
          x: event.touches[0].clientX,
          y: event.touches[0].clientY,
        }
      }
    },
    undefined,
    { passive: true },
  )

  // Keyboard navigation
  useEventListener('keydown', (event: KeyboardEvent) => {
    let kX = 0
    let kY = 0

    switch (event.key) {
      case 'ArrowUp':
      case 'PageUp':
        kY = -20
        break
      case 'ArrowDown':
      case 'PageDown':
      case ' ':
        kY = 20
        break
      case 'ArrowLeft':
        kX = -20
        break
      case 'ArrowRight':
        kX = 20
        break
      case 'Home':
        kY = -50
        break
      case 'End':
        kY = 50
        break
      default:
        return
    }

    setDevice('keyboard')
    computeDirections(kX, kY)
  })

  const isDiagonal = ['up-left', 'up-right', 'down-left', 'down-right'].includes(direction)

  return {
    device,
    direction,
    directionX,
    directionY,
    isScrolling,
    isScrollingUp: direction.startsWith('up'),
    isScrollingDown: direction.startsWith('down'),
    isScrollingLeft: direction.endsWith('left') || direction === 'left',
    isScrollingRight: direction.endsWith('right') || direction === 'right',
    isDiagonal,
    deltaX,
    deltaY,
  }
}
