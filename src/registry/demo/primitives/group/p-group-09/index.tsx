import { IconZoomIn, IconZoomOut } from '@tabler/icons-react'
import { Button } from '@/registry/primitives/button'
import { Group, GroupSeparator } from '@/registry/primitives/group'

export default function Demo() {
  return (
    <Group aria-label="Zoom controls" orientation="vertical">
      <Button aria-label="Zoom in" size="icon" variant="outline">
        <IconZoomIn />
      </Button>
      <GroupSeparator orientation="horizontal" />
      <Button aria-label="Zoom Out" size="icon" variant="outline">
        <IconZoomOut />
      </Button>
    </Group>
  )
}
