'use client'

import { IconInfoCircle } from '@tabler/icons-react'
import { Button } from '@/registry/primitives/button'
import { InputGroup, InputGroupAddon, InputGroupInput } from '@/registry/primitives/input-group'
import { Popover, PopoverPopup, PopoverTrigger } from '@/registry/primitives/popover'

export default function Demo() {
  return (
    <InputGroup>
      <InputGroupInput aria-label="Password" placeholder="Password" type="password" />
      <InputGroupAddon align="inline-end">
        <Popover>
          <PopoverTrigger
            openOnHover
            render={<Button aria-label="Password requirements" size="icon-xs" variant="ghost" />}
          >
            <IconInfoCircle />
          </PopoverTrigger>
          <PopoverPopup side="top" tooltipStyle>
            <p>Min. 8 characters</p>
          </PopoverPopup>
        </Popover>
      </InputGroupAddon>
    </InputGroup>
  )
}
