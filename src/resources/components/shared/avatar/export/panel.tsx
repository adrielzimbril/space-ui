'use client'

import { Button } from '@/registry/primitives/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/registry/primitives/select'
import type { VideoAspect, VideoExportSize } from './dims'

const BACKGROUNDS = [
  { id: 'transparent', label: 'Clear' },
  { id: '#FFFFFF', label: 'White' },
  { id: '#000000', label: 'Black' },
] as const

const ASPECTS: VideoAspect[] = ['1:1', '16:9', '9:16', '4:3']
const SIZES: VideoExportSize[] = [512, 720, 1080, 1440, 2160, 3160]
const FORMATS = ['png', 'svg'] as const

export function AvatarExportPanel({
  videoBg,
  setVideoBg,
  aspect,
  setAspect,
  exportSize,
  setExportSize,
  format,
  setFormat,
  onExport,
}: {
  videoBg: string
  setVideoBg: (value: string) => void
  aspect: VideoAspect
  setAspect: (value: VideoAspect) => void
  exportSize: VideoExportSize
  setExportSize: (value: VideoExportSize) => void
  format: 'png' | 'svg'
  setFormat: (value: 'png' | 'svg') => void
  onExport: () => void
}) {
  const current = BACKGROUNDS.find((item) => item.id === videoBg) ?? BACKGROUNDS[0]

  return (
    <div className="flex flex-col gap-4">
      <span className="text-[0.6875rem] font-semibold text-muted-foreground">Export</span>
      <div className="flex flex-col gap-2">
        <span className="text-[0.6875rem] font-semibold text-muted-foreground">Aspect</span>
        <div className="grid grid-cols-4 gap-1.5">
          {ASPECTS.map((item) => (
            <Button
              key={item}
              type="button"
              size="xs"
              variant={aspect === item ? 'default' : 'secondary'}
              onClick={() => setAspect(item)}
            >
              {item}
            </Button>
          ))}
        </div>
      </div>
      <Select value={String(exportSize)} onValueChange={(value) => value && setExportSize(Number(value) as VideoExportSize)}>
        <SelectTrigger className="h-9 border-0 bg-muted px-3 text-xs">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {SIZES.map((item) => (
            <SelectItem key={item} value={String(item)}>
              {item}p
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <div className="flex flex-col gap-2">
        <span className="text-[0.6875rem] font-semibold text-muted-foreground">Export background</span>
        <Select value={videoBg} onValueChange={(value) => value && setVideoBg(value)}>
          <SelectTrigger className="h-10 border-0 bg-muted px-2.5 text-xs">
            <SelectValue>
              <span className="flex items-center gap-2">
                <span
                  className="size-6 rounded-full border border-border"
                  style={
                    current.id === 'transparent'
                      ? {
                          background: 'repeating-conic-gradient(#d4d4d8 0% 25%, white 0% 50%)',
                          backgroundSize: '8px 8px',
                        }
                      : { background: current.id }
                  }
                />
                {current.label}
              </span>
            </SelectValue>
          </SelectTrigger>
          <SelectContent>
            {BACKGROUNDS.map((bg) => (
              <SelectItem key={bg.id} value={bg.id}>
                <span className="flex items-center gap-2">
                  <span
                    className="size-6 rounded-full border border-border"
                    style={
                      bg.id === 'transparent'
                        ? {
                            background: 'repeating-conic-gradient(#d4d4d8 0% 25%, white 0% 50%)',
                            backgroundSize: '8px 8px',
                          }
                        : { background: bg.id }
                    }
                  />
                  {bg.label}
                </span>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="flex flex-col gap-2">
        <span className="text-[0.6875rem] font-semibold text-muted-foreground">Format</span>
        <div className="grid grid-cols-2 gap-1.5">
          {FORMATS.map((item) => (
            <Button
              key={item}
              type="button"
              size="sm"
              variant={format === item ? 'default' : 'secondary'}
              className="uppercase"
              onClick={() => setFormat(item)}
            >
              {item}
            </Button>
          ))}
        </div>
        <Button type="button" size="sm" onClick={onExport}>
          Download
        </Button>
      </div>
    </div>
  )
}
