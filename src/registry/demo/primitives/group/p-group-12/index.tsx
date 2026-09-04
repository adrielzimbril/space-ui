import { IconPaperclip, IconMicrophone } from '@tabler/icons-react'
import { Button } from '@/registry/primitives/button'
import { Group } from '@/registry/primitives/group'
import { InputGroup, InputGroupAddon, InputGroupInput } from '@/registry/primitives/input-group'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/registry/primitives/tooltip'

export default function Particle() {
  return (
    <Group aria-label="Message composer" className="[--radius-lg:9999px] [--radius:9999rem]">
      <Group aria-label="Attachments">
        <Button aria-label="Attach file" size="icon" variant="outline">
          <IconPaperclip aria-hidden="true" />
        </Button>
      </Group>
      <Group aria-label="Message input">
        <InputGroup>
          <InputGroupInput placeholder="Send a message" />
          <InputGroupAddon align="inline-end">
            <Tooltip>
              <TooltipTrigger render={<Button aria-label="Voice Mode" size="icon-xs" variant="ghost" />}>
                <IconMicrophone aria-hidden="true" />
              </TooltipTrigger>
              <TooltipContent>Voice Mode</TooltipContent>
            </Tooltip>
          </InputGroupAddon>
        </InputGroup>
      </Group>
    </Group>
  )
}
