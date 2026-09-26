'use client'

import * as React from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'
import { useInView } from '@/registry/hooks/animation/use-in-view'

gsap.registerPlugin(ScrollTrigger, SplitText)

export type GooeyTextRevealMode = 'immediate' | 'scroll' | 'scrub'
export type GooeyTextRevealScroller = string | HTMLElement | React.RefObject<HTMLElement | null>
export type GooeyTextRevealQueueMode = 'cascade' | 'sequence'

export interface GooeyTextRevealProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'children'> {
  /** Text-bearing elements to split into animated lines. */
  children: React.ReactNode
  /** Controls when the reveal runs. @default "immediate" */
  mode?: GooeyTextRevealMode
  /** Delay before non-scrub animations begin, in seconds. @default 0 */
  delay?: number
  /** Reveal duration for each line, in seconds. @default 1.5 */
  duration?: number
  /** Delay between consecutive lines, in seconds. @default 0.1 */
  stagger?: number
  /** Starting blur measured in em units. @default 0.35 */
  blurAmount?: number
  /** GSAP easing expression used by the reveal tween. @default "power3.out" */
  ease?: string
  /** Trigger position for scroll/scrub modes (e.g. 'top 80%'). @default "top 80%" */
  start?: string
  /** ScrollTrigger end position for scrub mode. @default "bottom 75%" */
  end?: string
  /** Optional scrollable ancestor used instead of the browser viewport. */
  scroller?: GooeyTextRevealScroller
  /** Whether a scroll reveal should only run once. @default true */
  once?: boolean
  /**
   * Priority order when multiple elements enter the viewport simultaneously.
   * Lower numbers have higher priority (e.g. 1 before 2).
   * If unspecified, elements are automatically prioritized by vertical screen position (top to bottom).
   */
  priority?: number
  /**
   * Queue orchestration mode when multiple elements enter view together.
   * - 'cascade': starts next element after a short stagger delay (@see queueDelay).
   * - 'sequence': waits for the current element's duration before starting the next.
   * @default "cascade"
   */
  queueMode?: GooeyTextRevealQueueMode
  /**
   * Stagger delay in seconds between queued elements in cascade mode.
   * @default 0.35
   */
  queueDelay?: number
  /**
   * Whether to coordinate multiple simultaneously visible elements with a priority queue.
   * @default true
   */
  coordinated?: boolean
  /** Optional external inView control to override the internal useInView hook. */
  inView?: boolean
  /** Disables splitting and animation while preserving the content. */
  disabled?: boolean
  /** Called after the reveal completes. */
  onComplete?: () => void
}

const LINE_EDGE_BLUR = 0.4

const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? React.useLayoutEffect : React.useEffect

interface QueueItem {
  id: string
  priority: number
  top: number
  play: () => void
  duration: number
  queueMode: GooeyTextRevealQueueMode
  queueDelay: number
  hasStarted: boolean
}

class RevealQueueManager {
  private items: QueueItem[] = []
  private timer: ReturnType<typeof setTimeout> | null = null
  private batchScheduled = false
  private isProcessing = false

  register(item: Omit<QueueItem, 'hasStarted'>) {
    const existingIndex = this.items.findIndex((i) => i.id === item.id)
    if (existingIndex >= 0) {
      if (this.items[existingIndex].hasStarted) return
      this.items[existingIndex] = { ...item, hasStarted: false }
    } else {
      this.items.push({ ...item, hasStarted: false })
    }

    if (!this.batchScheduled) {
      this.batchScheduled = true
      const scheduleFn = () => {
        this.batchScheduled = false
        this.schedule()
      }
      if (typeof queueMicrotask === 'function') {
        queueMicrotask(scheduleFn)
      } else {
        Promise.resolve().then(scheduleFn)
      }
    }
  }

  unregister(id: string) {
    const index = this.items.findIndex((i) => i.id === id)
    if (index >= 0) {
      const wasFirst = index === 0 && !this.items[0].hasStarted
      this.items.splice(index, 1)
      if (wasFirst && this.timer) {
        clearTimeout(this.timer)
        this.timer = null
        this.isProcessing = false
        this.schedule()
      }
    }
  }

