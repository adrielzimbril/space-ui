'use client'

import { useState } from 'react'
import { NumberField, NumberFieldGroup, NumberFieldInput } from '@/registry/primitives/number-field'
import { Slider } from '@/registry/primitives/slider'

const min = 0
const max = 100

export default function Demo() {
  const [value, setValue] = useState(25)

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <Slider
        aria-label="Vertical slider with input"
        max={max}
        min={min}
        onValueChange={(v) => setValue(Array.isArray(v) ? v[0] : v)}
        orientation="vertical"
        value={value}
      />
      <NumberField
        aria-label="Enter slider value"
        className="w-16"
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
