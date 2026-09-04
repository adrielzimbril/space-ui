'use client'

import type { FormEvent } from 'react'
import { useState } from 'react'
import { z } from 'zod-v4'
import { Button } from '@/registry/primitives/button'
import { Field } from '@/registry/primitives/field'
import { Form } from '@/registry/primitives/form'
import {
  NumberField,
  NumberFieldDecrement,
  NumberFieldGroup,
  NumberFieldIncrement,
  NumberFieldInput,
  NumberFieldScrubArea,
} from '@/registry/primitives/number-field'

const schema = z.object({
  quantity: z.coerce
    .number({ message: 'Please enter a quantity.' })
    .min(1, { message: 'Quantity must be at least 1.' })
    .max(100, { message: 'Maximum quantity is 100.' }),
})

type Errors = Record<string, string | string[]>

async function submitForm(event: FormEvent<HTMLFormElement>) {
  event.preventDefault()

  const formData = new FormData(event.currentTarget)
  const result = schema.safeParse(Object.fromEntries(formData))

  if (!result.success) {
    const { fieldErrors } = z.flattenError(result.error)
    return { errors: fieldErrors as Errors }
  }

  return {
    data: result.data,
    errors: {} as Errors,
  }
}

export default function Demo() {
  const [loading, setLoading] = useState(false)

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    setLoading(true)
    const response = await submitForm(event)
    await new Promise((r) => setTimeout(r, 800))
    setLoading(false)
    if (Object.keys(response.errors).length === 0) {
      alert(`Quantity: ${response.data?.quantity}`)
    }
  }

  return (
    <Form className="flex w-full flex-col gap-4" onSubmit={onSubmit}>
      <Field name="quantity">
        <NumberField defaultValue={1} max={100} min={1}>
          <NumberFieldScrubArea label="Quantity" />
          <NumberFieldGroup>
            <NumberFieldDecrement />
            <NumberFieldInput />
            <NumberFieldIncrement />
          </NumberFieldGroup>
        </NumberField>
      </Field>

      <Button loading={loading} type="submit">
        Submit
      </Button>
    </Form>
  )
}
