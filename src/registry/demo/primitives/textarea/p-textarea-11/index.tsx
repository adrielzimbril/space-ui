import { Field, FieldError, FieldLabel } from '@/registry/primitives/field'
import { Textarea } from '@/registry/primitives/textarea'

export default function Demo() {
  return (
    <Field>
      <FieldLabel>
        Message <span className="text-destructive-foreground">*</span>
      </FieldLabel>
      <Textarea placeholder="Type your message here" required />
      <FieldError>Please fill out this field.</FieldError>
    </Field>
  )
}
