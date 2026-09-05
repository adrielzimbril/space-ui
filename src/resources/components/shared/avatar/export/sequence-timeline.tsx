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
          'grid size-12 place-items-center overflow-hidden rounded-full border bg-background',
          selected ? 'border-foreground' : 'border-transparent',
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
      <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 rounded-full bg-background px-1 text-[0.5625rem] tabular-nums text-muted-foreground">
        {step.durationSec.toFixed(1)}s
      </span>
      {selected ? (
        <button
          type="button"
          aria-label="Remove clip"
          onClick={onRemove}
          className="absolute -top-1 -right-1 grid size-4 place-items-center rounded-full bg-background text-muted-foreground"
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
    <div className="flex w-full max-w-3xl flex-col items-end gap-2">
      <div className="flex items-center gap-2 rounded-full border border-border/60 bg-background/80 px-2 py-1.5 backdrop-blur-md">
        <Button type="button" size="icon-sm" variant="ghost" aria-label="Add clip" onClick={onAdd}>
          <IconPlus className="size-4" />
        </Button>
        {sequence.length === 0 ? (
          <span className="px-2 text-[0.625rem] text-muted-foreground">Add clips</span>
        ) : (
          <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={onDragEnd}>
            <SortableContext items={sequence.map((step) => step.id)} strategy={horizontalListSortingStrategy}>
              <div className="flex items-center gap-2 px-1">
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
        <Button type="button" size="sm" className="rounded-full" disabled={sequence.length === 0} onClick={onExport}>
          Export {total > 0 ? `${total.toFixed(1)}s` : ''}
        </Button>
      </div>
      {selected ? (
        <div className="flex items-center gap-2 rounded-full border border-border/60 bg-background/80 px-3 py-1.5 backdrop-blur-md">
          <span className="text-[0.625rem] tabular-nums text-muted-foreground">{selected.durationSec.toFixed(1)}s</span>
          <Slider
            className="w-28"
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
            variant={selected.blink ? 'default' : 'ghost'}
            className="rounded-full"
            onClick={() => onUpdate(selected.id, { blink: !selected.blink })}
          >
            Blink
          </Button>
          <Button
            type="button"
            size="xs"
            variant={selected.wobble ? 'default' : 'ghost'}
            className="rounded-full"
            onClick={() => onUpdate(selected.id, { wobble: !selected.wobble })}
          >
            Wobble
          </Button>
          <Button
            type="button"
            size="xs"
            variant={selected.animate ? 'default' : 'ghost'}
            className="rounded-full"
            onClick={() => onUpdate(selected.id, { animate: !selected.animate })}
          >
            Anim
          </Button>
        </div>
      ) : null}
    </div>
  )
}
