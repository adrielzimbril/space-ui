import { Button } from '@/registry/primitives/button'
import {
  Drawer,
  DrawerClose,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerPanel,
  DrawerPopup,
  DrawerTitle,
  DrawerTrigger,
} from '@/registry/primitives/drawer'

export default function Demo() {
  return (
    <Drawer>
      <DrawerTrigger render={<Button variant="outline" />}>Nested drawers</DrawerTrigger>
      <DrawerPopup showBar>
        <DrawerHeader className="text-center">
          <DrawerTitle>First step</DrawerTitle>
          <DrawerDescription>
            This is the first step. Tap the button below to continue to the next screen.
          </DrawerDescription>
        </DrawerHeader>
        <DrawerFooter className="justify-center sm:justify-center" variant="bare">
          <DrawerClose render={<Button variant="ghost" />}>Cancel</DrawerClose>
          <Drawer>
            <DrawerTrigger render={<Button variant="outline" />}>Continue</DrawerTrigger>
            <DrawerPopup showBar>
              <DrawerHeader className="text-center">
                <DrawerTitle>Second step</DrawerTitle>
                <DrawerDescription>
                  You&apos;ve reached the second step. Tap the button below to continue to the next screen.
                </DrawerDescription>
              </DrawerHeader>
              <DrawerPanel>
                <div className="flex justify-center">
                  <div className="size-48 shrink-0 rounded-xl border bg-muted" />
                </div>
              </DrawerPanel>
              <DrawerFooter className="justify-center sm:justify-center" variant="bare">
                <DrawerClose render={<Button variant="ghost" />}>Back</DrawerClose>
                <Drawer>
                  <DrawerTrigger render={<Button variant="outline" />}>Continue</DrawerTrigger>
                  <DrawerPopup showBar>
                    <DrawerHeader className="text-center">
                      <DrawerTitle>Third step</DrawerTitle>
                      <DrawerDescription>
                        You&apos;ve reached the final step. You can close this drawer or go back.
                      </DrawerDescription>
                    </DrawerHeader>
                    <DrawerPanel>
                      <div className="flex justify-center">
                        <div className="size-32 shrink-0 rounded-full border bg-muted" />
                      </div>
                    </DrawerPanel>
                  </DrawerPopup>
                </Drawer>
              </DrawerFooter>
            </DrawerPopup>
          </Drawer>
        </DrawerFooter>
      </DrawerPopup>
    </Drawer>
  )
}
