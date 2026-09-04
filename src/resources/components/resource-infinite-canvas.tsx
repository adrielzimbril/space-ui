'use client'

import type { ReactNode } from 'react'
import { useEffect, useMemo, useRef } from 'react'
import gsap from 'gsap'
import { Observer } from 'gsap/Observer'
import { cn } from '@/registry/lib/utils'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(Observer)
}

export function ResourceInfiniteCanvas({
  pool,
  size,
  onSelect,
  renderMedia,
  caption,
}: {
  pool: string[]
  size: number
  onSelect: (seed: string, index: number) => void
  renderMedia: (seed: string, index: number, mediaSize: number) => ReactNode
  caption?: (seed: string, index: number) => string
}) {
  const sectionRef = useRef<HTMLElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const firstBlockRef = useRef<HTMLDivElement>(null)
  const expandedPool = useMemo(() => {
    const result: string[] = []
    while (result.length < 320 && pool.length > 0) result.push(...pool)
    return result.slice(0, 320)
  }, [pool])
  const cardAvatarSize = Math.max(48, Math.min(164, Math.round(size * 0.78)))

  useEffect(() => {
    if (!containerRef.current || !firstBlockRef.current) return
    const container = containerRef.current
    const block = firstBlockRef.current
    const blockWidth = block.clientWidth
    const blockHeight = block.clientHeight
    const wrapX = gsap.utils.wrap(-blockWidth, 0)
    const quickX = gsap.quickTo(container, 'x', {
      duration: 1.5,
      ease: 'power4',
      modifiers: { x: gsap.utils.unitize(wrapX) },
    })
    const wrapY = gsap.utils.wrap(-blockHeight, 0)
    const quickY = gsap.quickTo(container, 'y', {
      duration: 1.5,
      ease: 'power4',
      modifiers: { y: gsap.utils.unitize(wrapY) },
    })
    let currentX = 0
    let currentY = 0
    const observer = Observer.create({
      target: sectionRef.current ?? window,
      type: 'wheel,touch,pointer',
      ignore: '[data-resource-ui]',
      onChangeX: (e) => {
        currentX += e.event.type === 'wheel' ? -e.deltaX : 2 * e.deltaX
        quickX(currentX)
      },
      onChangeY: (e) => {
        currentY += e.event.type === 'wheel' ? -e.deltaY : 2 * e.deltaY
        quickY(currentY)
      },
    })
    return () => observer.kill()
  }, [expandedPool, size])

  const renderGridBlock = ({
    isDuplicate = false,
    idSuffix = '',
    blockRef,
  }: {
    isDuplicate?: boolean
    idSuffix?: string
    blockRef?: React.RefObject<HTMLDivElement | null>
  }) => (
    <div ref={blockRef} className="grid w-max grid-cols-10 gap-4 p-1.5 md:grid-cols-20">
      {expandedPool.map((seed, i) => (
        <button
          type="button"
          key={`${isDuplicate ? 'dup' : 'orig'}-${idSuffix}-${seed}-${i}`}
          onClick={() => onSelect(seed, i)}
          className="group relative flex aspect-square cursor-pointer select-none flex-col justify-between rounded-[1.25rem] bg-muted p-4 text-start outline-none active:scale-[0.98]"
          style={{
            width: `${cardAvatarSize + 84}px`,
            minHeight: `${cardAvatarSize + 104}px`,
          }}
        >
          <span className="absolute top-4 left-4 text-[0.625rem] font-medium tabular-nums text-muted-foreground">
            {(i + 1).toString().padStart(3, '0')}
          </span>
          <span className="absolute top-4 right-4 max-w-[50%] truncate text-[0.625rem] text-muted-foreground">
            {seed}
          </span>
          <div className="my-auto flex items-center justify-center">{renderMedia(seed, i, cardAvatarSize)}</div>
          {caption ? (
            <span className="absolute inset-x-4 bottom-4 truncate text-[0.625rem] font-medium capitalize text-muted-foreground">
              {caption(seed, i)}
            </span>
          ) : null}
        </button>
      ))}
    </div>
  )

  return (
    <section ref={sectionRef} aria-label="Resource canvas" className={cn('h-full w-full overflow-hidden touch-none')}>
      <div ref={containerRef} className="grid w-max grid-cols-2 will-change-transform">
        {renderGridBlock({ blockRef: firstBlockRef, idSuffix: '1' })}
        {renderGridBlock({ isDuplicate: true, idSuffix: '2' })}
        {renderGridBlock({ isDuplicate: true, idSuffix: '3' })}
        {renderGridBlock({ isDuplicate: true, idSuffix: '4' })}
      </div>
    </section>
  )
}
