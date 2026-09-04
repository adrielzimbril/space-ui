import { Field, FieldDescription, FieldLabel } from '@/registry/primitives/field'
import { Select, SelectItem, SelectPopup, SelectTrigger, SelectValue } from '@/registry/primitives/select'

const items = [
  { label: 'Select a country', value: null },
  { label: 'United States', value: 'us' },
  { label: 'United Kingdom', value: 'uk' },
  { label: 'Canada', value: 'ca' },
  { label: 'Australia', value: 'au' },
]

export default function Demo() {
  return (
    <Field>
      <FieldLabel>Country</FieldLabel>
      <Select items={items}>
        <SelectTrigger>
          <SelectValue />
        </SelectTrigger>
        <SelectPopup>
          {items.map(({ label, value }) => (
            <SelectItem key={value} value={value}>
              {label}
            </SelectItem>
          ))}
        </SelectPopup>
      </Select>
      <FieldDescription>This is an optional field</FieldDescription>
    </Field>
  )
}
