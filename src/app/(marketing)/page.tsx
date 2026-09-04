'use client'

import { Features } from '@/components/marketing/landing/features'
import { Hero } from '@/components/marketing/landing/hero'
import { cn } from '@/registry/lib/utils'
import { motion } from 'motion/react'
import { useEffect, useState } from 'react'

const CONTENT_VARIANTS = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: { type: 'spring', stiffness: 100, damping: 30 },
  },
} as const

export default function HomePage() {
  const [transition, setTransition] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setTransition(true), 1250)
    const timer2 = setTimeout(() => setIsLoaded(true), 2500)
    return () => {
      clearTimeout(timer)
      clearTimeout(timer2)
    }
  }, [])

  return (
    <main className={cn('relative h-dvh', !isLoaded && 'overflow-y-hidden')}>
      <div className="h-dvh w-full flex flex-col justify-between">
        {transition && (
          <>
            <div>
              <motion.div
                variants={CONTENT_VARIANTS}
                initial="hidden"
                animate={transition ? 'visible' : 'hidden'}
                className="w-full"
              >
                <Hero key={String(transition)} />
              </motion.div>

              <Features />
            </div>
          </>
        )}
      </div>
    </main>
  )
}
