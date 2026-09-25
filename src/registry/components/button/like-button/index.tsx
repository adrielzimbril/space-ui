'use client'

import * as React from 'react'
import NumberFlow from '@number-flow/react'
import { motion } from 'motion/react'
import { Button, type ButtonProps } from '@/registry/components/button/button-squircle'
import { cn } from '@/registry/lib/utils'

const CIRCLE_RADIUS = 20
const BURST_RADIUS = 32
const START_RADIUS = 4
const PATH_SCALE_FACTOR = 0.8

const PARTICLE_COLORS = [
  { from: '#9EC9F5', to: '#9ED8C6' },
  { from: '#91D3F7', to: '#9AE4CF' },
  { from: '#DC93CF', to: '#E3D36B' },
  { from: '#CF8EEF', to: '#CBEB98' },
  { from: '#87E9C6', to: '#1FCC93' },
  { from: '#A7ECD0', to: '#9AE4CF' },
  { from: '#87E9C6', to: '#A635D9' },
  { from: '#D58EB3', to: '#E0B6F5' },
  { from: '#F48BA2', to: '#CF8EEF' },
  { from: '#91D3F7', to: '#A635D9' },
  { from: '#CF8EEF', to: '#CBEB98' },
  { from: '#87E9C6', to: '#A635D9' },
  { from: '#9EC9F5', to: '#9ED8C6' },
  { from: '#91D3F7', to: '#9AE4CF' },
]

function LikeRipple() {
  return (
    <svg
      className="pointer-events-none absolute -top-3 -left-3"
      style={{ width: CIRCLE_RADIUS * 2, height: CIRCLE_RADIUS * 2 }}
    >
      <motion.circle
        cx={CIRCLE_RADIUS}
        cy={CIRCLE_RADIUS}
        r={CIRCLE_RADIUS - 2}
        fill="none"
        initial={{ scale: 0, stroke: '#E5214A', strokeWidth: CIRCLE_RADIUS * 2 }}
        animate={{ scale: 1, stroke: '#CC8EF5', strokeWidth: 0 }}
        transition={{ duration: 0.4, ease: [0.33, 1, 0.68, 1] }}
      />
    </svg>
  )
}

function LikeParticle({
  fromColor,
  toColor,
  index,
  total,
}: {
  fromColor: string
  toColor: string
  index: number
  total: number
}) {
  const angle = (index / total) * 360 + 45
  const radians = (angle * Math.PI) / 180
  const degreeShift = (13 * Math.PI) / 180

  const randomFactor = React.useMemo(() => 0.85 + Math.random() * 0.3, [])
  const duration = React.useMemo(() => 500 + Math.random() * 200, [])
  const burstDistance = BURST_RADIUS * randomFactor

  return (
    <motion.div
      className="pointer-events-none absolute size-1.5 rounded-full"
      style={{ backgroundColor: fromColor, opacity: 0 }}
      initial={{
        opacity: 0,
        scale: 1,
        x: Math.cos(radians) * START_RADIUS * PATH_SCALE_FACTOR,
        y: Math.sin(radians) * START_RADIUS * PATH_SCALE_FACTOR,
        backgroundColor: fromColor,
      }}
      animate={{
        opacity: [0, 1, 1, 0],
        x: Math.cos(radians + degreeShift) * burstDistance * PATH_SCALE_FACTOR,
        y: Math.sin(radians + degreeShift) * burstDistance * PATH_SCALE_FACTOR,
        scale: 0,
        backgroundColor: toColor,
      }}
      transition={{
        opacity: { times: [0, 0.01, 0.99, 1], duration: duration / 1000, delay: 0.4 },
        x: { duration: duration / 1000, ease: [0.23, 1, 0.32, 1], delay: 0.3 },
        y: { duration: duration / 1000, ease: [0.23, 1, 0.32, 1], delay: 0.3 },
        scale: { duration: duration / 1000, ease: [0.55, 0.085, 0.68, 0.53], delay: 0.3 },
        backgroundColor: { duration: duration / 1000, delay: 0.3 },
      }}
    />
  )
}

function LikeBurst() {
  return (
    <div className="pointer-events-none absolute -top-3 -left-3 grid size-10 place-items-center">
      {PARTICLE_COLORS.map((colors, index) => (
        <LikeParticle
          key={index}
          fromColor={colors.from}
          toColor={colors.to}
          index={index}
          total={PARTICLE_COLORS.length}
        />
      ))}
    </div>
  )
}

function LikeHeartIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M16.44 3.09961C14.63 3.09961 13.01 3.97961 12 5.32961C10.99 3.97961 9.37 3.09961 7.56 3.09961C4.49 3.09961 2 5.59961 2 8.68961C2 9.87961 2.19 10.9796 2.52 11.9996C4.1 16.9996 8.97 19.9896 11.38 20.8096C11.72 20.9296 12.28 20.9296 12.62 20.8096C15.03 19.9896 19.9 16.9996 21.48 11.9996C21.81 10.9796 22 9.87961 22 8.68961C22 5.59961 19.51 3.09961 16.44 3.09961Z" />
    </svg>
  )
}

export interface LikeButtonProps extends Omit<ButtonProps, 'onClick'> {
  className?: string
  initialCount?: number
  defaultLiked?: boolean
  onLikedChange?: (liked: boolean, count: number) => void
}

export const LikeButton = React.forwardRef<HTMLButtonElement, LikeButtonProps>(
  (
    {
      className,
      initialCount = 0,
      defaultLiked = false,
      onLikedChange,
      variant = 'outline',
      size = 'sm',
      squircle = true,
      ...props
    },
    ref,
  ) => {
    const [likeCount, setLikeCount] = React.useState(initialCount)
    const [isLiked, setIsLiked] = React.useState(defaultLiked)
    const [isAnimating, setIsAnimating] = React.useState(false)

    const toggleLike = () => {
      if (isLiked) {
        setLikeCount((count) => Math.max(0, count - 1))
        setIsLiked(false)
        onLikedChange?.(false, Math.max(0, likeCount - 1))
        return
      }

      const nextCount = likeCount + 1
      setLikeCount(nextCount)
      setIsLiked(true)
      setIsAnimating(true)
      onLikedChange?.(true, nextCount)
    }

    return (
      <Button
        ref={ref}
        type="button"
        variant={variant}
        size={size}
        squircle={squircle}
        className={cn('relative h-8 cursor-pointer gap-1.5 px-2.5 select-none', className)}
        onClick={toggleLike}
        aria-pressed={isLiked}
        aria-label={isLiked ? 'Unlike' : 'Like'}
        {...props}
      >
        <div className="relative">
          {isAnimating && <LikeRipple />}
          {isAnimating && <LikeBurst />}
          {isAnimating ? (
            <motion.div
              key="animating-heart"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 300, damping: 10, delay: 0.3 }}
              onAnimationComplete={() => setIsAnimating(false)}
            >
              <LikeHeartIcon className="text-red-500" />
            </motion.div>
          ) : (
            <LikeHeartIcon className={isLiked ? 'text-red-500' : 'text-inherit'} />
          )}
        </div>

        <span className="min-w-3">
          <NumberFlow value={likeCount} />
          <span className="sr-only"> likes</span>
        </span>
      </Button>
    )
  },
)

LikeButton.displayName = 'LikeButton'
