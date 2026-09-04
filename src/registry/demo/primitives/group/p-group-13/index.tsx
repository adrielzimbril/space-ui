import { IconChevronDown, IconDownload, IconSearch, IconShare } from '@tabler/icons-react'
import { Button } from '@/registry/primitives/button'
import { Group, GroupSeparator } from '@/registry/primitives/group'
import { Menu, MenuItem, MenuPopup, MenuTrigger } from '@/registry/primitives/menu'

export default function Demo() {
  return (
    <Group aria-label="Subscription actions">
      <Button>Subscribe</Button>
      <GroupSeparator className="bg-primary/72" />
      <Menu>
        <MenuTrigger render={<Button aria-label="Copy options" size="icon" />}>
          <IconChevronDown aria-hidden="true" className="size-4" />
        </MenuTrigger>
        <MenuPopup align="end">
          <MenuItem>
            <IconShare aria-hidden="true" />
            Share link
          </MenuItem>
          <MenuItem>
            <IconDownload aria-hidden="true" />
            Download
          </MenuItem>
          <MenuItem>
            <IconSearch aria-hidden="true" />
            Duplicate
          </MenuItem>
        </MenuPopup>
      </Menu>
    </Group>
  )
}
