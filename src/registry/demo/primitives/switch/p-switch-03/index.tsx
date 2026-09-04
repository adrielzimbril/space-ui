'use client'

import { useId } from 'react'
import { Label } from '@/registry/primitives/label'
import { Switch } from '@/registry/primitives/switch'

export default function Demo() {
  const id = useId()

  return (
    <Label
      className="flex items-center gap-6 rounded-xl border p-3 hover:bg-accent/50 has-data-checked:border-primary/25 has-data-checked:bg-accent/50"
      htmlFor={id}
    >
      <div className="flex flex-col gap-1">
        <p>Enable notifications</p>
        <p className="text-muted-foreground text-xs">You can enable or disable notifications at any time.</p>
      </div>
      <Switch className="[--thumb-size:--spacing(4)] sm:[--thumb-size:--spacing(3)]" defaultChecked id={id} />
    </Label>
  )
}
