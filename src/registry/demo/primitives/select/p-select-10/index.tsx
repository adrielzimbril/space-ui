'use client'

import type { FormEvent } from 'react'
import { useState } from 'react'
import { Button } from '@/registry/primitives/button'
import { Field, FieldDescription, FieldError, FieldLabel } from '@/registry/primitives/field'
import { Form } from '@/registry/primitives/form'
import { Select, SelectItem, SelectPopup, SelectTrigger, SelectValue } from '@/registry/primitives/select'

const items = [
  { label: 'Next.js', value: 'next' },
  { label: 'Vite', value: 'vite' },
  { label: 'Astro', value: 'astro' },
]

export default function Demo() {
  const [loading, setLoading] = useState(false)
  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    setLoading(true)
    await new Promise((r) => setTimeout(r, 800))
    setLoading(false)
    alert(`Framework: ${formData.get('framework') || ''}`)
  }

  return (
    <Form className="flex w-full flex-col gap-4" onSubmit={onSubmit}>
      <Field>
        <FieldLabel>Framework</FieldLabel>
        <Select aria-label="Select framework" items={items} name="framework" required>
          <SelectTrigger>
            <SelectValue placeholder="Select a framework" />
          </SelectTrigger>
          <SelectPopup>
            {items.map(({ label, value }) => (
              <SelectItem key={value} value={value}>
                {label}
              </SelectItem>
            ))}
          </SelectPopup>
        </Select>
        <FieldDescription>Pick your favorite.</FieldDescription>
        <FieldError>Please select a value.</FieldError>
      </Field>

      <Button loading={loading} type="submit">
        Submit
      </Button>
    </Form>
  )
}
