'use client'

import { Button } from '@/registry/primitives/button'
import { cn } from '@/registry/lib/utils'

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
  onBlink,
}: {
  videoBg: string
  setVideoBg: (value: string) => void
  recording: boolean
  onPng: () => void
  onSvg: () => void
  onToggleRecord: () => void
  onAuto: () => void
  onBlink: () => void
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
          <Button type="button" size="sm" variant="secondary" className="col-span-2" onClick={onBlink}>
            Blink
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
    </div>
  )
}
