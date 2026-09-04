'use client'

import { IconX } from '@tabler/icons-react'
import { useState } from 'react'
import { Button } from '@/registry/primitives/button'
import { InputGroup, InputGroupAddon, InputGroupInput } from '@/registry/primitives/input-group'

export default function Demo() {
  const [value, setValue] = useState('Clear me')

  return (
    <InputGroup>
      <InputGroupInput
        aria-label="Text input with clear button"
        onChange={(e) => setValue(e.target.value)}
        placeholder="Enter text"
        type="text"
        value={value}
      />
      {value && (
        <InputGroupAddon align="inline-end">
          <Button aria-label="Clear input" onClick={() => setValue('')} size="icon-xs" variant="ghost">
            <IconX aria-hidden="true" />
          </Button>
        </InputGroupAddon>
      )}
    </InputGroup>
  )
}
