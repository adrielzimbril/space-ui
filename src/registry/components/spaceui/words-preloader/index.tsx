'use client'

import { Fragment, useEffect, useRef, useState, type ReactNode } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { cn } from '@/registry/lib/utils'

const DEFAULT_WORDS = ['Hello', 'bonjour', 'Ciao', 'Olà', 'やあ', 'Hallå', 'Guten tag', 'ਸਤਿ ਸ੍ਰੀ ਅਕਾਲ ਜੀ']

export type WordsPreloaderProps = {
  words?: string[]
  duration?: number
  className?: string
  children?: ReactNode
}

export function WordsPreloader({ words = DEFAULT_WORDS, duration = 2000, className, children }: WordsPreloaderProps) {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const timer = window.setTimeout(() => setIsLoading(false), duration)
    return () => window.clearTimeout(timer)
  }, [duration])

  return (
    <div className={cn('relative h-full min-h-80 w-full overflow-hidden', className)}>
      <AnimatePresence mode="wait">{isLoading ? <PreloaderContent words={words} /> : null}</AnimatePresence>
      <div className="flex h-full min-h-80 w-full items-center justify-center">{children ?? 'Your landing page'}</div>
    </div>
  )
}

function PreloaderContent({ words }: { words: string[] }) {
  const [index, setIndex] = useState(0)
  const rootRef = useRef<HTMLDivElement>(null)
  const [dimension, setDimension] = useState({ width: 0, height: 0 })

  useEffect(() => {
    const el = rootRef.current
    if (!el) return
    const measure = () => setDimension({ width: el.clientWidth, height: el.clientHeight })
    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  useEffect(() => {
    if (index >= words.length - 1) return
    const timer = window.setTimeout(() => setIndex((i) => i + 1), index === 0 ? 1000 : 150)
    return () => window.clearTimeout(timer)
  }, [index, words.length])

  const initialPath = `M0 0 L${dimension.width} 0 L${dimension.width} ${dimension.height} Q${dimension.width / 2} ${dimension.height + 300} 0 ${dimension.height}  L0 0`
  const targetPath = `M0 0 L${dimension.width} 0 L${dimension.width} ${dimension.height} Q${dimension.width / 2} ${dimension.height} 0 ${dimension.height}  L0 0`

  return (
    <motion.div
      ref={rootRef}
      variants={{
        initial: { top: 0 },
        exit: {
          top: '-100%',
          transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 0.2 },
        },
      }}
      initial="initial"
      exit="exit"
      className="absolute inset-0 z-20 flex items-center justify-center bg-background"
    >
      {dimension.width > 0 ? (
        <Fragment>
          <motion.p
            variants={{
              initial: { opacity: 0 },
              enter: { opacity: 0.75, transition: { duration: 1, delay: 0.2 } },
            }}
            className="absolute z-10 text-5xl font-semibold tracking-tighter text-foreground md:text-6xl"
            initial="initial"
            animate="enter"
          >
            {words[index]}
          </motion.p>
          <svg className="absolute top-0 h-[calc(100%+300px)] w-full">
            <motion.path
              variants={{
                initial: {
                  d: initialPath,
                  transition: { duration: 0.7, ease: [0.76, 0, 0.24, 1] },
                },
                exit: {
                  d: targetPath,
                  transition: { duration: 0.7, ease: [0.76, 0, 0.24, 1], delay: 0.3 },
                },
              }}
              initial="initial"
              exit="exit"
              className="fill-background"
            />
          </svg>
        </Fragment>
      ) : null}
    </motion.div>
  )
}
