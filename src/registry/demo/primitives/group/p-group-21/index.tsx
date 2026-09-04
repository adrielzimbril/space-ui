import { Group, GroupSeparator } from '@/registry/primitives/group'
import { Label } from '@/registry/primitives/label'
import { NumberField, NumberFieldGroup, NumberFieldInput } from '@/registry/primitives/number-field'

export default function Demo() {
  return (
    <div className="flex flex-col gap-2">
      <Label>Range</Label>
      <Group aria-label="Range input">
        <NumberField aria-label="Min value" className="flex-row items-center gap-0" render={<NumberFieldGroup />}>
          <NumberFieldInput className="text-left" placeholder="From" />
        </NumberField>
        <GroupSeparator />
        <NumberField aria-label="Max value" className="flex-row items-center gap-0" render={<NumberFieldGroup />}>
          <NumberFieldInput className="text-left" placeholder="To" />
        </NumberField>
      </Group>
    </div>
  )
}