  private schedule() {
    if (this.isProcessing || this.items.length === 0) return

    const pending = this.items.filter((i) => !i.hasStarted)
    if (pending.length === 0) return

    // Sort pending items:
    // 1. priority (ascending: e.g. 1 before 2)
    // 2. top position (ascending: higher on screen first)
    pending.sort((a, b) => {
      if (a.priority !== b.priority) {
        return a.priority - b.priority
      }
      return a.top - b.top
    })

    const started = this.items.filter((i) => i.hasStarted)
    this.items = [...started, ...pending]

    this.processNext()
  }

  private processNext() {
    const nextItem = this.items.find((i) => !i.hasStarted)
    if (!nextItem) {
      this.isProcessing = false
      return
    }

    this.isProcessing = true
    nextItem.hasStarted = true

    // Trigger reveal animation
    nextItem.play()

    const delayMs =
      nextItem.queueMode === 'sequence'
        ? Math.max(100, nextItem.duration * 1000)
        : Math.max(50, nextItem.queueDelay * 1000)

    this.timer = setTimeout(() => {
      this.timer = null
      this.isProcessing = false
      this.items = this.items.filter((i) => i !== nextItem)
      this.schedule()
    }, delayMs)
  }
}

const revealQueue = new RevealQueueManager()

function wrapLine(line: HTMLElement) {
  const inner = document.createElement('span')
  inner.dataset.gooeyRevealInner = ''
  inner.style.display = 'inline-block'
  inner.style.willChange = 'filter'

  while (line.firstChild) {
    inner.appendChild(line.firstChild)
  }

  line.appendChild(inner)
  return inner
}

function getRevealTargets(container: HTMLDivElement) {
  const explicit = Array.from(container.querySelectorAll<HTMLElement>('[data-gooey-reveal-item]'))
  if (explicit.length > 0) return explicit

  const directChildren = Array.from(container.children).filter(
    (child): child is HTMLElement => child instanceof HTMLElement,
  )

  return directChildren.length > 0 ? directChildren : [container]
}

function parseStartToRootMargin(start?: string): string {
  if (!start) return '0px 0px -20% 0px'
  const parts = start.trim().split(/\s+/)
  const triggerPoint = parts[1] || parts[0] || '80%'

  if (triggerPoint === 'bottom') return '0px 0px 0px 0px'
  if (triggerPoint === 'center') return '0px 0px -50% 0px'
  if (triggerPoint === 'top') return '0px 0px -100% 0px'

  const percentMatch = triggerPoint.match(/^(\d+(?:\.\d+)?)%$/)
  if (percentMatch) {
    const val = parseFloat(percentMatch[1])
    const bottomOffset = Math.max(0, Math.min(100, 100 - val))
    return `0px 0px -${bottomOffset}% 0px`
  }

  const pxMatch = triggerPoint.match(/^(-?\d+)px$/)
  if (pxMatch) {
    return `0px 0px ${pxMatch[1]}px 0px`
  }

  return '0px 0px -20% 0px'
}

function getScrollParent(node: HTMLElement | null): HTMLElement | Window {
  if (!node || typeof window === 'undefined') return window
  let parent = node.parentElement
  while (parent && parent !== document.body && parent !== document.documentElement) {
    const { overflowY } = window.getComputedStyle(parent)
    if (overflowY === 'auto' || overflowY === 'scroll') {
      return parent
    }
    parent = parent.parentElement
  }
  return window
}

