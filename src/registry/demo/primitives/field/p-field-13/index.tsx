'use client'

import { Checkbox } from '@/registry/primitives/checkbox'
import { CheckboxGroup } from '@/registry/primitives/checkbox-group'
import { Field, FieldItem, FieldLabel } from '@/registry/primitives/field'
import { Fieldset, FieldsetLegend } from '@/registry/primitives/fieldset'

export default function Demo() {
  return (
    <Field className="gap-2" name="frameworks" render={(props) => <Fieldset {...props} />}>
      <FieldsetLegend className="font-medium text-sm">Frameworks</FieldsetLegend>
      <CheckboxGroup defaultValue={['react']}>
        <FieldItem>
          <FieldLabel>
            <Checkbox value="react" /> React
          </FieldLabel>
        </FieldItem>
        <FieldItem>
          <FieldLabel>
            <Checkbox value="vue" /> Vue
          </FieldLabel>
        </FieldItem>
        <FieldItem>
          <FieldLabel>
            <Checkbox value="svelte" /> Svelte
          </FieldLabel>
        </FieldItem>
      </CheckboxGroup>
    </Field>
  )
}
