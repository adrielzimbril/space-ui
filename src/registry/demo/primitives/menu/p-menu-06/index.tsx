import { Button } from '@/registry/primitives/button'
import {
  Menu,
  MenuGroup,
  MenuGroupLabel,
  MenuItem,
  MenuPopup,
  MenuSeparator,
  MenuTrigger,
} from '@/registry/primitives/menu'

export default function Demo() {
  return (
    <Menu>
      <MenuTrigger render={<Button variant="outline" />}>Open menu</MenuTrigger>
      <MenuPopup>
        <MenuGroup>
          <MenuGroupLabel>Account</MenuGroupLabel>
          <MenuItem>Profile</MenuItem>
          <MenuItem>Billing</MenuItem>
        </MenuGroup>
        <MenuSeparator />
        <MenuGroup>
          <MenuGroupLabel>Support</MenuGroupLabel>
          <MenuItem>Docs</MenuItem>
          <MenuItem>Contact</MenuItem>
        </MenuGroup>
      </MenuPopup>
    </Menu>
  )
}
