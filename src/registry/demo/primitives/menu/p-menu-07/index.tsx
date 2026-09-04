import { Button } from '@/registry/primitives/button'
import {
  Menu,
  MenuItem,
  MenuPopup,
  MenuSub,
  MenuSubPopup,
  MenuSubTrigger,
  MenuTrigger,
} from '@/registry/primitives/menu'

export default function Demo() {
  return (
    <Menu>
      <MenuTrigger render={<Button variant="outline" />}>Open menu</MenuTrigger>
      <MenuPopup>
        <MenuItem>Item one</MenuItem>
        <MenuSub>
          <MenuSubTrigger>More</MenuSubTrigger>
          <MenuSubPopup>
            <MenuItem>Sub item A</MenuItem>
            <MenuItem>Sub item B</MenuItem>
          </MenuSubPopup>
        </MenuSub>
        <MenuItem>Item two</MenuItem>
      </MenuPopup>
    </Menu>
  )
}
