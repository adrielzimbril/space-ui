'use client'

import { Button } from '@/registry/primitives/button'
import { Field } from '@/registry/primitives/field'
import { Form } from '@/registry/primitives/form'
import { Popover, PopoverDescription, PopoverPopup, PopoverTitle, PopoverTrigger } from '@/registry/primitives/popover'
import { Textarea } from '@/registry/primitives/textarea'

export default function Demo() {
  return (
    <Popover>
      <PopoverTrigger render={<Button variant="outline" />}>Open Popover</PopoverTrigger>
      <PopoverPopup className="w-80">
        <div className="mb-4">
          <PopoverTitle className="text-base">Send us feedback</PopoverTitle>
          <PopoverDescription>Let us know how we can improve.</PopoverDescription>
        </div>
        <Form className="flex w-full flex-col gap-4">
          <Field>
            <Textarea aria-label="Send feedback" id="feedback" placeholder="How can we improve?" />
          </Field>
          <Button type="submit">Send feedback</Button>
        </Form>
      </PopoverPopup>
    </Popover>
  )
}
