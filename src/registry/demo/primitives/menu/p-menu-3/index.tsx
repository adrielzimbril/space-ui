import { Button } from '@/registry/primitives/button'
import { Menu, MenuCheckboxItem, MenuPopup, MenuTrigger } from '@/registry/primitives/menu'

export default function Particle() {
  return (
    <Menu>
      <MenuTrigger render={<Button variant="outline" />}>Open menu</MenuTrigger>
      <MenuPopup>
        <MenuCheckboxItem defaultChecked>Auto save</MenuCheckboxItem>
        <MenuCheckboxItem>Notifications</MenuCheckboxItem>
      </MenuPopup>
    </Menu>
  )
}