export const GooeyTextReveal = React.forwardRef<HTMLDivElement, GooeyTextRevealProps>(function GooeyTextReveal(
  {
    children,
    mode = 'immediate',
    delay = 0,
    duration = 1.5,
    stagger = 0.1,
    blurAmount = 0.35,
    ease = 'power3.out',
    start = 'top 80%',
    end = 'bottom 75%',
    scroller,
    once = true,
    priority,
    queueMode = 'cascade',
    queueDelay = 0.35,
    coordinated = true,
    inView: externalInView,
    disabled = false,
    onComplete,
    ...props
  },
  forwardedRef,
) {
  const containerRef = React.useRef<HTMLDivElement>(null)
  const reactId = React.useId()
  const filterId = React.useMemo(() => `gooey-text-reveal-${reactId.replace(/:/g, '')}`, [reactId])

  const playAnimationRef = React.useRef<(() => void) | null>(null)
  const reverseAnimationRef = React.useRef<(() => void) | null>(null)
  const hasRevealedRef = React.useRef(false)

  const resolvedPriority = React.useMemo(() => priority ?? 1000, [priority])

  const resolvedRoot = React.useMemo(() => {
    if (typeof scroller === 'string') {
      return typeof document !== 'undefined' ? (document.querySelector<HTMLElement>(scroller) ?? null) : null
    }
    if (scroller instanceof HTMLElement) return scroller
    if (scroller && 'current' in scroller && scroller.current instanceof HTMLElement) return scroller.current
    return null
  }, [scroller])

  const rootMargin = React.useMemo(() => parseStartToRootMargin(start), [start])

  // Space UI Registry hook integration
  const [inViewCallbackRef] = useInView({
    once,
    margin: rootMargin,
    root: resolvedRoot,
    skip: mode !== 'scroll' || disabled || typeof externalInView === 'boolean',
    onChange: (isIntersecting) => {
      if (isIntersecting) {
        if (coordinated) {
          const top = containerRef.current?.getBoundingClientRect().top ?? 0
          revealQueue.register({
            id: reactId,
            priority: resolvedPriority,
            top,
            play: () => playAnimationRef.current?.(),
            duration,
            queueMode,
            queueDelay,
          })
        } else {
          playAnimationRef.current?.()
        }
      } else {
        if (coordinated) {
          revealQueue.unregister(reactId)
        }
        if (!once && hasRevealedRef.current) {
          reverseAnimationRef.current?.()
        }
      }
    },
  })

  const setContainerRef = React.useCallback(
    (node: HTMLDivElement | null) => {
      containerRef.current = node
      inViewCallbackRef(node)
      if (typeof forwardedRef === 'function') forwardedRef(node)
      else if (forwardedRef) forwardedRef.current = node
    },
    [forwardedRef, inViewCallbackRef],
  )

  useIsomorphicLayoutEffect(() => {
    const container = containerRef.current
    if (!container || disabled) return

    const reducedMotion = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reducedMotion) return

    let splits: SplitText[] = []
    let tween: gsap.core.Tween | null = null
    let delayedCall: gsap.core.Tween | null = null
    let animationFrame = 0
    let measuredWidth = container.getBoundingClientRect().width
    let disposed = false

    const revert = () => {
      delayedCall?.kill()
      delayedCall = null
      tween?.scrollTrigger?.kill()
      tween?.kill()
      tween = null
      splits.forEach((split) => split.revert())
      splits = []
    }

    const build = () => {
      if (disposed) return
      revert()

      const layers: HTMLElement[] = []

      getRevealTargets(container).forEach((target) => {
        const split = SplitText.create(target, {
          type: 'lines',
          linesClass: 'gooey-text-reveal-line',
          aria: 'auto',
        })

        split.lines.forEach((line) => {
          const lineElement = line as HTMLElement
          lineElement.style.display = 'block'
          lineElement.style.filter = `url(#${filterId}) blur(${LINE_EDGE_BLUR}px)`
          lineElement.style.willChange = 'filter'
          layers.push(wrapLine(lineElement))
        })

        splits.push(split)
      })

      if (layers.length === 0) return

      if (hasRevealedRef.current && once) {
        gsap.set(layers, { filter: 'blur(0em)' })
        return
      }

      gsap.set(layers, { filter: `blur(${blurAmount}em)` })

      if (mode === 'scrub') {
        const resolvedScroller =
          typeof scroller === 'string' || scroller instanceof HTMLElement
            ? scroller
            : (scroller?.current ?? getScrollParent(container))

        tween = gsap.to(layers, {
          filter: 'blur(0em)',
          duration,
          ease,
          stagger,
          onComplete,
          scrollTrigger: {
            trigger: container,
            start,
            end,
            scrub: true,
            invalidateOnRefresh: true,
            scroller: resolvedScroller,
          },
        })
        ScrollTrigger.refresh()
      } else if (mode === 'scroll') {
        const animTween = gsap.to(layers, {
          filter: 'blur(0em)',
          duration,
          ease,
          stagger,
          paused: true,
          onComplete: () => {
            hasRevealedRef.current = true
            onComplete?.()
          },
        })
        tween = animTween

        const playAnimation = () => {
          if (disposed) return
          hasRevealedRef.current = true
          if (delay > 0) {
            delayedCall?.kill()
            delayedCall = gsap.delayedCall(delay, () => {
              if (!disposed) animTween.play()
            })
          } else {
            animTween.play()
          }
        }

        const reverseAnimation = () => {
          delayedCall?.kill()
          delayedCall = null
          animTween.reverse()
        }

        playAnimationRef.current = playAnimation
        reverseAnimationRef.current = reverseAnimation

        if (typeof externalInView === 'boolean') {
          if (externalInView) {
            if (coordinated) {
              const top = container.getBoundingClientRect().top
              revealQueue.register({
                id: reactId,
                priority: resolvedPriority,
                top,
                play: playAnimation,
                duration,
                queueMode,
                queueDelay,
              })
            } else {
              playAnimation()
            }
          } else {
            if (coordinated) {
              revealQueue.unregister(reactId)
            }
            if (!once && hasRevealedRef.current) {
              reverseAnimation()
            }
          }
        }
      } else {
        // Immediate mode
        const animTween = gsap.to(layers, {
          filter: 'blur(0em)',
          duration,
          ease,
          stagger,
          paused: delay > 0,
          onComplete: () => {
            hasRevealedRef.current = true
            onComplete?.()
          },
        })
        tween = animTween

        if (delay > 0) {
          delayedCall = gsap.delayedCall(delay, () => {
            if (!disposed) animTween.play()
          })
        }
      }
    }

    build()

    if (document.fonts && document.fonts.status !== 'loaded') {
      document.fonts.ready.then(() => {
        if (!disposed) build()
      })
    }

    const resizeObserver = new ResizeObserver(([entry]) => {
      const nextWidth = entry.contentRect.width
      if (Math.abs(nextWidth - measuredWidth) < 0.5) return

      measuredWidth = nextWidth
      window.cancelAnimationFrame(animationFrame)
      animationFrame = window.requestAnimationFrame(build)
    })

    resizeObserver.observe(container)

    return () => {
      disposed = true
      revealQueue.unregister(reactId)
      playAnimationRef.current = null
      reverseAnimationRef.current = null
      resizeObserver.disconnect()
      window.cancelAnimationFrame(animationFrame)
      revert()
    }
  }, [
    mode,
    delay,
    duration,
    stagger,
    blurAmount,
    ease,
    start,
    end,
    scroller,
    once,
    disabled,
    onComplete,
    filterId,
    children,
    resolvedPriority,
    queueMode,
    queueDelay,
    coordinated,
    reactId,
  ])

  // External inView listener if controlled from outside
  React.useEffect(() => {
    if (typeof externalInView !== 'boolean' || mode !== 'scroll') return
    if (externalInView) {
      if (coordinated) {
        const top = containerRef.current?.getBoundingClientRect().top ?? 0
        revealQueue.register({
          id: reactId,
          priority: resolvedPriority,
          top,
          play: () => playAnimationRef.current?.(),
          duration,
          queueMode,
          queueDelay,
        })
      } else {
        playAnimationRef.current?.()
      }
    } else {
      if (coordinated) {
        revealQueue.unregister(reactId)
      }
      if (!once && hasRevealedRef.current) {
        reverseAnimationRef.current?.()
      }
    }
  }, [externalInView, mode, once, coordinated, resolvedPriority, duration, queueMode, queueDelay, reactId])

  return (
    <>
      <div ref={setContainerRef} {...props}>
        {children}
      </div>

      <svg
        aria-hidden="true"
        focusable="false"
        width="0"
        height="0"
        style={{ position: 'absolute', pointerEvents: 'none' }}
      >
        <defs>
          <filter id={filterId} x="-50%" y="-50%" width="200%" height="200%">
            <feColorMatrix in="SourceGraphic" type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 255 -140" />
          </filter>
        </defs>
      </svg>
    </>
  )
})

GooeyTextReveal.displayName = 'GooeyTextReveal'

export default GooeyTextReveal
