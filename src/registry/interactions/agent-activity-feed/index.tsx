'use client'

import * as React from 'react'
import { motion } from 'motion/react'
import { Squishmoji } from '@usespaceui/squishmoji/react'
import { Card } from '@/registry/primitives/card'
import { Frame, FrameHeader } from '@/registry/primitives/frame'
import { Badge } from '@/registry/components/spaceui/badge-squircle'
import { BlurRevealText } from '@/registry/components/spaceui/blur-reveal-text'
import { cn } from '@/registry/lib/utils'
import {
  AGENT_ACTIVITY_PRESETS,
  type ActivityStatus,
  type AgentActivityItem,
  type AgentActivityPresetKey,
} from './data'
import { bloom, whisper } from '@usespaceui/sounds'

const safeSound = (fn: () => void) => {
  if (typeof window === 'undefined') return
  try {
    fn()
  } catch {}
}

const STATUS_BADGE_VARIANTS: Record<ActivityStatus, 'warning' | 'error' | 'success'> = {
  running: 'warning',
  failed: 'error',
  completed: 'success',
}

const STATUS_LABELS: Record<ActivityStatus, string> = {
  running: 'Running',
  failed: 'Failed',
  completed: 'Completed',
}

const FILTERS = [
  { key: 'all', label: 'All' },
  { key: 'running', label: 'Running' },
  { key: 'failed', label: 'Failed' },
  { key: 'completed', label: 'Completed' },
]

function FeedItem({ item }: { item: AgentActivityItem }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 3 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.16 }}
      className="flex items-center justify-between gap-2.5 px-2.5 py-1.5 transition-colors hover:bg-muted/50 rounded-xl"
    >
      <div className="flex min-w-0 flex-1 items-center gap-2.5">
        <div className="relative size-9 shrink-0 overflow-hidden [corner-shape:superellipse(1.25)] rounded-xl bg-muted flex items-center justify-center">
          <Squishmoji
            seed={item.agent}
            size={30}
            animate
            animWobble
            animOnHover
            animOnClick
            shape="all"
            expression="all"
            backgroundStyle="all"
            className="size-full"
          />
        </div>
        <div className="flex min-w-0 flex-1 flex-col leading-tight">
          <div className="flex items-center gap-1.5 min-w-0">
            <span className="truncate text-xs font-medium text-foreground">{item.agent}</span>
            <Badge
              size="xs"
              variant={STATUS_BADGE_VARIANTS[item.status]}
              squircle
              className="shrink-0 font-normal text-[0.625rem] px-1.5 py-0.5"
            >
              {STATUS_LABELS[item.status]}
            </Badge>
          </div>
          <span className="truncate text-[0.625rem] font-normal text-muted-foreground/70 mt-0.5">
            {item.description}
          </span>
        </div>
      </div>

      <div className="flex shrink-0 items-center">
        <span className="text-right text-xs font-normal text-muted-foreground tabular-nums">{item.time}</span>
      </div>
    </motion.div>
  )
}

function FeedGroup({ group, items }: { group: string; items: AgentActivityItem[] }) {
  if (items.length === 0) return null

  return (
    <div className="flex flex-col gap-2">
      <div className="px-2.5 pb-0.5">
        <span className="text-[0.625rem] font-medium text-muted-foreground">{group}</span>
      </div>
      <div className="flex flex-col gap-1.5">
        {items.map((item) => (
          <FeedItem key={item.id} item={item} />
        ))}
      </div>
    </div>
  )
}

export interface AgentActivityFeedProps {
  className?: string
  preset?: AgentActivityPresetKey
  animation?: 'active' | 'inactive' | boolean
  autoPlay?: boolean
  pauseOnHover?: boolean
  speed?: number
  cyclePresets?: boolean
  cyclePreset?: boolean
}

