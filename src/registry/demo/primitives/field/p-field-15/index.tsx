import { Field, FieldLabel } from '@/registry/primitives/field'
import { Switch } from '@/registry/primitives/switch'

export default function Demo() {
  return (
    <Field>
      <FieldLabel>
        <Switch />
        Email notifications
      </FieldLabel>
    </Field>
  )
}
