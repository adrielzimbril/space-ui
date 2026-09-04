'use client'

import { useMemo } from 'react'
import { ScrollArea } from '@/registry/primitives/scroll-area'
import { Avatar } from '@usespaceui/avatars/react'
import { generatePalette } from '@usespaceui/gradients'
import { cn } from '@/registry/lib/utils'
import type { AvatarEffect, AvatarVariant } from '@usespaceui/avatars'

interface GalleryViewProps {
  pool: string[]
  pattern: AvatarVariant | 'all'
  size: number
  effect: AvatarEffect
  animate: boolean
  circle: boolean
  parsedColors?: string[]
  paletteIndex: number
}

export function GalleryView({
  pool,
  pattern,
  size,
  effect,
  animate,
  circle,
  parsedColors,
  paletteIndex,
}: GalleryViewProps) {
  const expandedPool = useMemo(() => {
    const result: string[] = []
    while (result.length < 293 && pool.length > 0) result.push(...pool)
    return result.slice(0, 293)
  }, [pool])
  const cardAvatarSize = Math.max(48, Math.min(164, Math.round(size * 0.78)))

  return (
    <ScrollArea className="h-full w-full md:p-1" data-lenis-prevent="true" scrollbarGutter scrollFade>
      <div className="grid w-full grid-cols-2 md:grid-cols-5 xl:grid-cols-7 gap-4 p-1.5">
        {expandedPool.map((seed, i) => {
          const currentColors = paletteIndex === -2 ? generatePalette(seed).colors : parsedColors
          return (
            <div
              key={`${seed}-${i}`}
              className="group relative flex aspect-square cursor-pointer select-none flex-col justify-between rounded-[1.25rem] bg-muted p-4 text-start outline-none active:scale-[0.98]"
            >
              <span className="absolute top-4 left-4 text-[0.625rem] font-medium tabular-nums text-muted-foreground">
                {(i + 1).toString().padStart(3, '0')}
              </span>
              <span className="absolute top-4 right-4 max-w-[50%] truncate text-[0.625rem] text-muted-foreground">
                {seed}
              </span>
              <div className="my-auto flex items-center justify-center">
                <Avatar
                  name={seed}
                  size={cardAvatarSize}
                  variant={pattern}
                  colors={currentColors}
                  animate={animate}
                  effect={effect}
                  circle={circle}
                />
              </div>
              <span className="absolute inset-x-4 bottom-4 truncate text-[0.625rem] font-medium capitalize text-muted-foreground">
                {pattern === 'all' ? seed.split(' ')[0] : pattern.replace(/-/g, ' ')}
              </span>
            </div>
          )
        })}
      </div>
    </ScrollArea>
  )
}
