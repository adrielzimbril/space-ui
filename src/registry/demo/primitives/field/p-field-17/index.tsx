import { Field, FieldDescription } from '@/registry/primitives/field'
import {
  NumberField,
  NumberFieldDecrement,
  NumberFieldGroup,
  NumberFieldIncrement,
  NumberFieldInput,
  NumberFieldScrubArea,
} from '@/registry/primitives/number-field'

export default function Demo() {
  return (
    <Field>
      <NumberField defaultValue={1} max={100} min={1}>
        <NumberFieldScrubArea label="Quantity" />
        <NumberFieldGroup>
          <NumberFieldDecrement />
          <NumberFieldInput />
          <NumberFieldIncrement />
        </NumberFieldGroup>
      </NumberField>
      <FieldDescription>Choose a value between 1 and 100.</FieldDescription>
    </Field>
  )
}
