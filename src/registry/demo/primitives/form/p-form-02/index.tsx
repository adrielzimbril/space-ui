'use client'

import type { FormEvent } from 'react'
import { useState } from 'react'
import { z } from 'zod-v4'
import { Button } from '@/registry/primitives/button'
import { Field, FieldError, FieldLabel } from '@/registry/primitives/field'
import { Form } from '@/registry/primitives/form'
import { Input } from '@/registry/primitives/input'

const schema = z.object({
  age: z.coerce.number({ message: 'Please enter a number.' }).positive({ message: 'Number must be positive.' }),
  name: z.string().min(1, { message: 'Please enter a name.' }),
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
    errors: {} as Errors,
  }
}

export default function Demo() {
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState<Errors>({})

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    setLoading(true)
    const response = await submitForm(event)
    await new Promise((r) => setTimeout(r, 800))
    setErrors(response.errors)
    setLoading(false)
    if (Object.keys(response.errors).length === 0) {
      alert(`Name: ${String(formData.get('name') || '')}\nAge: ${String(formData.get('age') || '')}`)
    }
  }

  return (
    <Form className="flex w-full flex-col gap-4" errors={errors} onSubmit={onSubmit}>
      <Field name="name">
        <FieldLabel>Name</FieldLabel>
        <Input placeholder="Enter name" />
        <FieldError />
      </Field>
      <Field name="age">
        <FieldLabel>Age</FieldLabel>
        <Input placeholder="Enter age" />
        <FieldError />
      </Field>
      <Button loading={loading} type="submit">
        Submit
      </Button>
    </Form>
  )
}
