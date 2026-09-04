import { IconArrowLeft, IconArrowRight } from '@tabler/icons-react'
import { Button } from '@/registry/primitives/button'
import { Group, GroupSeparator } from '@/registry/primitives/group'

export default function Demo() {
  return (
    <Group aria-label="Pagination">
      <Group aria-label="Page numbers">
        <Button className="min-w-8" variant="outline">
          1
        </Button>
        <GroupSeparator />
        <Button className="min-w-8" variant="outline">
          2
        </Button>
        <GroupSeparator />
        <Button className="min-w-8" variant="outline">
          3
        </Button>
        <GroupSeparator />
        <Button className="min-w-8" variant="outline">
          4
        </Button>
        <GroupSeparator />
        <Button className="min-w-8" variant="outline">
          5
        </Button>
      </Group>
      <Group aria-label="Navigation">
        <Button aria-label="Previous" size="icon" variant="outline">
          <IconArrowLeft aria-hidden="true" />
        </Button>
        <GroupSeparator />
        <Button aria-label="Next" size="icon" variant="outline">
          <IconArrowRight aria-hidden="true" />
        </Button>
      </Group>
    </Group>
  )
}
