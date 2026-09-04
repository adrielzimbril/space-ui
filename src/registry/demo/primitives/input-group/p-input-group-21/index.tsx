'use client'

import { IconInfoCircle } from '@tabler/icons-react'
import { Button } from '@/registry/primitives/button'
import { InputGroup, InputGroupAddon, InputGroupInput } from '@/registry/primitives/input-group'
import { Tooltip, TooltipPopup, TooltipTrigger } from '@/registry/primitives/tooltip'

export default function Demo() {
  return (
    <InputGroup>
      <InputGroupAddon>
        <Tooltip>
          <TooltipTrigger render={<Button aria-label="More information" size="icon-xs" variant="ghost" />}>
            <IconInfoCircle />
          </TooltipTrigger>
          <TooltipPopup>Enter your username</TooltipPopup>
        </Tooltip>
      </InputGroupAddon>
      <InputGroupInput aria-label="Username" placeholder="Username" type="text" />
    </InputGroup>
  )
}
