import { Group, GroupSeparator, GroupText } from '@/registry/primitives/group'
import { Input } from '@/registry/primitives/input'
import { Label } from '@/registry/primitives/label'

export default function Demo() {
  return (
    <Group aria-label="Price input">
      <Input aria-label="Enter the amount" className="text-right" defaultValue="100" id="amount" type="text" />
      <GroupSeparator />
      <GroupText render={<Label aria-label="Currency" htmlFor="amount" />}>USD</GroupText>
    </Group>
  )
}
