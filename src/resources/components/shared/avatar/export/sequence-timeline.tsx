'use client'

import { useMemo, useState } from 'react'
import {
  DndContext,
  PointerSensor,
  closestCenter,
  useSensor,
  useSensors,
  type DragEndEvent,
} from '@dnd-kit/core'
import { SortableContext, arrayMove, useSortable, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { IconChevronRight, IconGripVertical, IconPlus } from '@tabler/icons-react'
import { Button } from '@/registry/primitives/button'
import { cn } from '@/registry/lib/utils'
import type { SequenceStep } from './squish-video'

const PX_PER_SEC = 96
const ROW_H = 36
const LABEL_W = 168

function formatTime(seconds: number) {
  const whole = Math.max(0, seconds)
  const m = Math.floor(whole / 60)
  const s = whole % 60
  return `${String(m).padStart(2, '0')}:${s.toFixed(2).padStart(5, '0')}`
}

function ShotRow({
  step,
  index,
  start,
  timelineWidth,
  selected,
  expanded,
  onSelect,
  onToggle,
  onUpdate,
  onRemove,
}: {
  step: SequenceStep
  index: number
  start: number
  timelineWidth: number
  selected: boolean
  expanded: boolean
  onSelect: () => void
  onToggle: () => void
  onUpdate: (patch: Partial<SequenceStep>) => void
  onRemove: () => void
}) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: step.id })
  const tracks = [
    { key: 'animate' as const, label: 'Motion', on: step.animate },
    { key: 'wobble' as const, label: 'Wobble', on: step.wobble },
    { key: 'blink' as const, label: 'Blink', on: step.blink },
  ]

  return (
    <div
      ref={setNodeRef}
      style={{ transform: CSS.Transform.toString(transform), transition }}
      className={cn(isDragging && 'z-10', selected && 'bg-muted/60')}
    >
      <div className="flex" style={{ height: ROW_H }}>
        <div className="sticky left-0 z-10 flex shrink-0 items-center gap-1 border-r border-border bg-background px-2" style={{ width: LABEL_W }}>
          <button type="button" className="text-muted-foreground" {...attributes} {...listeners} aria-label="Reorder">
            <IconGripVertical className="size-3.5" />
          </button>
          <button type="button" className="text-muted-foreground" onClick={onToggle} aria-label="Toggle tracks">
            <IconChevronRight className={cn('size-3.5 transition-transform', expanded && 'rotate-90')} />
          </button>
          <button type="button" onClick={onSelect} className="min-w-0 flex-1 truncate text-left text-xs font-medium">
            Shot {index + 1}
          </button>
          <span className="text-[0.625rem] tabular-nums text-muted-foreground">{step.durationSec.toFixed(1)}s</span>
        </div>
        <div className="relative overflow-hidden" style={{ width: timelineWidth, minWidth: timelineWidth }}>
          <button>
            type="button"
            onClick={onSelect}
            className={cn(
              'absolute top-1.5 h-6 rounded-md px-2 text-left text-[0.625rem] font-medium',
              selected ? 'bg-primary text-primary-foreground' : 'bg-muted text-foreground',
            )}
            style={{ left: start * PX_PER_SEC, width: Math.max(48, step.durationSec * PX_PER_SEC) }}
          >
            Shot {index + 1}
          </button>
        </div>
      </div>
      {expanded
        ? tracks.map((track) => (
            <div key={track.key} className="flex" style={{ height: ROW_H }}>
              <div className="sticky left-0 z-10 flex shrink-0 items-center justify-between border-r border-border bg-background px-3" style={{ width: LABEL_W }}>
                <span className="text-[0.625rem] text-muted-foreground">{track.label}</span>
                <button
                  type="button"
                  onClick={() => onUpdate({ [track.key]: !track.on })}
                  className={cn(
                    'rounded px-1.5 text-[0.5625rem] font-medium',
                    track.on ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground',
                  )}
                >
                  {track.on ? 'On' : 'Off'}
                </button>
              </div>
              <div className="relative" style={{ width: timelineWidth, minWidth: timelineWidth }}>
                <button
                  type="button"
                  onClick={() => onUpdate({ [track.key]: !track.on })}
                  className={cn(
                    'absolute top-2 h-4 rounded-sm',
                    track.on ? 'bg-primary/70' : 'bg-muted',
                  )}
                  style={{ left: start * PX_PER_SEC, width: Math.max(48, step.durationSec * PX_PER_SEC) }}
                />
              </div>
            </div>
          ))
        : null}
      {selected ? (
        <div className="flex h-8 items-center gap-2 border-t border-border px-3">
          <button type="button" className="text-[0.625rem] text-destructive" onClick={onRemove}>
            Remove
          </button>
        </div>
      ) : null}
    </div>
  )
}

