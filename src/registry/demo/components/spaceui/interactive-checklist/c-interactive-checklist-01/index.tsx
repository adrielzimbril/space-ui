'use client'

import * as React from 'react'
import { InteractiveChecklist, type ChecklistItem } from '@/registry/components/spaceui/interactive-checklist'

const DEMO_ITEMS: ChecklistItem[] = [
  { id: '1', text: 'Book the design studio', done: false },
  { id: '2', text: 'Review component specs', done: false },
  { id: '3', text: 'Select typography scale', done: false },
]

export interface InteractiveChecklistDemoProps {
  corner?: number
}

export default function Demo({ corner = 24 }: InteractiveChecklistDemoProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-6 px-4">
      <InteractiveChecklist defaultItems={DEMO_ITEMS} corner={Number(corner)} />
    </div>
  )
}
