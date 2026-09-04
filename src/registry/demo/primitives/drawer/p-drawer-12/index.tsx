'use client'

import { useMediaQuery } from '@/registry/hooks/browser/use-media-query'
import { Button } from '@/registry/primitives/button'
import {
  Dialog,
  DialogClose,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogPanel,
  DialogPopup,
  DialogTitle,
  DialogTrigger,
} from '@/registry/primitives/dialog'
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

const FORM_TITLE = 'Edit profile'
const FORM_DESCRIPTION = "Make changes to your profile here. Click save when you're done."
const TRIGGER_LABEL = 'Open'
const CANCEL_LABEL = 'Cancel'
const SAVE_LABEL = 'Save'

const formFields = (
  <>
    <Field>
      <FieldLabel>Name</FieldLabel>
      <Input defaultValue="Margaret Welsh" type="text" />
    </Field>
    <Field>
      <FieldLabel>Username</FieldLabel>
      <Input defaultValue="@maggie.welsh" type="text" />
    </Field>
  </>
)

export default function Particle() {
  const isMobile = useMediaQuery('max-md')

  if (isMobile) {
    return (
      <Drawer>
        <DrawerTrigger render={<Button variant="outline" />}>{TRIGGER_LABEL}</DrawerTrigger>
        <DrawerPopup showBar>
          <DrawerHeader>
            <DrawerTitle>{FORM_TITLE}</DrawerTitle>
            <DrawerDescription>{FORM_DESCRIPTION}</DrawerDescription>
          </DrawerHeader>
          <Form className="contents">
            <DrawerPanel className="grid gap-4" scrollable={false}>
              {formFields}
            </DrawerPanel>
            <DrawerFooter>
              <DrawerClose render={<Button variant="ghost" />}>{CANCEL_LABEL}</DrawerClose>
              <Button type="submit">{SAVE_LABEL}</Button>
            </DrawerFooter>
          </Form>
        </DrawerPopup>
      </Drawer>
    )
  }

  return (
    <Dialog>
      <DialogTrigger render={<Button variant="outline" />}>{TRIGGER_LABEL}</DialogTrigger>
      <DialogPopup className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle>{FORM_TITLE}</DialogTitle>
          <DialogDescription>{FORM_DESCRIPTION}</DialogDescription>
        </DialogHeader>
        <Form className="contents">
          <DialogPanel className="grid gap-4">{formFields}</DialogPanel>
          <DialogFooter>
            <DialogClose render={<Button variant="ghost" />}>{CANCEL_LABEL}</DialogClose>
            <Button type="submit">{SAVE_LABEL}</Button>
          </DialogFooter>
        </Form>
      </DialogPopup>
    </Dialog>
  )
}
