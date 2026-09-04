'use client'

import { Field, FieldDescription, FieldLabel } from '@/registry/primitives/field'
import { Textarea } from '@/registry/primitives/textarea'

export default function Particle() {
  return (
    <Field>
      <FieldLabel>Bio</FieldLabel>
      <Textarea placeholder="Tell us about yourself…" />
      <FieldDescription>Write a short bio. Maximum 500 characters.</FieldDescription>
    </Field>
  )
}
