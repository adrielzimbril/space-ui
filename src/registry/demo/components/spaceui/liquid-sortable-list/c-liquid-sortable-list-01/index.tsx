'use client'

import * as React from 'react'
import { LiquidSortableList, type SortableMember } from '@/registry/components/spaceui/liquid-sortable-list'

const MEMBERS: SortableMember[] = [
  { id: 'guillermo', name: 'Guillermo Rauch', role: 'Frontend Architect', here: true, tint: '#3b82f6' },
  { id: 'marc', name: 'Marc Lou', role: 'Product Builder', here: false, tint: '#8b5cf6' },
  { id: 'pieter', name: 'Pieter Levels', role: 'Autonomous Founder', here: true, tint: '#0ea5e9' },
  { id: 'jony', name: 'Jony Ive', role: 'Design Lead', here: false, tint: '#10b981' },
]

export interface LiquidSortableDemoProps {
  corner?: number
}

export default function Demo({ corner = 20 }: LiquidSortableDemoProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-6 px-4">
      <LiquidSortableList items={MEMBERS} corner={Number(corner)} />
    </div>
  )
}
