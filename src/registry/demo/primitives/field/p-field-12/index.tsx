import { Checkbox } from '@/registry/primitives/checkbox'
import { Field, FieldLabel } from '@/registry/primitives/field'

export default function Particle() {
  return (
    <Field>
      <FieldLabel>
        <Checkbox />
        Accept terms and conditions
      </FieldLabel>
    </Field>
  )
}
