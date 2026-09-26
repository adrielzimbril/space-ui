'use client'

import * as React from 'react'
import { motion, useScroll, useTransform, type MotionValue } from 'motion/react'
import { cn } from '@/registry/lib/utils'

export type ScrollTextRevealSplitBy = 'character' | 'word'

export interface ScrollTextRevealProps extends React.HTMLAttributes<HTMLElement> {
  /** The text content to reveal on scroll. Can also be passed as string children. */
  text?: string
  /** Content passed as children. If a string is provided, it is used as the text. */
  children?: React.ReactNode
  /** Splitting strategy: 'character' or 'word'. @default "character" */
  splitBy?: ScrollTextRevealSplitBy
  /** The HTML tag to render. @default "p" */
  as?: React.ElementType
  /** Initial opacity of unrevealed text. @default 0.18 */
  inactiveOpacity?: number
  /** Final opacity of revealed text. @default 1 */
  activeOpacity?: number
  /** Optional custom initial color (overrides opacity transition if paired with toColor). */
  fromColor?: string
  /** Optional custom final color (overrides opacity transition if paired with fromColor). */
  toColor?: string
  /** Portion of scroll progress (0-1) where reveal completes. @default 0.85 */
  revealRatio?: number
  /** Scroll target offset for motion useScroll. @default ["start 0.9", "center 0.5"] */
  offset?: any
  /** Optional scrollable container ref or element. If not passed, auto-detects nearest scroll parent. */
  scrollContainer?: React.RefObject<HTMLElement | null> | HTMLElement | null
  /** ClassName applied to each animated character/word token. */
  segmentClassName?: string
}

function getScrollParent(node: HTMLElement | null): HTMLElement | null {
  if (!node || typeof window === 'undefined') return null
  let parent = node.parentElement
  while (parent && parent !== document.body && parent !== document.documentElement) {
    const { overflowY } = window.getComputedStyle(parent)
    if (overflowY === 'auto' || overflowY === 'scroll') {
      return parent
    }
    parent = parent.parentElement
  }
  return null
}

interface TokenProps {
  token: string
  index: number
  total: number
  progress: MotionValue<number>
  inactiveOpacity: number
  activeOpacity: number
  revealRatio: number
  fromColor?: string
  toColor?: string
  segmentClassName?: string
  isWord: boolean
}

function Token({
  token,
  index,
  total,
  progress,
  inactiveOpacity,
  activeOpacity,
  revealRatio,
  fromColor,
  toColor,
  segmentClassName,
  isWord,
}: TokenProps) {
  const step = revealRatio / Math.max(total, 1)
  const start = index * step
  const end = Math.min(revealRatio, start + step * 1.5)

  const color = useTransform(
    progress,
    [start, end],
    fromColor && toColor ? [fromColor, toColor] : ['transparent', 'transparent'],
  )
  const opacity = useTransform(progress, [start, end], [inactiveOpacity, activeOpacity])

  const style = fromColor && toColor ? { color } : { opacity }

  if (isWord) {
    return (
      <React.Fragment>
        <span className="inline-block whitespace-nowrap">
          <motion.span style={style} className={cn('inline', segmentClassName)}>
            {token}
          </motion.span>
        </span>
        {index < total - 1 ? ' ' : ''}
      </React.Fragment>
    )
  }

  if (token === ' ') {
    return <span> </span>
  }

  return (
    <motion.span style={style} className={cn('inline', segmentClassName)}>
      {token}
    </motion.span>
  )
}

export const ScrollTextReveal = React.forwardRef<HTMLElement, ScrollTextRevealProps>(function ScrollTextReveal(
  {
    text: textProp,
    children,
    splitBy = 'character',
    as: Component = 'p',
    className,
    segmentClassName,
    inactiveOpacity = 0.18,
    activeOpacity = 1,
    fromColor,
    toColor,
    revealRatio = 0.85,
    offset = ['start 0.9', 'center 0.5'],
    scrollContainer,
    ...props
  },
  forwardedRef,
) {
  const containerRef = React.useRef<HTMLElement | null>(null)
  const [scrollParent, setScrollParent] = React.useState<HTMLElement | null>(null)

  const rawText = textProp ?? (typeof children === 'string' ? children : '')

  const tokens = React.useMemo(() => {
    if (!rawText) return []
    if (splitBy === 'word') {
      return rawText.trim().split(/\s+/)
    }
    return rawText.split('')
  }, [rawText, splitBy])

  React.useEffect(() => {
    if (scrollContainer instanceof HTMLElement) {
      setScrollParent(scrollContainer)
      return
    }
    if (scrollContainer && 'current' in scrollContainer && scrollContainer.current) {
      setScrollParent(scrollContainer.current)
      return
    }
    const detected = getScrollParent(containerRef.current)
    if (detected) {
      setScrollParent(detected)
    }
  }, [scrollContainer])

  const scrollContainerRef = React.useRef<HTMLElement | null>(null)
  scrollContainerRef.current = scrollParent

  const { scrollYProgress } = useScroll({
    target: containerRef,
    container: scrollParent ? (scrollContainerRef as React.RefObject<HTMLElement>) : undefined,
    offset,
  })

  const setRef = React.useCallback(
    (node: HTMLElement | null) => {
      containerRef.current = node
      if (typeof forwardedRef === 'function') {
        forwardedRef(node)
      } else if (forwardedRef) {
        ;(forwardedRef as React.MutableRefObject<HTMLElement | null>).current = node
      }
    },
    [forwardedRef],
  )

  const isWord = splitBy === 'word'

  return (
    <Component ref={setRef} className={cn('relative leading-relaxed', className)} {...(props as any)}>
      {tokens.map((token, i) => (
        <Token
          key={`${token}-${i}`}
          token={token}
          index={i}
          total={tokens.length}
          progress={scrollYProgress}
          inactiveOpacity={inactiveOpacity}
          activeOpacity={activeOpacity}
          revealRatio={revealRatio}
          fromColor={fromColor}
          toColor={toColor}
          segmentClassName={segmentClassName}
          isWord={isWord}
        />
      ))}
    </Component>
  )
})

ScrollTextReveal.displayName = 'ScrollTextReveal'

export default ScrollTextReveal
