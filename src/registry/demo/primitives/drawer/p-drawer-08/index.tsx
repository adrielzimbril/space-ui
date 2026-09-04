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
import { Field, FieldLabel } from '@/registry/primitives/field'
import { Input } from '@/registry/primitives/input'

export default function Demo() {
  return (
    <Drawer position="right">
      <DrawerTrigger render={<Button variant="outline" />}>Nested inset drawers</DrawerTrigger>
      <DrawerPopup variant="inset">
        <DrawerHeader>
          <DrawerTitle>Manage team member</DrawerTitle>
          <DrawerDescription>View and manage a user in your team.</DrawerDescription>
        </DrawerHeader>
        <DrawerPanel className="grid gap-4">
          <div className="grid gap-1">
            <p className="text-muted-foreground text-sm">Name</p>
            <p className="font-medium text-sm">Bora Baloglu</p>
          </div>
          <div className="grid gap-1">
            <p className="text-muted-foreground text-sm">Email</p>
            <p className="font-medium text-sm">bora@example.com</p>
          </div>
        </DrawerPanel>
        <DrawerFooter>
          <Drawer position="right">
            <DrawerTrigger render={<Button variant="outline" />}>Edit details</DrawerTrigger>
            <DrawerPopup variant="inset">
              <DrawerHeader>
                <DrawerTitle>Edit details</DrawerTitle>
                <DrawerDescription>Make changes to the member&apos;s information.</DrawerDescription>
              </DrawerHeader>
              <DrawerPanel className="grid gap-4">
                <Field>
                  <FieldLabel>Name</FieldLabel>
                  <Input defaultValue="Bora Baloglu" type="text" />
                </Field>
                <Field>
                  <FieldLabel>Email</FieldLabel>
                  <Input defaultValue="bora@example.com" type="email" />
                </Field>
              </DrawerPanel>
              <DrawerFooter>
                <DrawerClose render={<Button variant="ghost" />}>Cancel</DrawerClose>
                <Button type="submit">Save changes</Button>
              </DrawerFooter>
            </DrawerPopup>
          </Drawer>
        </DrawerFooter>
      </DrawerPopup>
    </Drawer>
  )
}
