'use client'

import type { FormEvent } from 'react'
import { useState } from 'react'
import { Button } from '@/registry/primitives/button'
import { Checkbox } from '@/registry/primitives/checkbox'
import { Field, FieldLabel } from '@/registry/primitives/field'
import { Form } from '@/registry/primitives/form'

export default function Demo() {
  const [loading, setLoading] = useState(false)
  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    setLoading(true)
    await new Promise((r) => setTimeout(r, 800))
    setLoading(false)
    const accepted = formData.get('terms')
    alert(`Terms: ${accepted}`)
  }
  return (
    <Form className="flex w-auto flex-col gap-4" onSubmit={onSubmit}>
      <Field name="terms">
        <FieldLabel>
          <Checkbox defaultChecked value="yes" />
          Accept terms and conditions
        </FieldLabel>
      </Field>
      <Button loading={loading} type="submit">
        Submit
      </Button>
    </Form>
  )
}
