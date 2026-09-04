'use client'

import { useState } from 'react'
import { Field, FieldDescription } from '@/registry/primitives/field'
import { Input } from '@/registry/primitives/input'

export default function Demo() {
  const maxLength = 14
  const [value, setValue] = useState('')

  return (
    <Field>
      <Input
        aria-label="Code"
        maxLength={maxLength}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Enter code"
        type="text"
        value={value}
      />
      <FieldDescription>
        <span className="tabular-nums">{maxLength - value.length}</span> characters left
      </FieldDescription>
    </Field>
  )
}