export function SequenceTimeline({
  sequence,
  onAdd,
  onUpdate,
  onRemove,
  onReorder,
  onExport,
}: {
  sequence: SequenceStep[]
  onAdd: () => void
  onUpdate: (id: string, patch: Partial<SequenceStep>) => void
  onRemove: (id: string) => void
  onReorder: (steps: SequenceStep[]) => void
  onExport: () => void
}) {
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [openIds, setOpenIds] = useState<string[]>([])
  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 6 } }))
  const total = sequence.reduce((sum, step) => sum + step.durationSec, 0)
  const starts = useMemo(() => {
    let cursor = 0
    return sequence.map((step) => {
      const start = cursor
      cursor += step.durationSec
      return start
    })
  }, [sequence])
  const ticks = Math.max(6, Math.ceil(total) + 2)
  const timelineWidth = ticks * PX_PER_SEC

  const onDragEnd = (event: DragEndEvent) => {
    const { active, over } = event
    if (!over || active.id === over.id) return
    const oldIndex = sequence.findIndex((step) => step.id === active.id)
    const newIndex = sequence.findIndex((step) => step.id === over.id)
    if (oldIndex < 0 || newIndex < 0) return
    onReorder(arrayMove(sequence, oldIndex, newIndex))
  }

  return (
    <div className="flex flex-col">
      <div className="flex h-10 items-center justify-between gap-2 border-b border-border px-3">
        <div className="flex items-center gap-2">
          <span className="rounded-md bg-muted px-2 py-0.5 text-[0.625rem] font-medium tabular-nums">
            {formatTime(total)} / {formatTime(total)}
          </span>
        </div>
        <div className="flex items-center gap-1.5">
          <Button type="button" size="xs" variant="secondary" onClick={onAdd}>
            <IconPlus className="size-3.5" /> Add shot
          </Button>
          <Button type="button" size="xs" disabled={sequence.length === 0} onClick={onExport}>
            Export
          </Button>
        </div>
      </div>
      <div className="flex max-h-56 min-h-28 overflow-auto" data-lenis-prevent="true">
        <div className="flex min-w-full flex-col">
          <div className="flex border-b border-border" style={{ height: 28 }}>
            <div className="sticky left-0 z-10 shrink-0 border-r border-border bg-background" style={{ width: LABEL_W }} />
            <div className="relative min-w-0 flex-1 overflow-x-auto" data-lenis-prevent="true">
              <div className="flex h-full" style={{ width: timelineWidth }}>
                {Array.from({ length: ticks }, (_, index) => (
                  <div
                    key={index}
                    className="shrink-0 border-l border-border/70 pl-1 text-[0.5625rem] tabular-nums text-muted-foreground"
                    style={{ width: PX_PER_SEC }}
                  >
                    {index}s
                  </div>
                ))}
              </div>
            </div>
          </div>
          {sequence.length === 0 ? (
            <p className="px-3 py-6 text-xs text-muted-foreground">Add a shot to start the timeline.</p>
          ) : (
            <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={onDragEnd}>
              <SortableContext items={sequence.map((step) => step.id)} strategy={verticalListSortingStrategy}>
                {sequence.map((step, index) => (
                  <ShotRow
                    key={step.id}
                    step={step}
                    index={index}
                    start={starts[index] ?? 0}
                    timelineWidth={timelineWidth}
                    selected={selectedId === step.id}
                    expanded={openIds.includes(step.id)}
                    onSelect={() => setSelectedId(step.id)}
                    onToggle={() =>
                      setOpenIds((ids) =>
                        ids.includes(step.id) ? ids.filter((id) => id !== step.id) : [...ids, step.id],
                      )
                    }
                    onUpdate={(patch) => onUpdate(step.id, patch)}
                    onRemove={() => onRemove(step.id)}
                  />
                ))}
              </SortableContext>
            </DndContext>
          )}
          <button
            type="button"
            onClick={onAdd}
            className="flex h-9 items-center gap-1 border-t border-border px-3 text-left text-[0.625rem] text-muted-foreground hover:text-foreground"
            style={{ width: LABEL_W }}
          >
            <IconPlus className="size-3" /> Add shot
          </button>
        </div>
      </div>
    </div>
  )
}
