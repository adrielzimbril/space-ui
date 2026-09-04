import { Field, FieldError, FieldLabel } from '@/registry/primitives/field'
import { Input } from '@/registry/primitives/input'

export default function FieldWithErrorDemo() {
  return (
    <Field>
      <FieldLabel>Email</FieldLabel>
      <Input placeholder="Enter your email" type="email" />
      <FieldError>Please enter a valid email address.</FieldError>
    </Field>
  )
}
