'use client'

import React, { useRef, useState, useEffect, useCallback, useMemo, memo } from 'react'
import { motion, useMotionValue, useSpring, useTransform, animate, type AnimationPlaybackControls } from 'motion/react'
import { cn } from '@/registry/lib/utils'

/* ─── Types ─────────────────────────────────────────────────────────── */

export type Direction = 'flat' | 'up' | 'down'

export interface DirtCarouselItem {
  id?: string | number
  name?: string
  mediaType?: 'video' | 'image'
  videoLink?: string
  imageLink?: string
  thumbnail?: string
  [key: string]: any
}

export interface DirtCarouselProps {
  /** Array of items to display in the 3D ring */
  items?: DirtCarouselItem[]
  /** Orbital inclination: flat, tilted up, or tilted down */
  direction?: Direction
  /** Ring radius in pixels */
  radius?: number
  /** 3D perspective distance in pixels */
  perspective?: number
  /** Size (diameter) of each item element */
  ballSize?: number
  /** Border radius of the item elements */
  borderRadius?: number
  /** Sensitivity of dragging */
  dragSensitivity?: number
  /** Whether the carousel tilts towards the mouse pointer on hover */
  mouseTilt?: boolean
  /** Intensity multiplier for the mouse tilt */
  tiltIntensity?: number
  /** Whether items gently float/bounce up and down (defaults to false for rock-solid grab) */
  bounce?: boolean
  /** Whether the ring snaps to the closest item when released */
  snap?: boolean
  /** Continuous auto rotation */
  autoRotate?: boolean
  /** Auto rotation speed in items per second */
  autoRotateSpeed?: number
  /** Delay in seconds before entry animation starts */
  entryDelay?: number
  /** Custom render function for item content */
  renderItem?: (item: DirtCarouselItem, index: number) => React.ReactNode
  /** Additional container classes */
  className?: string
}

/* ─── Physics constants ──────────────────────────────────────────── */

const GLIDE_SPRING = { stiffness: 40, damping: 22, mass: 2 }
const FLICK_MOMENTUM = 0.35
const MAX_FLICK_ITEMS = 5
const ENTRY_SPRING = { stiffness: 35, damping: 24 }
const RADIUS_SPRING = { stiffness: 30, damping: 20 }
const TILT_SPRING = { stiffness: 50, damping: 18 }
const WHEEL_SENSITIVITY = 0.3
const WHEEL_SETTLE_MS = 140

/* ─── Bob keyframe CSS ───────────────────────────────────────────── */

const BOB_KEYFRAME_STYLE = `
@keyframes __c3db {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}
`

/* ─── Shared styles ──────────────────────────────────────────────── */

const preserve3dStyle: React.CSSProperties = {
  position: 'absolute',
  width: '100%',
  height: '100%',
  transformStyle: 'preserve-3d',
  WebkitTransformStyle: 'preserve-3d',
}

const mediaStyle: React.CSSProperties = {
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  display: 'block',
  pointerEvents: 'none',
  userSelect: 'none',
  WebkitBackfaceVisibility: 'hidden',
}

/* ─── CarouselItem ───────────────────────────────────────────────── */

interface CarouselItemProps {
  item: DirtCarouselItem
  index: number
  angleStep: number
  radiusMV: ReturnType<typeof useMotionValue<number>>
  isVisible: boolean
  borderRadius: number
  entryDelay: number
  bounce: boolean
  renderItem?: (item: DirtCarouselItem, index: number) => React.ReactNode
}

