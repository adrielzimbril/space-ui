import { Group, GroupSeparator, GroupText } from '@/registry/primitives/group'
import { Input } from '@/registry/primitives/input'
import { Label } from '@/registry/primitives/label'

export default function Particle() {
  return (
    <Group aria-label="Domain input">
      <GroupText render={<Label aria-label="Domain" htmlFor="domain" />}>https://</GroupText>
      <GroupSeparator />
      <Input aria-label="Domain" defaultValue="spaceui.one" id="domain" type="text" />
    </Group>
  )
}
