'use client'

import { useId } from 'react'
import { Label } from '@/registry/primitives/label'
import {
  NumberField,
  NumberFieldDecrement,
  NumberFieldGroup,
  NumberFieldIncrement,
  NumberFieldInput,
} from '@/registry/primitives/number-field'

export default function Particle() {
  const id = useId()
  return (
    <div className="flex flex-col items-start gap-2">
      <Label htmlFor={id}>Quantity</Label>
      <NumberField defaultValue={0} id={id}>
        <NumberFieldGroup>
          <NumberFieldDecrement />
          <NumberFieldInput />
          <NumberFieldIncrement />
        </NumberFieldGroup>
      </NumberField>
    </div>
  )
}
