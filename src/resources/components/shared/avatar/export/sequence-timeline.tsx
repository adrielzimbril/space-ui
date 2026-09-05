'use client'

import { useState } from 'react'
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
import { IconPlus, IconTrash } from '@tabler/icons-react'
import { Squishmoji } from '@usespaceui/squishmoji/react'
import { Button } from '@/registry/primitives/button'
import { Slider } from '@/registry/primitives/slider'
import { cn } from '@/registry/lib/utils'
import type { SequenceStep } from './squish-video'

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
      style={{ transform: CSS.Transform.toString(transform), transition }}
      className={cn('relative shrink-0', isDragging && 'z-10')}
    >
      <button
        type="button"
        {...attributes}
        {...listeners}
        onClick={onSelect}
        className={cn(
          'grid size-12 place-items-center overflow-hidden rounded-full bg-muted',
          selected && 'ring-1 ring-foreground',
        )}
      >
        <Squishmoji
          seed={step.seed}
          size={40}
          shape={step.shape}
          expression={step.expression}
          backgroundStyle={step.backgroundStyle}
          animate={false}
          frozenAt={0}
        />
      </button>
      <span className="mt-1 block text-center text-[0.5625rem] tabular-nums text-muted-foreground">
        {step.durationSec.toFixed(1)}s
      </span>
      {selected ? (
        <button
          type="button"
          aria-label="Remove clip"
          onClick={onRemove}
          className="absolute -top-0.5 -right-0.5 grid size-4 place-items-center rounded-full bg-muted text-muted-foreground"
        >
          <IconTrash className="size-2.5" />
        </button>
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
  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 6 } }))
  const total = sequence.reduce((sum, step) => sum + step.durationSec, 0)
  const selected = sequence.find((step) => step.id === selectedId) ?? sequence[0]

  const onDragEnd = (event: DragEndEvent) => {
    const { active, over } = event
    if (!over || active.id === over.id) return
    const oldIndex = sequence.findIndex((step) => step.id === active.id)
    const newIndex = sequence.findIndex((step) => step.id === over.id)
    if (oldIndex < 0 || newIndex < 0) return
    onReorder(arrayMove(sequence, oldIndex, newIndex))
  }

  return (
    <div className="flex flex-col gap-3 p-3.5">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <p className="text-xs font-semibold">Sequence</p>
          <span className="text-[0.625rem] text-muted-foreground">{total.toFixed(1)}s · drag to reorder</span>
        </div>
        <div className="flex items-center gap-1.5">
          <Button type="button" size="xs" variant="secondary" onClick={onAdd}>
            <IconPlus className="size-3.5" /> Add
          </Button>
          <Button type="button" size="xs" disabled={sequence.length === 0} onClick={onExport}>
            Export
          </Button>
        </div>
      </div>
      <div className="overflow-x-auto py-1" data-lenis-prevent="true">
        {sequence.length === 0 ? (
          <p className="text-xs text-muted-foreground">Add the current take as a clip.</p>
        ) : (
          <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={onDragEnd}>
            <SortableContext items={sequence.map((step) => step.id)} strategy={horizontalListSortingStrategy}>
              <div className="flex items-start gap-3">
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
      {selected ? (
        <div className="flex flex-wrap items-center gap-2 rounded-xl bg-muted px-3 py-2">
          <span className="text-[0.6875rem] font-semibold tabular-nums text-muted-foreground">
            {selected.durationSec.toFixed(1)}s
          </span>
          <Slider
            className="min-w-32 max-w-56 flex-1"
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
