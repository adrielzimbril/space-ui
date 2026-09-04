import { Button } from '@/registry/primitives/button'
import { Group } from '@/registry/primitives/group'
import { Input } from '@/registry/primitives/input'

export default function Particle() {
  return (
    <Group aria-label="Email subscription" className="gap-2">
      <Input aria-label="Email" className="flex-1" placeholder="you@example.com" type="email" />
      <div>
        <Button variant="outline">Send</Button>
      </div>
    </Group>
  )
}
