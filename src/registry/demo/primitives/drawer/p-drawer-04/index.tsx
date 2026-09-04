import { Button } from '@/registry/primitives/button'
import {
  Drawer,
  DrawerHeader,
  DrawerPanel,
  DrawerPopup,
  DrawerTitle,
  DrawerTrigger,
} from '@/registry/primitives/drawer'

export default function Demo() {
  return (
    <div className="flex flex-wrap gap-2">
      <Drawer position="right">
        <DrawerTrigger render={<Button variant="outline" />}>Right</DrawerTrigger>
        <DrawerPopup variant="inset">
          <DrawerHeader>
            <DrawerTitle>Right</DrawerTitle>
          </DrawerHeader>
          <DrawerPanel>
            <p className="text-muted-foreground text-sm">Content from the right.</p>
          </DrawerPanel>
        </DrawerPopup>
      </Drawer>
      <Drawer position="left">
        <DrawerTrigger render={<Button variant="outline" />}>Left</DrawerTrigger>
        <DrawerPopup variant="inset">
          <DrawerHeader>
            <DrawerTitle>Left</DrawerTitle>
          </DrawerHeader>
          <DrawerPanel>
            <p className="text-muted-foreground text-sm">Content from the left.</p>
          </DrawerPanel>
        </DrawerPopup>
      </Drawer>
      <Drawer position="top">
        <DrawerTrigger render={<Button variant="outline" />}>Top</DrawerTrigger>
        <DrawerPopup variant="inset">
          <DrawerHeader>
            <DrawerTitle>Top</DrawerTitle>
          </DrawerHeader>
          <DrawerPanel>
            <p className="text-muted-foreground text-sm">Content from the top.</p>
          </DrawerPanel>
        </DrawerPopup>
      </Drawer>
      <Drawer>
        <DrawerTrigger render={<Button variant="outline" />}>Bottom</DrawerTrigger>
        <DrawerPopup variant="inset">
          <DrawerHeader>
            <DrawerTitle>Bottom</DrawerTitle>
          </DrawerHeader>
          <DrawerPanel>
            <p className="text-muted-foreground text-sm">Content from the bottom.</p>
          </DrawerPanel>
        </DrawerPopup>
      </Drawer>
    </div>
  )
}
