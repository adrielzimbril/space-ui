import { Checkbox } from '@/registry/primitives/checkbox'
import { Field, FieldLabel } from '@/registry/primitives/field'

export default function Demo() {
  return (
    <Field>
      <FieldLabel>
        <Checkbox />
        Accept terms and conditions
      </FieldLabel>
    </Field>
  )
}
