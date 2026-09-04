import { IconArrowRight } from '@tabler/icons-react'
import { Button } from '@/registry/primitives/button'
import { Field, FieldError, FieldLabel } from '@/registry/primitives/field'
import { InputGroup, InputGroupAddon, InputGroupInput } from '@/registry/primitives/input-group'

export default function Demo() {
  return (
    <Field>
      <FieldLabel>Subscribe</FieldLabel>
      <InputGroup>
        <InputGroupInput placeholder="Your best email" type="email" />
        <InputGroupAddon align="inline-end">
          <Button aria-label="Subscribe" size="icon-xs" variant="ghost">
            <IconArrowRight aria-hidden="true" />
          </Button>
        </InputGroupAddon>
      </InputGroup>
      <FieldError>Please enter a valid email address.</FieldError>
    </Field>
  )
}
