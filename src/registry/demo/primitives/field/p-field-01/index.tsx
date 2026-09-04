import { Field, FieldDescription, FieldLabel } from '@/registry/primitives/field'
import { Input } from '@/registry/primitives/input'

export default function Demo() {
  return (
    <Field>
      <FieldLabel>Name</FieldLabel>
      <Input placeholder="Enter your name" type="text" />
      <FieldDescription>Visible on your profile</FieldDescription>
    </Field>
  )
}
