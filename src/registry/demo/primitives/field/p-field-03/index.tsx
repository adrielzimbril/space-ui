import { Field, FieldDescription, FieldLabel } from '@/registry/primitives/field'
import { Input } from '@/registry/primitives/input'

export default function Demo() {
  return (
    <Field disabled>
      <FieldLabel>Email</FieldLabel>
      <Input disabled placeholder="Enter your email" type="email" />
      <FieldDescription>This field is currently disabled.</FieldDescription>
    </Field>
  )
}
