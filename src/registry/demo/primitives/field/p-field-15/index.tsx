import { Field, FieldLabel } from '@/registry/primitives/field'
import { Switch } from '@/registry/primitives/switch'

export default function Particle() {
  return (
    <Field>
      <FieldLabel>
        <Switch />
        Email notifications
      </FieldLabel>
    </Field>
  )
}
