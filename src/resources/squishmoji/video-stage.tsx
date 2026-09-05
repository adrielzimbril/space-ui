'use client'

import type { ReactNode, RefObject } from 'react'

export function VideoStage({
  stageRef,
  preview,
  seed,
}: {
  stageRef: RefObject<HTMLDivElement | null>
  preview: ReactNode
  seed: string
}) {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-6 px-6">
      <div ref={stageRef} className="grid place-items-center">
        {preview}
      </div>
      <div className="text-center">
        <p className="text-sm font-medium tracking-tight">{seed}</p>
        <p className="mt-1 text-xs text-muted-foreground">This take is recorded. Gallery and mockup stay stills.</p>
      </div>
    </div>
  )
}
