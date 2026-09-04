import Link from 'next/link'
import { Button } from '@/registry/primitives/button'
import { Menu, MenuLinkItem, MenuPopup, MenuTrigger } from '@/registry/primitives/menu'

export default function Particle() {
  return (
    <Menu>
      <MenuTrigger render={<Button variant="outline" />}>Open menu</MenuTrigger>
      <MenuPopup>
        <MenuLinkItem render={<Link href="/docs" />}>Docs</MenuLinkItem>
        <MenuLinkItem render={<Link href="/particles" />}>Particles</MenuLinkItem>
      </MenuPopup>
    </Menu>
  )
}
