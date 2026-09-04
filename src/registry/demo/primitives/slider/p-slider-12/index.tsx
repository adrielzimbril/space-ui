'use client'

import { useState } from 'react'
import { NumberField, NumberFieldGroup, NumberFieldInput } from '@/registry/primitives/number-field'
import { Slider } from '@/registry/primitives/slider'

const min = 0
const max = 150

export default function Demo() {
  const [value, setValue] = useState(25)

  return (
    <div className="flex items-center gap-4">
      <Slider
        aria-label="Slider with input"
        className="flex-1"
        max={max}
        min={min}
        onValueChange={(v) => setValue(Array.isArray(v) ? v[0] : v)}
        value={value}
      />
      <NumberField
        aria-label="Enter slider value"
        className="w-12"
        max={max}
        min={min}
        onValueChange={(v) => setValue(v ?? min)}
        render={<NumberFieldGroup />}
        size="sm"
        value={value}
      >
        <NumberFieldInput />
      </NumberField>
    </div>
  )
}
