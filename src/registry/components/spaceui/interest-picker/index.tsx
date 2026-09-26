'use client'

import * as React from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { IconTrash } from '@tabler/icons-react'
import Image from 'next/image'
import { EmojiSource, EmojiType, resolveEmojiUrl } from '@usespaceui/emoji'
import { Button } from '@/registry/components/button/button-squircle'
import { cn } from '@/registry/lib/utils'
import { ALL_INTERESTS, type Interest } from './data'

const ROWS = 5

function estimateWidth(it: Interest) {
  const charW = 8.2
  const pad = 32 + 24
  return Math.round(it.label.length * charW + pad)
}

function packIntoRows(items: Interest[], rows = ROWS) {
  const lanes: { items: Interest[]; w: number }[] = Array.from({ length: rows }, () => ({ items: [], w: 0 }))
  for (const it of items) {
    let idx = 0
    for (let i = 1; i < lanes.length; i++) if (lanes[i].w < lanes[idx].w) idx = i
    const width = estimateWidth(it)
    lanes[idx].items.push(it)
    lanes[idx].w += width + 12
  }
  return lanes.map((l) => l.items)
}

function EmojiExplode({ emojis }: { emojis: string[] }) {
  const rand = (min: number, max: number) => Math.random() * (max - min) + min

  return (
    <div className="absolute inset-0">
      {emojis.map((e, i) => {
        const dx = rand(-120, 120)
        const topY = rand(-160, -260)
        const rot = rand(-25, 25)

        return (
          <motion.span
            key={`${i}-${e}-${dx.toFixed(1)}`}
            className="absolute top-1/2 left-1/2 z-10 -translate-x-1/2 -translate-y-1/2 text-5xl"
            initial={{ x: 0, y: 0, scale: 0.5, opacity: 0, rotate: 0 }}
            animate={{
              x: dx,
              y: topY,
              rotate: rot,
              scale: [0.5, 1, 1, 0.95],
              opacity: [0, 1, 1, 0],
            }}
            transition={{ type: 'tween', ease: 'easeOut', duration: 0.7 }}
          >
            {e}
          </motion.span>
        )
      })}
    </div>
  )
}

function EmojiBurst({ emoji, onDone }: { emoji: string; onDone?: () => void }) {
  const offsets = [-45, 0, 45]

  return (
    <motion.div
      initial="hidden"
      animate="show"
      onAnimationComplete={onDone}
      variants={{ hidden: {}, show: { transition: { staggerChildren: 0.08 } } }}
      className="relative"
    >
      {offsets.map((x, i) => (
        <motion.span
          key={`${i}-${emoji}`}
          className="absolute top-1/2 left-1/2 z-10 -translate-x-1/2 -translate-y-1/2"
          variants={{
            hidden: { opacity: 0, scale: 0.6, x: 0, y: 0, rotate: 0 },
            show: {
              x: [0, x, x, 0],
              y: [0, i === 1 ? -200 : -180, i === 1 ? -200 : -180, 0],
              opacity: [0, 0.8, 1, 1, 0.8, 0],
              scale: [0.6, 1, 1, 0.6],
              rotate: [0, i === 1 ? 10 : -10, i === 1 ? -10 : 10, i === 1 ? 10 : -10, 0],
              transition: { duration: 1.2, ease: [0.2, 0, 0.57, 0] },
            },
          }}
        >
          <span className="text-6xl leading-none">{emoji}</span>
        </motion.span>
      ))}
    </motion.div>
  )
}

function AnimojiGlyph({ emoji }: { emoji: string }) {
  const src = React.useMemo(() => {
    try {
      return resolveEmojiUrl(emoji, { source: EmojiSource.Telegram, type: EmojiType.Anim } as never)
    } catch {
      return ''
    }
  }, [emoji])
  const [failed, setFailed] = React.useState(false)
  React.useEffect(() => setFailed(false), [src])

  if (!src || failed) return <span className="text-lg leading-none">{emoji}</span>

  return (
    <Image
      src={src}
      alt={emoji}
      width={32}
      height={32}
      draggable={false}
      unoptimized
      onError={() => setFailed(true)}
      className="pointer-events-none inline-block size-4.5 object-contain align-[-0.1em]"
    />
  )
}

export interface InterestPickerProps {
  className?: string
}

