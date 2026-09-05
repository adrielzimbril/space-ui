'use client'

import { Button } from '@/registry/primitives/button'
import { Input } from '@/registry/primitives/input'
import { cn } from '@/registry/lib/utils'
import type { SequenceStep } from './squish-video'

const VIDEO_BACKGROUNDS = [
  { id: 'transparent', label: 'Clear' },
  { id: '#FFFFFF', label: 'White' },
  { id: '#1E293B', label: 'Dark' },
] as const

export function AvatarExportPanel({
  videoBg,
  setVideoBg,
  recording,
  onPng,
  onSvg,
  onToggleRecord,
  onAuto,
  sequence,
  onAddStep,
  onUpdateStep,
  onRemoveStep,
  onExportSequence,
}: {
  videoBg: string
  setVideoBg: (value: string) => void
  recording: boolean
  onPng: () => void
  onSvg: () => void
  onToggleRecord: () => void
  onAuto: () => void
  sequence: SequenceStep[]
  onAddStep: () => void
  onUpdateStep: (index: number, patch: Partial<SequenceStep>) => void
  onRemoveStep: (index: number) => void
  onExportSequence: () => void
}) {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <span className="text-[0.6875rem] font-semibold text-muted-foreground">Export</span>
        <div className="grid grid-cols-2 gap-1.5">
          <Button type="button" size="sm" variant="secondary" onClick={onPng}>
            PNG
          </Button>
          <Button type="button" size="sm" variant="secondary" onClick={onSvg}>
            SVG
          </Button>
          <Button type="button" size="sm" variant={recording ? 'destructive' : 'secondary'} onClick={onToggleRecord}>
            {recording ? 'Stop' : 'Record'}
          </Button>
          <Button type="button" size="sm" variant="secondary" onClick={onAuto}>
            Auto 3s
          </Button>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <span className="text-[0.6875rem] font-semibold text-muted-foreground">Video background</span>
        <div className="flex gap-2">
          {VIDEO_BACKGROUNDS.map((bg) => (
            <button
              key={bg.id}
              type="button"
              aria-label={bg.label}
              title={bg.label}
              onClick={() => setVideoBg(bg.id)}
              className={cn(
                'size-8 rounded-lg border',
                videoBg === bg.id ? 'border-foreground' : 'border-input',
                bg.id === 'transparent' &&
                  'bg-[repeating-conic-gradient(#d4d4d8_0%_25%,white_0%_50%)] bg-[length:10px_10px]',
              )}
              style={bg.id !== 'transparent' ? { background: bg.id } : undefined}
            />
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <span className="text-[0.6875rem] font-semibold text-muted-foreground">Sequence</span>
        <div className="flex max-h-40 flex-col gap-1.5 overflow-auto">
          {sequence.length === 0 ? (
            <p className="text-[0.625rem] text-muted-foreground">No steps yet.</p>
          ) : (
            sequence.map((step, index) => (
              <div key={`${step.seed}-${index}`} className="flex items-center gap-1.5 rounded-lg bg-muted px-2 py-1.5">
                <span className="min-w-0 flex-1 truncate text-[0.625rem]">
                  {index + 1}. {step.shape} · {step.expression}
                </span>
                <Input
                  unstyled
                  type="number"
                  min={0.5}
                  max={10}
                  step={0.5}
                  value={step.durationSec}
                  onChange={(event) => onUpdateStep(index, { durationSec: Number(event.target.value) })}
                  className="h-6 w-10 border border-input bg-background px-1 text-[0.625rem]"
                />
                <button type="button" className="text-xs text-destructive" onClick={() => onRemoveStep(index)}>
                  ×
                </button>
              </div>
            ))
          )}
        </div>
        <div className="grid grid-cols-2 gap-1.5">
          <Button type="button" size="sm" variant="secondary" onClick={onAddStep}>
            Add step
          </Button>
          <Button type="button" size="sm" disabled={sequence.length === 0} onClick={onExportSequence}>
            Export seq
          </Button>
        </div>
      </div>
    </div>
  )
}
