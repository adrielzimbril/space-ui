import { Button } from '@/registry/primitives/button'
import { Group, GroupSeparator } from '@/registry/primitives/group'
import { Input } from '@/registry/primitives/input'

export default function Particle() {
  return (
    <Group aria-label="Email subscription">
      <Input aria-label="Email" placeholder="Email" type="email" />
      <GroupSeparator />
      <Button variant="outline">Subscribe</Button>
    </Group>
  )
}
