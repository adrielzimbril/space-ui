import { IconSearch } from '@tabler/icons-react'
import { Badge } from '@/registry/primitives/badge'
import { Button } from '@/registry/primitives/button'
import { InputGroup, InputGroupAddon, InputGroupInput } from '@/registry/primitives/input-group'
import { Menu, MenuItem, MenuPopup, MenuTrigger } from '@/registry/primitives/menu'

export default function Demo() {
  return (
    <InputGroup>
      <InputGroupInput defaultValue="hello@spaceui.one" placeholder="Enter email" type="email" />
      <InputGroupAddon align="inline-end">
        <Badge variant="info">Primary</Badge>
        <Menu>
          <MenuTrigger render={<Button aria-label="Open menu" size="icon-xs" variant="ghost" />}>
            <IconSearch />
          </MenuTrigger>
          <MenuPopup align="end" alignOffset={-4} sideOffset={8}>
            <MenuItem disabled>Make Primary</MenuItem>
            <MenuItem variant="destructive">Delete</MenuItem>
          </MenuPopup>
        </Menu>
      </InputGroupAddon>
    </InputGroup>
  )
}