const CarouselItem = memo(
  function CarouselItem({
    item,
    index,
    angleStep,
    radiusMV,
    isVisible,
    borderRadius,
    entryDelay,
    bounce,
    renderItem,
  }: CarouselItemProps) {
    const videoRef = useRef<HTMLVideoElement>(null)

    const transformOrigin = useTransform(radiusMV, (r: number) => `50% 50% ${r}px`)
    const translateZ = useTransform(radiusMV, (r: number) => -r)

    useEffect(() => {
      const el = videoRef.current
      if (!el) return
      if (isVisible) {
        el.play().catch(() => {})
      } else {
        el.pause()
      }
    }, [isVisible])

    const faceStyle = useMemo(
      () => ({
        ...preserve3dStyle,
        rotateY: index * -angleStep,
        transformOrigin,
        translateZ,
        backfaceVisibility: 'hidden' as const,
        WebkitBackfaceVisibility: 'hidden' as const,
        overflow: 'hidden' as const,
        borderRadius: `${borderRadius}px`,
        userSelect: 'none' as const,
        contain: 'layout style paint' as const,
      }),
      [index, angleStep, transformOrigin, translateZ, borderRadius],
    )

    const bobStyle = useMemo(
      () => ({
        width: '100%',
        height: '100%',
        position: 'relative' as const,
        animation: bounce ? `__c3db ${2.8 + index * 0.08}s ease-in-out infinite` : undefined,
        animationDelay: bounce ? `${entryDelay + 1.2 + index * 0.08}s` : undefined,
      }),
      [index, entryDelay, bounce],
    )

    return (
      <motion.div
        style={faceStyle}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut', delay: entryDelay }}
        aria-label={item.name}
        role="img"
      >
        <div style={bobStyle}>
          {renderItem ? (
            renderItem(item, index)
          ) : item.mediaType === 'image' || item.imageLink ? (
            <img
              src={item.imageLink || item.thumbnail}
              alt={item.name || ''}
              style={mediaStyle}
              loading="lazy"
              draggable={false}
            />
          ) : (
            <video
              ref={videoRef}
              src={item.videoLink}
              style={mediaStyle}
              loop
              muted
              playsInline
              preload="none"
              disablePictureInPicture
              poster={item.thumbnail || undefined}
            />
          )}
        </div>
      </motion.div>
    )
  },
  (prev, next) =>
    prev.item === next.item &&
    prev.radiusMV === next.radiusMV &&
    prev.isVisible === next.isVisible &&
    prev.angleStep === next.angleStep &&
    prev.index === next.index &&
    prev.borderRadius === next.borderRadius &&
    prev.entryDelay === next.entryDelay &&
    prev.bounce === next.bounce,
)

/* ─── DirtCarousel ───────────────────────────────────────────────── */

