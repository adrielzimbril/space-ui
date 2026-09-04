import { Field, FieldError, FieldLabel } from '@/registry/primitives/field'
import { Input } from '@/registry/primitives/input'

export default function Demo() {
  return (
    <Field>
      <FieldLabel>
        Password <span className="text-destructive-foreground">*</span>
      </FieldLabel>
      <Input placeholder="Enter password" required type="password" />
      <FieldError>Please fill out this field.</FieldError>
    </Field>
  )
}
