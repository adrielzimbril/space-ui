'use client'

import type { FormEvent } from 'react'
import { useState } from 'react'
import { Button } from '@/registry/primitives/button'
import { Checkbox } from '@/registry/primitives/checkbox'
import { Field, FieldDescription, FieldError, FieldLabel } from '@/registry/primitives/field'
import { Form } from '@/registry/primitives/form'
import { Input } from '@/registry/primitives/input'
import { Select, SelectItem, SelectPopup, SelectTrigger, SelectValue } from '@/registry/primitives/select'

export default function Particle() {
  const [loading, setLoading] = useState(false)
  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    setLoading(true)
    await new Promise((r) => setTimeout(r, 800))
    setLoading(false)
    const data = {
      email: formData.get('email'),
      fullName: formData.get('fullName'),
      newsletter: formData.get('newsletter'),
      role: formData.get('role'),
    }
    alert(
      `Full name: ${data.fullName || ''}\nEmail: ${data.email || ''}\nRole: ${
        data.role || ''
      }\nNewsletter: ${data.newsletter}`,
    )
  }
  return (
    <Form className="flex w-full flex-col gap-4" onSubmit={onSubmit}>
      <Field name="fullName">
        <FieldLabel>
          Full Name <span className="text-destructive">*</span>
        </FieldLabel>
        <Input placeholder="John Doe" required type="text" />
        <FieldError>Please enter a valid name.</FieldError>
      </Field>

      <Field name="email">
        <FieldLabel>
          Email <span className="text-destructive">*</span>
        </FieldLabel>
        <Input placeholder="john@example.com" required type="email" />
        <FieldError>Please enter a valid email.</FieldError>
      </Field>

      <Field name="role">
        <FieldLabel>Role</FieldLabel>
        <Select
          items={[
            { label: 'Select your role', value: null },
            { label: 'Developer', value: 'developer' },
            { label: 'Designer', value: 'designer' },
            { label: 'Product Manager', value: 'manager' },
            { label: 'Other', value: 'other' },
          ]}
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectPopup>
            <SelectItem value="developer">Developer</SelectItem>
            <SelectItem value="designer">Designer</SelectItem>
            <SelectItem value="manager">Product Manager</SelectItem>
            <SelectItem value="other">Other</SelectItem>
          </SelectPopup>
        </Select>
        <FieldDescription>This is an optional field</FieldDescription>
      </Field>

      <Field name="newsletter">
        <div className="flex items-center gap-2">
          <Checkbox />
          <FieldLabel className="cursor-pointer">Subscribe to newsletter</FieldLabel>
        </div>
      </Field>

      <Button loading={loading} type="submit">
        Submit
      </Button>
    </Form>
  )
}
