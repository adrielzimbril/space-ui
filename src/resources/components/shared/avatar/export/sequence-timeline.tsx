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
import { SortableContext, arrayMove, horizontalListSortingStrategy, useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { IconGripVertical, IconPlus, IconTrash } from '@tabler/icons-react'
import { Squishmoji } from '@usespaceui/squishmoji/react'
import { Button } from '@/registry/primitives/button'
import { Slider } from '@/registry/primitives/slider'
import { cn } from '@/registry/lib/utils'
import type { SequenceStep } from './squish-video'

const PX_PER_SEC = 88

function Clip({
  step,
  selected,
  onSelect,
  onRemove,
}: {
  step: SequenceStep
  selected: boolean
  onSelect: () => void
  onRemove: () => void
}) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: step.id })

  return (
    <div
      ref={setNodeRef}
      style={{
        width: Math.max(112, step.durationSec * PX_PER_SEC),
        transform: CSS.Transform.toString(transform),
        transition,
      }}
      className={cn(
        'relative flex h-24 shrink-0 flex-col overflow-hidden rounded-xl border bg-muted',
        selected ? 'border-foreground' : 'border-transparent',
        isDragging && 'z-10 opacity-80',
      )}
    >
      <button type="button" className="flex min-h-0 flex-1 items-center gap-2 px-2 text-start" onClick={onSelect}>
        <span {...attributes} {...listeners} className="grid size-6 shrink-0 cursor-grab place-items-center text-muted-foreground active:cursor-grabbing">
          <IconGripVertical className="size-4" />
        </span>
        <Squishmoji
          seed={step.seed}
          size={40}
          shape={step.shape}
          expression={step.expression}
          backgroundStyle={step.backgroundStyle}
          animate={false}
          frozenAt={0}
        />
        <span className="min-w-0 flex-1">
          <span className="block truncate text-xs font-medium">{step.seed}</span>
          <span className="block truncate text-[0.625rem] capitalize text-muted-foreground">
            {step.shape} · {step.expression} · {step.durationSec.toFixed(1)}s
          </span>
        </span>
      </button>
      <button
        type="button"
        aria-label="Remove clip"
        onClick={onRemove}
        className="absolute top-1.5 right-1.5 grid size-6 place-items-center rounded-md text-muted-foreground hover:text-foreground"
      >
        <IconTrash className="size-3.5" />
      </button>
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
  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 6 } }))
  const total = sequence.reduce((sum, step) => sum + step.durationSec, 0)
  const selected = sequence.find((step) => step.id === selectedId) ?? sequence[0]
  const ticks = useMemo(() => {
    const count = Math.max(1, Math.ceil(total) + 1)
    return Array.from({ length: count }, (_, index) => index)
  }, [total])

  const onDragEnd = (event: DragEndEvent) => {
    const { active, over } = event
    if (!over || active.id === over.id) return
    const oldIndex = sequence.findIndex((step) => step.id === active.id)
    const newIndex = sequence.findIndex((step) => step.id === over.id)
    if (oldIndex < 0 || newIndex < 0) return
    onReorder(arrayMove(sequence, oldIndex, newIndex))
  }

  return (
    <div className="flex flex-col gap-3 rounded-2xl bg-background p-3">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div>
          <p className="text-xs font-semibold">Sequence</p>
          <p className="text-[0.625rem] text-muted-foreground">{total.toFixed(1)}s · drag clips to reorder</p>
        </div>
        <div className="flex items-center gap-1.5">
          <Button type="button" size="sm" variant="secondary" onClick={onAdd}>
            <IconPlus className="size-4" /> Add clip
          </Button>
          <Button type="button" size="sm" disabled={sequence.length === 0} onClick={onExport}>
            Export video
          </Button>
        </div>
      </div>

      <div className="overflow-x-auto" data-lenis-prevent="true">
        <div className="relative min-w-full" style={{ width: Math.max(total * PX_PER_SEC + 24, 320) }}>
          <div className="mb-2 flex border-b border-border pb-1">
            {ticks.map((tick) => (
              <span
                key={tick}
                className="shrink-0 text-[0.625rem] tabular-nums text-muted-foreground"
                style={{ width: PX_PER_SEC }}
              >
                {tick}s
              </span>
            ))}
          </div>
          {sequence.length === 0 ? (
            <p className="py-6 text-center text-xs text-muted-foreground">Add the current avatar as a clip.</p>
          ) : (
            <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={onDragEnd}>
              <SortableContext items={sequence.map((step) => step.id)} strategy={horizontalListSortingStrategy}>
                <div className="flex gap-2">
                  {sequence.map((step) => (
                    <Clip
                      key={step.id}
                      step={step}
                      selected={selected?.id === step.id}
                      onSelect={() => setSelectedId(step.id)}
                      onRemove={() => onRemove(step.id)}
                    />
                  ))}
                </div>
              </SortableContext>
            </DndContext>
          )}
        </div>
      </div>

      {selected ? (
        <div className="flex flex-wrap items-center gap-3 rounded-xl bg-muted px-3 py-2">
          <span className="text-xs font-medium">{selected.durationSec.toFixed(1)}s</span>
          <Slider
            className="max-w-56 flex-1"
            min={0.5}
            max={10}
            step={0.5}
            value={[selected.durationSec]}
            onValueChange={(value) => {
              const next = Array.isArray(value) ? value[0] : value
              if (typeof next === 'number') onUpdate(selected.id, { durationSec: next })
            }}
          />
          <Button
            type="button"
            size="xs"
            variant={selected.blink ? 'default' : 'secondary'}
            onClick={() => onUpdate(selected.id, { blink: !selected.blink })}
          >
            Blink
          </Button>
          <Button
            type="button"
            size="xs"
            variant={selected.wobble ? 'default' : 'secondary'}
            onClick={() => onUpdate(selected.id, { wobble: !selected.wobble })}
          >
            Wobble
          </Button>
          <Button
            type="button"
            size="xs"
            variant={selected.animate ? 'default' : 'secondary'}
            onClick={() => onUpdate(selected.id, { animate: !selected.animate })}
          >
            Anim
          </Button>
        </div>
      ) : null}
    </div>
  )
}
