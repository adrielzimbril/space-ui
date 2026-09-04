'use client'

import { IconPaperclip, IconPhoto } from '@tabler/icons-react'
import { Button } from '@/registry/primitives/button'
import { InputGroup, InputGroupAddon, InputGroupTextarea } from '@/registry/primitives/input-group'
import { Tooltip, TooltipPopup, TooltipProvider, TooltipTrigger } from '@/registry/primitives/tooltip'

export default function Particle() {
  return (
    <InputGroup>
      <InputGroupTextarea placeholder="Compose your message…" rows={4} />
      <InputGroupAddon align="block-end" className="justify-between">
        <TooltipProvider>
          <div className="flex gap-1">
            <Tooltip>
              <TooltipTrigger render={<Button aria-label="Attach file" size="icon-sm" variant="ghost" />}>
                <IconPaperclip />
              </TooltipTrigger>
              <TooltipPopup>Attach file</TooltipPopup>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger render={<Button aria-label="Insert image" size="icon-sm" variant="ghost" />}>
                <IconPhoto />
              </TooltipTrigger>
              <TooltipPopup>Insert image</TooltipPopup>
            </Tooltip>
          </div>
        </TooltipProvider>
        <Button size="sm">Send</Button>
      </InputGroupAddon>
    </InputGroup>
  )
}
