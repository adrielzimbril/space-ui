import { IconPlus } from '@tabler/icons-react'
import { Button } from '@/registry/primitives/button'
import { Group, GroupSeparator } from '@/registry/primitives/group'
import { Input } from '@/registry/primitives/input'

export default function Demo() {
  return (
    <Group aria-label="Add item">
      <Button aria-label="Add" size="icon" variant="outline">
        <IconPlus aria-hidden="true" />
      </Button>
      <GroupSeparator />
      <Input aria-label="Item name" placeholder="Enter item name" type="text" />
    </Group>
  )
}
