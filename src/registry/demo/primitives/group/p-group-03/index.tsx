import { IconSearch, IconFile, IconShare, IconFolder } from '@tabler/icons-react'
import { Button } from '@/registry/primitives/button'
import { Group, GroupSeparator } from '@/registry/primitives/group'
import { Menu, MenuItem, MenuPopup, MenuTrigger } from '@/registry/primitives/menu'

export default function Demo() {
  return (
    <Group aria-label="File actions">
      <Button size="sm" variant="outline">
        <IconFile aria-hidden="true" />
        Files
      </Button>
      <GroupSeparator />
      <Button size="sm" variant="outline">
        <IconSearch aria-hidden="true" />
        Media
      </Button>
      <GroupSeparator />
      <Menu>
        <MenuTrigger render={<Button aria-label="Menu" size="icon-sm" variant="outline" />}>
          <IconSearch aria-hidden="true" className="size-4" />
        </MenuTrigger>
        <MenuPopup align="end">
          <MenuItem>
            <IconSearch aria-hidden="true" />
            Edit
          </MenuItem>
          <MenuItem>
            <IconSearch aria-hidden="true" />
            Archive
          </MenuItem>
          <MenuItem>
            <IconShare aria-hidden="true" />
            Share
          </MenuItem>
          <MenuItem variant="destructive">
            <IconFolder aria-hidden="true" />
            Delete
          </MenuItem>
        </MenuPopup>
      </Menu>
    </Group>
  )
}
