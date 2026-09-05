'use client'

import type { ReactNode } from 'react'
import { useMemo } from 'react'
import { ScrollArea } from '@/registry/primitives/scroll-area'
import { cn } from '@/registry/lib/utils'

export function ResourceGallery({
  pool,
  onSelect,
  renderMedia,
  caption,
  sidebarLeft = false,
  sidebarRight = false,
  limit = 293,
}: {
  pool: string[]
  onSelect: (seed: string, index: number) => void
  renderMedia: (seed: string, index: number) => ReactNode
  caption?: (seed: string, index: number) => string
  sidebarLeft?: boolean
  sidebarRight?: boolean
  limit?: number
}) {
  const expandedPool = useMemo(() => {
    const result: string[] = []
    while (result.length < limit && pool.length > 0) result.push(...pool)
    return result.slice(0, limit)
  }, [pool, limit])
  const activeSidebarsCount = Number(sidebarLeft) + Number(sidebarRight)

  return (
    <ScrollArea className="h-full w-full md:p-1" data-lenis-prevent="true" scrollbarGutter scrollFade>
      <div
        className={cn(
          'grid w-full grid-cols-2 gap-4 p-1.5 md:grid-cols-5',
          activeSidebarsCount === 0 && 'xl:grid-cols-7',
          activeSidebarsCount === 1 && 'xl:grid-cols-6',
          activeSidebarsCount === 2 && 'xl:grid-cols-5',
        )}
      >
        {expandedPool.map((seed, i) => (
          <button
            type="button"
            key={`${seed}-${i}`}
            onClick={() => onSelect(seed, i)}
            className="group relative flex aspect-square cursor-pointer select-none flex-col justify-between rounded-[1.25rem] bg-muted p-4 text-start outline-none active:scale-[0.98]"
          >
            <span className="absolute top-4 left-4 text-[0.625rem] font-medium tabular-nums text-muted-foreground">
              {(i + 1).toString().padStart(3, '0')}
            </span>
            <span className="absolute top-4 right-4 max-w-[50%] truncate text-[0.625rem] text-muted-foreground">
              {seed}
            </span>
            <div className="pointer-events-none absolute inset-9 flex items-center justify-center self-center sm:inset-10">
              {renderMedia(seed, i)}
            </div>
            {caption ? (
              <span className="absolute inset-x-4 bottom-4 truncate text-[0.625rem] font-medium capitalize text-muted-foreground">
                {caption(seed, i)}
              </span>
            ) : null}
          </button>
        ))}
      </div>
    </ScrollArea>
  )
}
