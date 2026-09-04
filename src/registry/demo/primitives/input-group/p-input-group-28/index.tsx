'use client'

import { IconArrowRight, IconInfoCircle } from '@tabler/icons-react'
import { Button } from '@/registry/primitives/button'
import { InputGroup, InputGroupAddon, InputGroupText, InputGroupTextarea } from '@/registry/primitives/input-group'
import { Tooltip, TooltipPopup, TooltipTrigger } from '@/registry/primitives/tooltip'

export default function Particle() {
  return (
    <InputGroup>
      <InputGroupTextarea placeholder="Type a message…" />
      <InputGroupAddon align="block-end">
        <Tooltip>
          <TooltipTrigger
            render={<Button aria-label="Voice message" className="rounded-full" size="icon-sm" variant="ghost" />}
          >
            <IconInfoCircle />
          </TooltipTrigger>
          <TooltipPopup>Record voice message</TooltipPopup>
        </Tooltip>
        <InputGroupText className="ml-auto text-muted-foreground text-xs">Press Enter to send</InputGroupText>
        <Tooltip>
          <TooltipTrigger render={<Button aria-label="Send message" className="rounded-full" size="icon-sm" />}>
            <IconArrowRight />
          </TooltipTrigger>
          <TooltipPopup>Send</TooltipPopup>
        </Tooltip>
      </InputGroupAddon>
    </InputGroup>
  )
}
