'use client'

import type { FormEvent } from 'react'
import { useState } from 'react'
import { Button } from '@/registry/primitives/button'
import { Checkbox } from '@/registry/primitives/checkbox'
import { CheckboxGroup } from '@/registry/primitives/checkbox-group'
import { Field, FieldItem, FieldLabel } from '@/registry/primitives/field'
import { Fieldset, FieldsetLegend } from '@/registry/primitives/fieldset'
import { Form } from '@/registry/primitives/form'

export default function Demo() {
  const [loading, setLoading] = useState(false)
  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    setLoading(true)
    await new Promise((r) => setTimeout(r, 800))
    setLoading(false)
    const frameworks = formData.getAll('frameworks') as string[]
    alert(`Selected: ${frameworks.join(', ') || 'none'}`)
  }

  return (
    <Form className="flex w-full max-w-[160px] flex-col gap-4" onSubmit={onSubmit}>
      <Field name="frameworks" render={(props) => <Fieldset {...props} />}>
        <FieldsetLegend className="font-medium text-sm">Frameworks</FieldsetLegend>
        <CheckboxGroup defaultValue={['next']}>
          <FieldItem>
            <FieldLabel>
              <Checkbox value="next" />
              Next.js
            </FieldLabel>
          </FieldItem>
          <FieldItem>
            <FieldLabel>
              <Checkbox value="vite" />
              Vite
            </FieldLabel>
          </FieldItem>
          <FieldItem>
            <FieldLabel>
              <Checkbox value="astro" />
              Astro
            </FieldLabel>
          </FieldItem>
        </CheckboxGroup>
      </Field>
      <Button loading={loading} type="submit">
        Submit
      </Button>
    </Form>
  )
}
