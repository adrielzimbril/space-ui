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
}: {
  stageRef: RefObject<HTMLDivElement | null>
  preview: ReactNode
  seed?: string
  setSeed: (value: string) => void
  placeholder?: string
  onRandomize: () => void
  aspect?: VideoAspect
}) {
  const ratio = (aspect ?? '1:1').replace(':', ' / ')

  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-8 px-6 pb-10 pt-20">
      <div
        ref={stageRef}
        className="@container flex items-center justify-center relative w-full max-w-3xl max-h-[min(62vh,34rem)] text-center overflow-hidden rounded-2xl bg-muted"
        style={{ aspectRatio: ratio }}
      >
        {preview}
      </div>
      <div className="flex flex-wrap items-center justify-center gap-2 text-lg tracking-tight text-muted-foreground">
        <span>Let&apos;s find your squishmoji</span>
        <Input
          unstyled
          value={seed}
          onChange={(event) => setSeed(event.target.value)}
          aria-label="Seed"
          placeholder={placeholder}
          className="w-auto min-w-36 max-w-48 border-0 border-b border-foreground/50 bg-transparent px-0 pb-0.5 text-lg font-medium text-foreground shadow-none outline-none placeholder:text-muted-foreground/50 focus:border-b-foreground focus-within:ring-0! focus-visible:ring-0! [&_input]:h-auto [&_input]:border-none [&_input]:p-0! [&_input]:outline-none [&_input]:ring-0!"
        />
        <Button
          variant="ghost"
          size="icon"
          aria-label="Randomize seed"
          onClick={() => {
            bloomSound()
            onRandomize()
          }}
        >
          <IconRefresh />
        </Button>
      </div>
    </div>
  )
}
