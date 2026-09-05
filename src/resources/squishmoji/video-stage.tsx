'use client'

import type { ReactNode, RefObject } from 'react'
import { IconRefresh } from '@tabler/icons-react'
import { bloomSound } from '@/components/providers/sound-provider'
import { Button } from '@/registry/primitives/button'
import { Input } from '@/registry/primitives/input'
import type { VideoAspect } from '@/resources/components/shared/avatar/export/dims'

export function VideoStage({
  stageRef,
  preview,
  seed = '',
  setSeed,
  placeholder = '',
  onRandomize,
  aspect = '1:1',
  filmstrip,
}: {
  stageRef: RefObject<HTMLDivElement | null>
  preview: ReactNode
  seed?: string
  setSeed: (value: string) => void
  placeholder?: string
  onRandomize: () => void
  aspect?: VideoAspect
  filmstrip?: ReactNode
}) {
  const ratio = (aspect ?? '1:1').replace(':', ' / ')

  return (
    <div className="relative h-full w-full overflow-hidden">
      <div className="flex h-full w-full items-center justify-center p-6 pb-36 pt-16">
        <div
          ref={stageRef}
          className="grid max-h-full max-w-3xl place-items-center overflow-hidden rounded-2xl border border-border/50 bg-muted"
          style={{ aspectRatio: ratio, width: 'min(100%, 42rem)' }}
        >
          {preview}
        </div>
      </div>
      <div className="pointer-events-none absolute inset-x-0 bottom-4 flex flex-col items-center gap-2 px-4">
        <div className="pointer-events-auto">{filmstrip}</div>
        <div className="pointer-events-auto flex items-center gap-1 rounded-full border border-border/60 bg-background/80 px-3 py-1.5 backdrop-blur-md">
          <Input
            unstyled
            value={seed}
            onChange={(event) => setSeed(event.target.value)}
            aria-label="Seed"
            placeholder={placeholder}
            className="w-auto min-w-28 border-0 bg-transparent px-1 text-sm font-medium shadow-none outline-none focus-within:ring-0! [&_input]:h-7 [&_input]:border-none [&_input]:p-0!"
          />
          <Button
            variant="ghost"
            size="icon-sm"
            aria-label="Randomize seed"
            className="rounded-full"
            onClick={() => {
              bloomSound()
              onRandomize()
            }}
          >
            <IconRefresh />
          </Button>
        </div>
      </div>
    </div>
  )
}
