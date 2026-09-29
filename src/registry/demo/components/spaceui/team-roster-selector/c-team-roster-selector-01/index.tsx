'use client'

import { TeamRosterSelector, type TeamMember } from '@/registry/components/spaceui/team-roster-selector'
import { toastManager } from '@/registry/primitives/toast'

const MEMBERS: TeamMember[] = [
  { id: 'guillermo', name: 'Guillermo Rauch', handle: '@rauchg', role: 'Frontend Architect' },
  { id: 'marc', name: 'Marc Lou', handle: '@marclou', role: 'Product Builder' },
  { id: 'pieter', name: 'Pieter Levels', handle: '@levelsio', role: 'Autonomous Founder' },
  { id: 'jony', name: 'Jony Ive', handle: '@jony', role: 'Industrial Form' },
]

export interface TeamRosterDemoProps {
  corner?: number
  maxDisplay?: number
}

export default function Demo({ corner = 24, maxDisplay = 5 }: TeamRosterDemoProps) {
  const [selected, setSelected] = React.useState<string[]>(['guillermo'])

  return (
    <div className="flex flex-col items-center justify-center gap-3 py-6 px-4">
      <TeamRosterSelector
        members={MEMBERS}
        corner={Number(corner)}
        maxDisplay={Number(maxDisplay)}
        selectedIds={selected}
        onSelectionChange={setSelected}
        onAction={(ids) => {
          toastManager.add({
            type: 'success',
            title: 'Members assigned',
            description: `Successfully assigned ${ids.length} member${ids.length > 1 ? 's' : ''} to the project.`,
          })
        }}
      />
    </div>
  )
}