export function DirtCarousel({
  items = [],
  direction = 'flat',
  radius = 800,
  perspective = 800,
  ballSize = 800,
  borderRadius = 999,
  dragSensitivity = 0.5,
  mouseTilt = false,
  tiltIntensity = 0,
  bounce = false,
  snap = true,
  autoRotate = false,
  autoRotateSpeed = 0.3,
  entryDelay = 1.2,
  renderItem,
  className,
}: DirtCarouselProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const rafRef = useRef(0)
  const cachedRect = useRef<DOMRect | null>(null)
  const glideRef = useRef<AnimationPlaybackControls | null>(null)
  const wheelSettleRef = useRef<number | undefined>(undefined)
  const draggingRef = useRef(false)
  const hoverRef = useRef(false)

  const [ready, setReady] = useState(false)
  const [isVisible, setIsVisible] = useState(true)

  // Direction → base tilt X offset
  const baseTiltX = direction === 'up' ? 18 : direction === 'down' ? -18 : 0
  const angleStep = items.length > 0 ? 360 / items.length : 0

  /* ── Motion values ─────────────────────────────────────────────── */

  const rotationMV = useMotionValue(270)
  const radiusMV = useMotionValue(radius * 1.8)
  const tiltXMV = useMotionValue(baseTiltX)
  const tiltYMV = useMotionValue(0)
  const springTiltX = useSpring(tiltXMV, TILT_SPRING)
  const springTiltY = useSpring(tiltYMV, TILT_SPRING)

  // Reset tilt when mouseTilt is disabled or direction changes
  useEffect(() => {
    if (!mouseTilt) {
      tiltXMV.set(baseTiltX)
      tiltYMV.set(0)
    } else if (!draggingRef.current) {
      tiltXMV.set(baseTiltX)
    }
  }, [mouseTilt, baseTiltX, tiltXMV, tiltYMV])

  /* ── Drag state ────────────────────────────────────────────────── */

  const dragState = useRef({
    active: false,
    x0: 0,
    rot0: 0,
    lastX: 0,
    lastT: 0,
    prevX: 0,
    prevT: 0,
  })

  /* ── Glide / Snap ──────────────────────────────────────────────── */

  const stopGlide = useCallback(() => {
    glideRef.current?.stop()
    glideRef.current = null
  }, [])

  const glideTo = useCallback(
    (to: number, velocity: number) => {
      stopGlide()
      glideRef.current = animate(rotationMV, to, {
        type: 'spring',
        ...GLIDE_SPRING,
        velocity,
        restDelta: 0.01,
        restSpeed: 0.05,
      })
    },
    [rotationMV, stopGlide],
  )

  const settle = useCallback(
    (velocityDegPerSec: number) => {
      const current = rotationMV.get()
      if (!snap || angleStep === 0) {
        const projected = current + velocityDegPerSec * FLICK_MOMENTUM
        glideTo(projected, velocityDegPerSec)
        return
      }
      const projected = current + velocityDegPerSec * FLICK_MOMENTUM
      const maxDelta = MAX_FLICK_ITEMS * angleStep
      const delta = projected - current
      const clampedProjected = current + Math.max(-maxDelta, Math.min(maxDelta, delta))
      const snapped = Math.round(clampedProjected / angleStep) * angleStep
      glideTo(snapped, velocityDegPerSec)
    },
    [rotationMV, angleStep, snap, glideTo],
  )

  /* ── Inject bob keyframe CSS if bounce enabled ─────────────────── */

  useEffect(() => {
    if (!bounce || typeof document === 'undefined') return
    if (document.getElementById('c3d-bob-kf')) return
    const style = document.createElement('style')
    style.id = 'c3d-bob-kf'
    style.textContent = BOB_KEYFRAME_STYLE
    document.head.appendChild(style)
  }, [bounce])

  /* ── Entry animation ───────────────────────────────────────────── */

  useEffect(() => {
    const delayMs = entryDelay * 1000
    const t1 = setTimeout(() => {
      animate(rotationMV, 180, { type: 'spring', ...ENTRY_SPRING })
      animate(radiusMV, radius, { type: 'spring', ...RADIUS_SPRING })
    }, delayMs)
    const t2 = setTimeout(() => setReady(true), delayMs + 1200)
    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Update radius MV when config changes (after entry)
  useEffect(() => {
    if (ready) {
      animate(radiusMV, radius, { type: 'spring', ...RADIUS_SPRING })
    }
  }, [radius, ready, radiusMV])

  /* ── Intersection observer ─────────────────────────────────────── */

  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    const obs = new IntersectionObserver(([entry]) => setIsVisible(entry.isIntersecting), { threshold: 0 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  /* ── Reset cached rect on scroll/resize ────────────────────────── */

  useEffect(() => {
    const reset = () => {
      cachedRect.current = null
    }
    window.addEventListener('scroll', reset, { passive: true })
    window.addEventListener('resize', reset, { passive: true })
    return () => {
      window.removeEventListener('scroll', reset)
      window.removeEventListener('resize', reset)
    }
  }, [])

  /* ── Pointer handlers ──────────────────────────────────────────── */

  const onPointerDown = useCallback(
    (e: React.PointerEvent) => {
      if (!ready) return
      stopGlide()
      draggingRef.current = true
      ;(e.target as HTMLElement).setPointerCapture?.(e.pointerId)
      const now = performance.now()
      dragState.current = {
        active: true,
        x0: e.clientX,
        rot0: rotationMV.get(),
        lastX: e.clientX,
        lastT: now,
        prevX: e.clientX,
        prevT: now,
      }
      if (containerRef.current) containerRef.current.style.cursor = 'grabbing'
    },
    [ready, rotationMV, stopGlide],
  )

  const onPointerMove = useCallback(
    (e: React.PointerEvent) => {
      const ds = dragState.current

      if (ds.active) {
        rotationMV.set(ds.rot0 - (e.clientX - ds.x0) * dragSensitivity)
        ds.prevX = ds.lastX
        ds.prevT = ds.lastT
        ds.lastX = e.clientX
        ds.lastT = performance.now()
        return
      }

      // Mouse-follow tilt (only active if mouseTilt is enabled and tiltIntensity > 0)
      if (!ready || !mouseTilt || tiltIntensity <= 0) return
      const cx = e.clientX
      const cy = e.clientY

      if (rafRef.current) return
      rafRef.current = requestAnimationFrame(() => {
        rafRef.current = 0
        const el = containerRef.current
        if (!el) return
        let rect = cachedRect.current
        if (!rect) {
          rect = el.getBoundingClientRect()
          cachedRect.current = rect
        }
        const mouseNormY = -(((cy - rect.top) / rect.height) * 2 - 1)
        const mouseNormX = -(((cx - rect.left) / rect.width) * 2 - 1)
        tiltXMV.set(baseTiltX + mouseNormY * 5 * tiltIntensity)
        tiltYMV.set(mouseNormX * 3 * tiltIntensity)
      })
    },
    [rotationMV, tiltXMV, tiltYMV, ready, dragSensitivity, mouseTilt, tiltIntensity, baseTiltX],
  )

  const onPointerUp = useCallback(
    (e: React.PointerEvent) => {
      const ds = dragState.current
      if (!ds.active) return
      ds.active = false
      draggingRef.current = false
      ;(e.target as HTMLElement).releasePointerCapture?.(e.pointerId)

      const dt = ds.lastT - ds.prevT
      const vpx = dt > 0 ? (ds.lastX - ds.prevX) / dt : 0
      const vdeg = -vpx * dragSensitivity * 1000
      settle(vdeg)

      if (containerRef.current) containerRef.current.style.cursor = 'grab'
    },
    [settle, dragSensitivity],
  )

  const onPointerLeave = useCallback(() => {
    const ds = dragState.current
    if (ds.active) {
      ds.active = false
      draggingRef.current = false
      const dt = ds.lastT - ds.prevT
      const vpx = dt > 0 ? (ds.lastX - ds.prevX) / dt : 0
      const vdeg = -vpx * dragSensitivity * 1000
      settle(vdeg)
    }
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current)
      rafRef.current = 0
    }
    tiltXMV.set(baseTiltX)
    tiltYMV.set(0)
    if (containerRef.current) containerRef.current.style.cursor = 'grab'
  }, [tiltXMV, tiltYMV, settle, dragSensitivity, baseTiltX])

  /* ── Wheel support ─────────────────────────────────────────────── */

  const onWheel = useCallback(
    (e: React.WheelEvent) => {
      stopGlide()
      const delta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY
      rotationMV.set(rotationMV.get() + delta * WHEEL_SENSITIVITY)
      if (wheelSettleRef.current) window.clearTimeout(wheelSettleRef.current)
      wheelSettleRef.current = window.setTimeout(() => {
        settle(rotationMV.getVelocity())
      }, WHEEL_SETTLE_MS)
    },
    [rotationMV, settle, stopGlide],
  )

  /* ── Keyboard navigation ───────────────────────────────────────── */

  const rollBy = useCallback(
    (dir: number) => {
      if (angleStep === 0) return
      const current = Math.round(rotationMV.get() / angleStep) * angleStep
      glideTo(current + dir * angleStep, 0)
    },
    [rotationMV, angleStep, glideTo],
  )

  const onKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'ArrowRight') {
        e.preventDefault()
        rollBy(-1)
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault()
        rollBy(1)
      }
    },
    [rollBy],
  )

  /* ── Auto-rotate ───────────────────────────────────────────────── */

  useEffect(() => {
    if (!autoRotate || !ready || items.length === 0) return
    let raf = 0
    let last = performance.now()
    const tick = (now: number) => {
      const dt = (now - last) / 1000
      last = now
      if (!draggingRef.current && !hoverRef.current && !glideRef.current) {
        rotationMV.set(rotationMV.get() + autoRotateSpeed * angleStep * dt)
      }
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [autoRotate, autoRotateSpeed, ready, rotationMV, angleStep, items.length])

  /* ── Cleanup ───────────────────────────────────────────────────── */

  useEffect(() => {
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
      glideRef.current?.stop()
      if (wheelSettleRef.current) window.clearTimeout(wheelSettleRef.current)
    }
  }, [])

  /* ── Computed styles ───────────────────────────────────────────── */

  const ballContainerStyle = useMemo(() => {
    const scaleFactor = Math.max(0.2, perspective / 1200)
    const w = ballSize * scaleFactor
    const h = ballSize * scaleFactor
    return {
      position: 'absolute' as const,
      left: '50%',
      top: '50%',
      width: w,
      height: h,
      marginLeft: -w / 2,
      marginTop: -h / 2,
      transformStyle: 'preserve-3d' as const,
      WebkitTransformStyle: 'preserve-3d' as const,
    }
  }, [perspective, ballSize])

  const outerStyle = useMemo(
    () => ({
      position: 'relative' as const,
      width: '100%',
      height: '100%',
      backgroundColor: 'transparent',
      overflow: 'hidden' as const,
      cursor: ready ? 'grab' : 'default',
      userSelect: 'none' as const,
      perspective: `${perspective}px`,
      WebkitPerspective: `${perspective}px`,
      perspectiveOrigin: '50% 50%',
      WebkitPerspectiveOrigin: '50% 50%',
      contain: 'layout style paint' as const,
      touchAction: 'none' as const,
    }),
    [ready, perspective],
  )

  const tiltStyle = useMemo(
    () => ({
      ...preserve3dStyle,
      rotateX: springTiltX,
      rotateY: springTiltY,
    }),
    [springTiltX, springTiltY],
  )

  const rotateStyle = useMemo(
    () => ({
      ...preserve3dStyle,
      rotateY: rotationMV,
    }),
    [rotationMV],
  )

  /* ── Render ────────────────────────────────────────────────────── */

  return (
    <div className={cn('relative flex size-full min-h-[480px] items-center justify-center overflow-hidden', className)}>
      <div
        ref={containerRef}
        role="application"
        aria-roledescription="carousel"
        tabIndex={0}
        className="size-full min-h-[480px] outline-none focus-visible:ring-2 focus-visible:ring-primary/20"
        style={outerStyle}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerLeave={onPointerLeave}
        onPointerCancel={onPointerUp}
        onWheel={onWheel}
        onKeyDown={onKeyDown}
        onPointerEnter={() => {
          hoverRef.current = true
        }}
      >
        {/* Tilt wrapper */}
        <motion.div style={tiltStyle}>
          {/* Ball size container */}
          <div style={ballContainerStyle}>
            {/* Rotation wrapper */}
            <motion.div style={rotateStyle}>
              {items.map((item, idx) => (
                <CarouselItem
                  key={item.id ?? `item-${idx}`}
                  item={item}
                  index={idx}
                  angleStep={angleStep}
                  radiusMV={radiusMV}
                  isVisible={isVisible}
                  borderRadius={borderRadius}
                  entryDelay={entryDelay}
                  bounce={bounce}
                  renderItem={renderItem}
                />
              ))}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
