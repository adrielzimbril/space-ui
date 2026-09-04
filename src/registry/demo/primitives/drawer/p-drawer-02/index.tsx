import { Button } from '@/registry/primitives/button'
import {
  Drawer,
  DrawerClose,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerPopup,
  DrawerTitle,
  DrawerTrigger,
} from '@/registry/primitives/drawer'

export default function Demo() {
  return (
    <Drawer>
      <DrawerTrigger render={<Button variant="outline" />}>Open drawer</DrawerTrigger>
      <DrawerPopup>
        <DrawerHeader className="text-center">
          <DrawerTitle>Notifications</DrawerTitle>
          <DrawerDescription>This is the description of the drawer.</DrawerDescription>
        </DrawerHeader>
        <DrawerFooter className="justify-center sm:justify-center" variant="bare">
          <DrawerClose render={<Button variant="outline" />}>Close</DrawerClose>
        </DrawerFooter>
      </DrawerPopup>
    </Drawer>
  )
}
