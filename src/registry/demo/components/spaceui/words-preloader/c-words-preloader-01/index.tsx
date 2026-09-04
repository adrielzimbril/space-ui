'use client'

import * as React from 'react'
import { WordsPreloader } from '@/registry/components/spaceui/words-preloader'
import { Button } from '@/registry/primitives/button'

export default function WordsPreloaderDemo() {
  const [key, setKey] = React.useState(0)

  return (
    <div className="relative w-full overflow-hidden rounded-[0.875rem] bg-muted">
      <WordsPreloader key={key} className="min-h-80">
        <p className="text-sm font-semibold text-muted-foreground">Landing page</p>
      </WordsPreloader>
      <div className="absolute bottom-3 left-1/2 z-30 -translate-x-1/2">
        <Button size="sm" onClick={() => setKey((value) => value + 1)}>
          Replay
        </Button>
      </div>
    </div>
  )
}
