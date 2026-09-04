import { Group, GroupSeparator, GroupText } from '@/registry/primitives/group'
import { Input } from '@/registry/primitives/input'
import { Label } from '@/registry/primitives/label'

export default function Particle() {
  return (
    <Group aria-label="Domain input">
      <Input aria-label="Domain" defaultValue="spaceui" id="domain-suffix" type="text" />
      <GroupSeparator />
      <GroupText render={<Label aria-label="Domain suffix" htmlFor="domain-suffix" />}>.one</GroupText>
    </Group>
  )
}
