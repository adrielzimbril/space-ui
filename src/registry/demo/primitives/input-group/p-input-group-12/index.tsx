'use client'

import { IconInfoCircle } from '@tabler/icons-react'
import { Button } from '@/registry/primitives/button'
import { InputGroup, InputGroupAddon, InputGroupInput } from '@/registry/primitives/input-group'
import { Label } from '@/registry/primitives/label'
import { Popover, PopoverPopup, PopoverTrigger } from '@/registry/primitives/popover'

export default function Particle() {
  return (
    <InputGroup>
      <InputGroupInput id="email-1" placeholder="team@spaceui.one" type="email" />
      <InputGroupAddon align="block-start">
        <Label className="text-foreground" htmlFor="email-1">
          Email
        </Label>
        <Popover>
          <PopoverTrigger
            className="ml-auto"
            openOnHover
            render={<Button className="-m-1" size="icon-xs" variant="ghost" />}
          >
            <IconInfoCircle />
          </PopoverTrigger>
          <PopoverPopup side="top" tooltipStyle>
            <p>We&apos;ll use this to send you notifications</p>
          </PopoverPopup>
        </Popover>
      </InputGroupAddon>
    </InputGroup>
  )
}
