import Link from 'next/link'
import { Button } from '@/registry/primitives/button'
import {
  Drawer,
  DrawerClose,
  DrawerHeader,
  DrawerPanel,
  DrawerPopup,
  DrawerTitle,
  DrawerTrigger,
} from '@/registry/primitives/drawer'

export default function Particle() {
  return (
    <Drawer position="left">
      <DrawerTrigger render={<Button variant="outline" />}>Open menu</DrawerTrigger>
      <DrawerPopup showCloseButton variant="straight">
        <DrawerHeader>
          <DrawerTitle>Menu</DrawerTitle>
        </DrawerHeader>
        <DrawerPanel>
          <nav className="-mx-[calc(--spacing(3)-1px)] flex flex-col gap-0.5">
            <DrawerClose
              nativeButton={false}
              render={<Button className="justify-start" render={<Link href="#" />} variant="ghost" />}
            >
              Home
            </DrawerClose>
            <DrawerClose
              nativeButton={false}
              render={<Button className="justify-start" render={<Link href="#" />} variant="ghost" />}
            >
              Profile
            </DrawerClose>
            <DrawerClose
              nativeButton={false}
              render={<Button className="justify-start" render={<Link href="#" />} variant="ghost" />}
            >
              Settings
            </DrawerClose>
            <DrawerClose
              nativeButton={false}
              render={<Button className="justify-start" render={<Link href="#" />} variant="ghost" />}
            >
              Sign out
            </DrawerClose>
          </nav>
        </DrawerPanel>
      </DrawerPopup>
    </Drawer>
  )
}
