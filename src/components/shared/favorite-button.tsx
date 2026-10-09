'use client'

import * as React from 'react'
import { motion } from 'motion/react'
import { Heart as ReiconHeart } from 'reicon-react'
import { Button, type ButtonProps } from '@/registry/components/button/button-squircle'
import { useFavorites, prettify } from '@/components/providers/favorites-provider'
import { bloomSound } from '@/components/providers/sound-provider'
import { cn } from '@/registry/lib/utils'

const CIRCLE_RADIUS = 16
const BURST_RADIUS = 26
const START_RADIUS = 3
const PATH_SCALE_FACTOR = 0.75

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
]

function HeartRipple() {
  return (
    <svg
      className="pointer-events-none absolute -top-2.5 -left-2.5"
      style={{ width: CIRCLE_RADIUS * 2, height: CIRCLE_RADIUS * 2 }}
    >
      <motion.circle
        cx={CIRCLE_RADIUS}
        cy={CIRCLE_RADIUS}
        r={CIRCLE_RADIUS - 2}
        fill="none"
        initial={{ scale: 0, stroke: '#f43f5e', strokeWidth: CIRCLE_RADIUS * 2 }}
        animate={{ scale: 1, stroke: '#c084fc', strokeWidth: 0 }}
        transition={{ duration: 0.35, ease: [0.33, 1, 0.68, 1] }}
      />
    </svg>
  )
}

function HeartParticle({
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
  const duration = React.useMemo(() => 450 + Math.random() * 150, [])
  const burstDistance = BURST_RADIUS * randomFactor

  return (
    <motion.div
      className="pointer-events-none absolute size-1 rounded-full"
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
        opacity: { times: [0, 0.01, 0.99, 1], duration: duration / 1000, delay: 0.25 },
        x: { duration: duration / 1000, ease: [0.23, 1, 0.32, 1], delay: 0.2 },
        y: { duration: duration / 1000, ease: [0.23, 1, 0.32, 1], delay: 0.2 },
        scale: { duration: duration / 1000, ease: [0.55, 0.085, 0.68, 0.53], delay: 0.2 },
        backgroundColor: { duration: duration / 1000, delay: 0.2 },
      }}
    />
  )
}

function HeartBurst() {
  return (
    <div className="pointer-events-none absolute -top-2.5 -left-2.5 grid size-7 place-items-center">
      {PARTICLE_COLORS.map((colors, index) => (
        <HeartParticle
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

export function HeartIcon({ className, filled = false }: { className?: string; filled?: boolean }) {
  return (
    <ReiconHeart
      weight={filled ? 'Filled' : 'Outline'}
      className={cn('size-3.5 shrink-0 transition-colors', filled && 'text-rose-500', className)}
    />
  )
}

export interface FavoriteButtonProps extends Omit<ButtonProps, 'onClick'> {
  slug: string
  title?: string
  category?: string
  showLabel?: boolean
  label?: string
  activeLabel?: string
  iconClassName?: string
}

export const FavoriteButton = React.forwardRef<HTMLButtonElement, FavoriteButtonProps>(
  (
    {
      slug,
      title,
      category,
      showLabel = false,
      label = 'Favorite',
      activeLabel = 'Favorited',
      variant = 'ghost',
      size = 'icon',
      squircle = true,
      className,
      iconClassName,
      ...props
    },
    ref,
  ) => {
    const { has, toggle } = useFavorites()
    const isFavorite = has(slug)
    const [isAnimating, setIsAnimating] = React.useState(false)

    const handleToggle = (e: React.MouseEvent) => {
      e.stopPropagation()
      e.preventDefault()
      bloomSound()
      const becomingFavorite = !isFavorite
      if (becomingFavorite) {
        setIsAnimating(true)
      }
      toggle({
        slug,
        title: title || prettify(slug),
        category,
      })
    }

    const titleText = isFavorite ? 'Remove from favorites' : 'Add to favorites'

    return (
      <Button
        ref={ref}
        type="button"
        variant={variant}
        size={size}
        squircle={squircle}
        onClick={handleToggle}
        aria-pressed={isFavorite}
        aria-label={titleText}
        title={titleText}
        className={cn(
          'relative cursor-pointer transition-all active:scale-[0.96]',
          isFavorite && 'text-rose-500',
          className,
        )}
        {...props}
      >
        <div className="relative inline-flex items-center justify-center">
          {isAnimating && <HeartRipple />}
          {isAnimating && <HeartBurst />}
          <motion.div
            animate={{ scale: isAnimating ? [1, 1.35, 0.95, 1] : 1 }}
            transition={{ duration: 0.35, ease: [0.175, 0.885, 0.32, 1.275] }}
            onAnimationComplete={() => setIsAnimating(false)}
          >
            <HeartIcon
              filled={isFavorite}
              className={cn(
                isFavorite ? 'text-rose-500' : 'text-muted-foreground group-hover:text-foreground',
                iconClassName,
              )}
            />
          </motion.div>
        </div>

        {showLabel && (
          <span className={cn('text-xs font-medium select-none ml-1.5', isFavorite && 'text-rose-500')}>
            {isFavorite ? activeLabel : label}
          </span>
        )}
      </Button>
    )
  },
)

FavoriteButton.displayName = 'FavoriteButton'
