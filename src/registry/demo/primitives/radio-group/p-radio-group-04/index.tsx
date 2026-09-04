'use client'

import type { FormEvent } from 'react'
import { useState } from 'react'
import { Button } from '@/registry/primitives/button'
import { Field, FieldItem, FieldLabel } from '@/registry/primitives/field'
import { Fieldset, FieldsetLegend } from '@/registry/primitives/fieldset'
import { Form } from '@/registry/primitives/form'
import { Radio, RadioGroup } from '@/registry/primitives/radio-group'

export default function Demo() {
  const [loading, setLoading] = useState(false)

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    setLoading(true)
    await new Promise((r) => setTimeout(r, 800))
    setLoading(false)
    alert(`Selected: ${formData.get('frameworks')}`)
  }

  return (
    <Form className="flex w-full max-w-[160px] flex-col gap-4" onSubmit={onSubmit}>
      <Field className="gap-2" name="frameworks" render={(props) => <Fieldset {...props} />}>
        <FieldsetLegend className="font-medium text-sm">Frameworks</FieldsetLegend>
        <RadioGroup defaultValue="next">
          <FieldItem>
            <FieldLabel>
              <Radio value="next" /> Next.js
            </FieldLabel>
          </FieldItem>
          <FieldItem>
            <FieldLabel>
              <Radio value="vite" /> Vite
            </FieldLabel>
          </FieldItem>
          <FieldItem>
            <FieldLabel>
              <Radio value="astro" /> Astro
            </FieldLabel>
          </FieldItem>
        </RadioGroup>
      </Field>
      <Button loading={loading} type="submit">
        Submit
      </Button>
    </Form>
  )
}
