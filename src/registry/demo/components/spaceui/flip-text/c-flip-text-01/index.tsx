'use client'

import { FlipText } from '@/registry/components/spaceui/flip-text'

export default function Demo() {
  return (
    <div className="flex w-full items-center justify-center">
      <FlipText className="text-4xl font-semibold text-foreground" duration={1.8}>
        Space UI
      </FlipText>
    </div>
  )
}
