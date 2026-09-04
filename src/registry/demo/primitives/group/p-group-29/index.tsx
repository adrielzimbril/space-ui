import { IconFileText, IconPencil, IconUpload } from '@tabler/icons-react'
import { Badge } from '@/registry/primitives/badge'

import { Button } from '@/registry/primitives/button'
import { Group, GroupSeparator } from '@/registry/primitives/group'
export default function Demo() {
  return (
    <Group>
      <Button variant="outline">
        <IconFileText aria-hidden="true" />
        <Badge variant="warning">Draft</Badge>
      </Button>
      <GroupSeparator />
      <Button variant="outline">
        <IconPencil aria-hidden="true" />
        <span>Edit</span>
      </Button>
      <GroupSeparator />
      <Button variant="outline" size="icon">
        <IconUpload aria-hidden="true" />
      </Button>
    </Group>
  )
}
