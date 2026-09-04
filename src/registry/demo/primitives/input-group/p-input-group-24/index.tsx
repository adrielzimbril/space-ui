'use client'

import { useState } from 'react'
import { InputGroup, InputGroupAddon, InputGroupInput, InputGroupText } from '@/registry/primitives/input-group'

export default function Demo() {
  const maxLength = 14
  const [value, setValue] = useState('')

  return (
    <InputGroup>
      <InputGroupInput
        aria-label="Username"
        maxLength={maxLength}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Enter username"
        type="text"
        value={value}
      />
      <InputGroupAddon align="inline-end">
        <InputGroupText aria-live="polite" className="text-xs tabular-nums" role="status">
          {value.length}/{maxLength}
        </InputGroupText>
      </InputGroupAddon>
    </InputGroup>
  )
}