export function InterestPicker({ className }: InterestPickerProps) {
  const [selected, setSelected] = React.useState<Set<string>>(new Set())
  const [burst, setBurst] = React.useState<{ id: string; emoji: string; seed: number } | null>(null)
  const [isDragging, setIsDragging] = React.useState(false)
  const selectedCount = selected.size

  const frameRef = React.useRef<HTMLDivElement>(null)
  const [atStart, setAtStart] = React.useState(true)
  const [atEnd, setAtEnd] = React.useState(false)

  const isMouseDown = React.useRef(false)
  const startX = React.useRef(0)
  const scrollLeftStart = React.useRef(0)
  const hasMoved = React.useRef(false)

  const rows = React.useMemo(() => packIntoRows(ALL_INTERESTS, ROWS), [])

  const checkScroll = React.useCallback(() => {
    const el = frameRef.current
    if (!el) return
    const eps = 6
    setAtStart(el.scrollLeft <= eps)
    setAtEnd(el.scrollLeft + el.clientWidth >= el.scrollWidth - eps)
  }, [])

  React.useLayoutEffect(() => {
    const el = frameRef.current
    if (!el) return

    const ro = new ResizeObserver(() => {
      checkScroll()
    })
    ro.observe(el)
    checkScroll()
    return () => ro.disconnect()
  }, [checkScroll])

  const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    if (e.deltaY !== 0 && e.deltaX === 0) {
      e.currentTarget.scrollLeft += e.deltaY
      checkScroll()
    }
  }

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    isMouseDown.current = true
    hasMoved.current = false
    startX.current = e.pageX - (frameRef.current?.offsetLeft || 0)
    scrollLeftStart.current = frameRef.current?.scrollLeft || 0
  }

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isMouseDown.current || !frameRef.current) return
    const xPos = e.pageX - (frameRef.current.offsetLeft || 0)
    const walk = xPos - startX.current
    if (Math.abs(walk) > 4) {
      hasMoved.current = true
      setIsDragging(true)
    }
    frameRef.current.scrollLeft = scrollLeftStart.current - walk
    checkScroll()
  }

  const handleMouseUp = () => {
    isMouseDown.current = false
    setTimeout(() => {
      setIsDragging(false)
      hasMoved.current = false
    }, 60)
  }

  const toggle = (it: Interest) => {
    if (isDragging || hasMoved.current) return
    setSelected((prev) => {
      const next = new Set(prev)
      next.has(it.id) ? next.delete(it.id) : next.add(it.id)
      return next
    })

    if (!selected.has(it.id)) {
      setBurst({ id: it.id, emoji: it.emoji, seed: Date.now() })
    } else {
      setBurst(null)
    }
  }

  const [shakeCounter, setShakeCounter] = React.useState(false)
  const [explosion, setExplosion] = React.useState<{ seed: number; emojis: string[] } | null>(null)

  const collectSelectedEmojis = () => ALL_INTERESTS.filter((it) => selected.has(it.id)).map((it) => it.emoji)

  const SHAKE_MS = 420
  const BOOM_MS = 700

  const handleTrashClick = () => {
    if (selected.size === 0) return

    setShakeCounter(true)
    setTimeout(() => setShakeCounter(false), SHAKE_MS)

    const emojis = collectSelectedEmojis()
    setTimeout(() => {
      setExplosion({ seed: Date.now(), emojis })
      setBurst(null)
      setSelected(new Set())

      setTimeout(() => setExplosion(null), BOOM_MS)
    }, SHAKE_MS)
  }

  return (
    <div className={cn('relative mx-auto flex w-full max-w-4xl flex-col gap-5 p-6', className)}>
      <div
        className={cn(
          'relative rounded-xl',
          'before:pointer-events-none before:absolute before:top-0 before:left-0 before:z-10 before:h-full before:w-12 before:bg-linear-to-r before:from-background before:to-transparent before:transition-opacity before:duration-200',
          'after:pointer-events-none after:absolute after:top-0 after:right-0 after:z-10 after:h-full after:w-12 after:bg-linear-to-l after:from-background after:to-transparent after:transition-opacity after:duration-200',
          atStart && 'before:opacity-0',
          atEnd && 'after:opacity-0',
        )}
      >
        <div
          className={cn(
            'invisible absolute bottom-0 left-0 z-5 h-full w-full bg-radial-[at_50%_85%] from-background to-background/0 opacity-0 transition-all duration-300',
            burst && 'visible opacity-100',
          )}
        />

        <div
          ref={frameRef}
          onScroll={checkScroll}
          onWheel={handleWheel}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          className={cn(
            'overflow-x-auto overflow-y-hidden py-2 select-none cursor-grab active:cursor-grabbing',
            '[scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden',
          )}
        >
          <div className="flex flex-col gap-2 w-max pr-4">
            {rows.map((row, rIdx) => (
              <div key={rIdx} className="flex flex-nowrap gap-2 shrink-0">
                {row.map((it) => {
                  const isActive = selected.has(it.id)
                  return (
                    <motion.button
                      key={it.id}
                      type="button"
                      whileTap={{ scale: 0.95 }}
                      onClick={() => toggle(it)}
                      className={cn(
                        'inline-flex shrink-0 items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-colors cursor-pointer select-none',
                        isActive
                          ? 'bg-background text-foreground ring-2 ring-muted shadow-xs'
                          : 'bg-muted text-muted-foreground hover:bg-accent hover:text-accent-foreground',
                      )}
                    >
                      <AnimojiGlyph emoji={it.emoji} />
                      <span className="whitespace-nowrap">{it.label}</span>
                    </motion.button>
                  )
                })}
              </div>
            ))}
          </div>
        </div>
      </div>
      <motion.div
        key={selectedCount}
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1, x: shakeCounter ? [0, -6, 6, -6, 6, 0] : 0 }}
        transition={{ type: 'spring', stiffness: 250, damping: 18, x: { duration: 0.42 } }}
        className="relative z-8 mx-auto flex w-max items-center gap-2"
      >
        <Button squircle={false} className="rounded-full gap-2 pointer-events-none">
          <span className="font-medium">{selectedCount}</span>
          Interests
        </Button>
        <Button
          variant="outline"
          size="icon-lg"
          squircle={false}
          className={cn('rounded-full', selectedCount === 0 && 'cursor-not-allowed opacity-40')}
          onClick={handleTrashClick}
          aria-label="Clear selected interests"
        >
          <IconTrash className="size-4" />
        </Button>
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <AnimatePresence>
            {burst && <EmojiBurst key={burst.seed} emoji={burst.emoji} onDone={() => setBurst(null)} />}
          </AnimatePresence>
        </div>
        <div className="pointer-events-none absolute inset-0 z-5 flex items-center justify-center">
          <AnimatePresence>
            {explosion && <EmojiExplode key={explosion.seed} emojis={explosion.emojis} />}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  )
}
