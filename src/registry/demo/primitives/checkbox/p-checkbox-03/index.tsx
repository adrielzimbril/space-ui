import { Checkbox } from '@/registry/primitives/checkbox'
import { Label } from '@/registry/primitives/label'

export default function Particle() {
  return (
    <Label className="flex items-start gap-2 rounded-xl border p-3 hover:bg-accent/50 has-data-checked:border-primary/25 has-data-checked:bg-accent/50">
      <Checkbox defaultChecked />
      <div className="flex flex-col gap-1">
        <p>Enable notifications</p>
        <p className="text-muted-foreground text-xs">You can enable or disable notifications at any time.</p>
      </div>
    </Label>
  )
}
