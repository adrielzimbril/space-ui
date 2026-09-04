'use client'

import { useMemo } from 'react'
import { ScrollArea } from '@/registry/primitives/scroll-area'
import { Avatar } from '@usespaceui/avatars/react'
import { generatePalette } from '@usespaceui/gradients'
import { resolveVariant, type AvatarEffect, type AvatarVariant } from '@usespaceui/avatars'
import type { SelectedCanvasAvatar } from './canvas'

interface GalleryViewProps {
  pool: string[]
  pattern: AvatarVariant | 'all'
  effect: AvatarEffect
  animate: boolean
  circle: boolean
  parsedColors?: string[]
  paletteIndex: number
  onSelectAvatar: (avatar: SelectedCanvasAvatar) => void
}

export function GalleryView({
  pool,
  pattern,
  effect,
  animate,
  circle,
  parsedColors,
  paletteIndex,
  onSelectAvatar,
}: GalleryViewProps) {
  const expandedPool = useMemo(() => {
    const result: string[] = []
    while (result.length < 293 && pool.length > 0) result.push(...pool)
    return result.slice(0, 293)
  }, [pool])

  return (
    <ScrollArea className="h-full w-full md:p-1" data-lenis-prevent="true" scrollbarGutter scrollFade>
      <div className="grid w-full grid-cols-2 md:grid-cols-5 xl:grid-cols-7 gap-4 p-1.5">
        {expandedPool.map((seed, i) => {
          const currentColors = paletteIndex === -2 ? generatePalette(seed).colors : parsedColors
          return (
            <button
              type="button"
              key={`${seed}-${i}`}
              onClick={() =>
                onSelectAvatar({
                  seed,
                  variant: pattern,
                  colors: currentColors ? [...currentColors] : undefined,
                })
              }
              className="group relative flex aspect-square cursor-pointer select-none flex-col justify-between rounded-[1.25rem] bg-muted p-4 text-start outline-none active:scale-[0.98]"
            >
              <span className="absolute top-4 left-4 text-[0.625rem] font-medium tabular-nums text-muted-foreground">
                {(i + 1).toString().padStart(3, '0')}
              </span>
              <span className="absolute top-4 right-4 max-w-[50%] truncate text-[0.625rem] text-muted-foreground">
                {seed}
              </span>
              <div className="pointer-events-none absolute inset-9 flex self-center items-center justify-center sm:inset-10">
                <Avatar
                  name={seed}
                  size={164}
                  variant={pattern}
                  colors={currentColors}
                  animate={animate}
                  effect={effect}
                  circle={circle}
                  className="flex size-full max-h-full max-w-full items-center justify-center [&_svg]:size-full"
                />
              </div>
              <span className="absolute inset-x-4 bottom-4 truncate text-[0.625rem] font-medium capitalize text-muted-foreground">
                {pattern === 'all' ? resolveVariant(seed, 'all').replace(/-/g, ' ') : pattern.replace(/-/g, ' ')}
              </span>
            </button>
          )
        })}
      </div>
    </ScrollArea>
  )
}
