'use client'

import type { FormEvent } from 'react'
import { useState } from 'react'
import { Button } from '@/registry/primitives/button'
import { Field, FieldError, FieldLabel } from '@/registry/primitives/field'
import { Form } from '@/registry/primitives/form'
import { Textarea } from '@/registry/primitives/textarea'

export default function Demo() {
  const [loading, setLoading] = useState(false)
  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    setLoading(true)
    await new Promise((r) => setTimeout(r, 800))
    setLoading(false)
    alert(`Message: ${formData.get('message') || ''}`)
  }

  return (
    <Form className="flex w-full flex-col gap-4" onSubmit={onSubmit}>
      <Field>
        <FieldLabel>Message</FieldLabel>
        <Textarea name="message" placeholder="Type your message here" required />
        <FieldError>This field is required.</FieldError>
      </Field>
      <Button loading={loading} type="submit">
        Submit
      </Button>
    </Form>
  )
}
