'use client'

import * as React from 'react'
import { Button } from '@/registry/primitives/button'
import { MorphIcon } from '@/registry/components/spaceui/morph-icon'
import { IconClock, IconLoader2, IconCheck, IconAlertTriangle } from '@tabler/icons-react'

type StepStatus = 'idle' | 'loading' | 'success' | 'error'

const STATUS_CONFIG: Record<
  StepStatus,
  { label: string; desc: string; icon: React.ComponentType<{ className?: string }> }
> = {
  idle: { label: 'Pending', desc: 'Awaiting user action', icon: IconClock },
  loading: { label: 'Processing', desc: 'Task currently running', icon: IconLoader2 },
  success: { label: 'Completed', desc: 'Operation succeeded', icon: IconCheck },
  error: { label: 'Failed', desc: 'An error occurred', icon: IconAlertTriangle },
}

export default function MultiStateDemo() {
  const [status, setStatus] = React.useState<StepStatus>('idle')

  const cycleStatus = () => {
    setStatus((prev) => {
      if (prev === 'idle') return 'loading'
      if (prev === 'loading') return 'success'
      if (prev === 'success') return 'error'
      return 'idle'
    })
  }

  const { label, desc, icon: CurrentIcon } = STATUS_CONFIG[status]

  return (
    <div className="flex flex-col items-center gap-5 p-8">
      <div className="flex items-center gap-4 p-4 rounded-2xl border border-border bg-card shadow-xs min-w-72">
        <div className="flex items-center justify-center size-12 rounded-xl bg-muted">
          <MorphIcon activeKey={status} variant="blur-scale" duration={0.25}>
            <CurrentIcon className={`size-5 ${status === 'loading' ? 'animate-spin' : ''}`} />
          </MorphIcon>
        </div>

        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-foreground">{label}</p>
          <p className="text-xs text-muted-foreground truncate">{desc}</p>
        </div>
      </div>

      <Button variant="outline" size="sm" onClick={cycleStatus} className="rounded-lg text-xs cursor-pointer">
        Next State (Cycle)
      </Button>
    </div>
  )
}