export function AgentActivityFeed({
  className,
  preset = 'general',
  animation = 'active',
  autoPlay = true,
  pauseOnHover = true,
  speed = 1,
  cyclePresets = false,
  cyclePreset,
}: AgentActivityFeedProps) {
  const shouldCyclePresets = cyclePreset ?? cyclePresets
  const isAnimated = animation === true || animation === 'active'

  const [currentPresetKey, setCurrentPresetKey] = React.useState<AgentActivityPresetKey>(preset)
  const [isHovered, setIsHovered] = React.useState(false)
  const [activeFilter, setActiveFilter] = React.useState<string>('all')

  // Sync external preset prop
  React.useEffect(() => {
    setCurrentPresetKey(preset)
  }, [preset])

  const targetPreset = React.useMemo(() => {
    return AGENT_ACTIVITY_PRESETS[currentPresetKey] ?? AGENT_ACTIVITY_PRESETS.general
  }, [currentPresetKey])

  const items = targetPreset.items

  const contentRef = React.useRef<HTMLDivElement>(null)
  const [contentHeight, setContentHeight] = React.useState<number | undefined>(undefined)

  // Height observer
  React.useLayoutEffect(() => {
    const el = contentRef.current
    if (!el) return
    const ro = new ResizeObserver((entries) => {
      const entry = entries[0]
      if (entry) {
        const h = entry.borderBoxSize?.[0]?.blockSize ?? entry.contentRect.height
        if (h > 0) {
          setContentHeight(Math.round(h))
        }
      }
    })
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  const filteredItems = React.useMemo(() => {
    return activeFilter === 'all' ? items : items.filter((item) => item.status === activeFilter)
  }, [items, activeFilter])

  const groupedEntries = React.useMemo(() => {
    const map = new Map<string, AgentActivityItem[]>()
    for (const item of filteredItems) {
      const list = map.get(item.group) ?? []
      list.push(item)
      map.set(item.group, list)
    }
    // Only return groups that actually contain items
    return Array.from(map.entries()).filter(([_, groupItems]) => groupItems.length > 0)
  }, [filteredItems])

  const cycleFilter = React.useCallback(() => {
    safeSound(bloom)
    const currentIdx = FILTERS.findIndex((f) => f.key === activeFilter)
    const nextIdx = (currentIdx + 1) % FILTERS.length
    setActiveFilter(FILTERS[nextIdx].key)
  }, [activeFilter])

  const advancePreset = React.useCallback(() => {
    const keys = Object.keys(AGENT_ACTIVITY_PRESETS) as AgentActivityPresetKey[]
    const currentIdx = keys.indexOf(currentPresetKey)
    const nextIdx = (currentIdx + 1) % keys.length
    setCurrentPresetKey(keys[nextIdx])
    setActiveFilter('all')
  }, [currentPresetKey])

  // Autonomous autoPlay loop
  React.useEffect(() => {
    if (!isAnimated || !autoPlay) return
    if (pauseOnHover && isHovered) return

    const clampedSpeed = Math.max(0.25, Math.min(speed, 5))
    const stepDelay = Math.round(2800 / clampedSpeed)

    const timer = setTimeout(() => {
      const currentIdx = FILTERS.findIndex((f) => f.key === activeFilter)
      if (currentIdx + 1 < FILTERS.length) {
        safeSound(bloom)
        setActiveFilter(FILTERS[currentIdx + 1].key)
      } else {
        if (shouldCyclePresets) {
          advancePreset()
        } else {
          safeSound(whisper)
          setActiveFilter('all')
        }
      }
    }, stepDelay)

    return () => clearTimeout(timer)
  }, [isAnimated, autoPlay, pauseOnHover, isHovered, speed, activeFilter, shouldCyclePresets, advancePreset])

  const currentFilterObj = FILTERS.find((f) => f.key === activeFilter) ?? FILTERS[0]

  return (
    <Frame
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={cn(
        'relative flex w-full max-w-sm flex-col [corner-shape:superellipse(1.25)] rounded-3xl bg-muted p-1.5 select-none shadow-none',
        className,
      )}
    >
      <FrameHeader className="flex flex-row shrink-0 items-center justify-between gap-3 px-2 py-1.5 pb-2 border-none">
        <div className="flex items-center gap-2 min-w-0">
          {/* <div className="relative size-6 shrink-0 overflow-hidden [corner-shape:superellipse(1.25)] rounded-lg bg-background flex items-center justify-center">
            <Squishmoji
              seed="session-activity"
              size={20}
              animate
              animWobble
              animOnHover
              animOnClick
              shape="all"
              expression="all"
              backgroundStyle="all"
              className="size-full"
            />
          </div> */}
          <span className="text-xs sm:text-sm font-semibold tracking-tight text-foreground">Agent's activity feed</span>
        </div>
        <Badge
          size="xs"
          variant="secondary"
          squircle
          onClick={cycleFilter}
          className="bg-background! text-foreground flex items-center gap-1.5 shadow-none shrink-0 cursor-pointer hover:bg-background/80 transition-colors"
        >
          <span className="relative flex justify-center items-center size-fit">
            <span
              className={cn(
                'absolute inline-flex h-full w-full rounded-full opacity-75 animate-ping animation-duration-[2.25s]',
                activeFilter === 'running'
                  ? 'bg-amber-300'
                  : activeFilter === 'failed'
                    ? 'bg-rose-300'
                    : 'bg-emerald-300',
              )}
            />
            <span
              className={cn(
                'relative inline-flex rounded-full size-2 animate-pulse',
                activeFilter === 'running'
                  ? 'bg-amber-500'
                  : activeFilter === 'failed'
                    ? 'bg-rose-500'
                    : 'bg-emerald-500',
              )}
            />
          </span>
          <BlurRevealText
            as="span"
            text={`${filteredItems.length} ${filteredItems.length === 1 ? 'event' : 'events'}`}
            replayKey={activeFilter}
            inView={false}
            once={false}
            delay={0}
            duration={0.22}
            blurAmount="0.3125rem"
            yOffset={2}
            className="inline-block text-[0.6875rem] font-medium text-foreground"
          />
        </Badge>
      </FrameHeader>

      <Card className="flex flex-col [corner-shape:superellipse(1.25)] rounded-[1.125rem] bg-background p-1.5 border-none shadow-none">
        <motion.div
          animate={contentHeight ? { height: contentHeight } : {}}
          transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
          className="relative flex flex-col w-full overflow-hidden"
        >
          <div ref={contentRef} className="p-1">
            {groupedEntries.length === 0 ? (
              <div className="px-4 py-8 text-center text-xs font-medium tracking-tight text-muted-foreground">
                Nothing {activeFilter === 'all' ? 'here yet' : currentFilterObj.label.toLowerCase()}
              </div>
            ) : (
              <div className="flex flex-col gap-2">
                {groupedEntries.map(([group, groupItems]) => (
                  <FeedGroup key={group} group={group} items={groupItems} />
                ))}
              </div>
            )}
          </div>
        </motion.div>
      </Card>
    </Frame>
  )
}

export default AgentActivityFeed
