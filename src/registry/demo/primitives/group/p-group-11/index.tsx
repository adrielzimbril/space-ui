import { IconChevronDown, IconGitFork } from '@tabler/icons-react'
import { Badge } from '@/registry/primitives/badge'
import { Button } from '@/registry/primitives/button'
import { Group, GroupSeparator } from '@/registry/primitives/group'
import { Popover, PopoverDescription, PopoverPopup, PopoverTitle, PopoverTrigger } from '@/registry/primitives/popover'

export default function Particle() {
  return (
    <Group aria-label="Repository actions">
      <Button variant="outline">
        <IconGitFork aria-hidden="true" />
        Fork
        <Badge variant="secondary">48</Badge>
      </Button>
      <GroupSeparator />
      <Popover>
        <PopoverTrigger render={<Button aria-label="Send options" size="icon" variant="outline" />}>
          <IconChevronDown aria-hidden="true" />
        </PopoverTrigger>
        <PopoverPopup align="end" className="w-64">
          <PopoverTitle className="text-base">Existing forks</PopoverTitle>
          <PopoverDescription>You don't have any forks of this repository.</PopoverDescription>
        </PopoverPopup>
      </Popover>
    </Group>
  )
}
