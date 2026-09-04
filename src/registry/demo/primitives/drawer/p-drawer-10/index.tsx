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
import { Form } from '@/registry/primitives/form'
import { Input } from '@/registry/primitives/input'

export default function Particle() {
  return (
    <div className="flex flex-wrap gap-2">
      <Drawer position="right">
        <DrawerTrigger render={<Button variant="outline" />}>Default footer</DrawerTrigger>
        <DrawerPopup variant="inset">
          <DrawerHeader>
            <DrawerTitle>Edit profile</DrawerTitle>
            <DrawerDescription>Make changes to your profile here. Click save when you&apos;re done.</DrawerDescription>
          </DrawerHeader>
          <Form className="contents">
            <DrawerPanel className="grid gap-4">
              <Field>
                <FieldLabel>Name</FieldLabel>
                <Input defaultValue="Margaret Welsh" type="text" />
              </Field>
              <Field>
                <FieldLabel>Username</FieldLabel>
                <Input defaultValue="@maggie.welsh" type="text" />
              </Field>
            </DrawerPanel>
            <DrawerFooter>
              <DrawerClose render={<Button variant="ghost" />}>Cancel</DrawerClose>
              <Button>Save</Button>
            </DrawerFooter>
          </Form>
        </DrawerPopup>
      </Drawer>
      <Drawer position="right">
        <DrawerTrigger render={<Button variant="outline" />}>Bare footer</DrawerTrigger>
        <DrawerPopup variant="inset">
          <DrawerHeader>
            <DrawerTitle>Edit profile</DrawerTitle>
            <DrawerDescription>Make changes to your profile here. Click save when you&apos;re done.</DrawerDescription>
          </DrawerHeader>
          <Form className="contents">
            <DrawerPanel className="grid gap-4">
              <Field>
                <FieldLabel>Name</FieldLabel>
                <Input defaultValue="Margaret Welsh" type="text" />
              </Field>
              <Field>
                <FieldLabel>Username</FieldLabel>
                <Input defaultValue="@maggie.welsh" type="text" />
              </Field>
            </DrawerPanel>
            <DrawerFooter variant="bare">
              <DrawerClose render={<Button variant="ghost" />}>Cancel</DrawerClose>
              <Button>Save</Button>
            </DrawerFooter>
          </Form>
        </DrawerPopup>
      </Drawer>
    </div>
  )
}
