import { IconArrowRight } from '@tabler/icons-react'
import { Button } from '@/registry/primitives/button'
import { InputGroup, InputGroupAddon, InputGroupInput } from '@/registry/primitives/input-group'

export default function Demo() {
  return (
    <InputGroup>
      <InputGroupInput aria-label="Subscribe to our newsletter" disabled placeholder="Your best email" type="email" />
      <InputGroupAddon align="inline-end">
        <Button aria-label="Subscribe" disabled size="icon-xs" variant="ghost">
          <IconArrowRight aria-hidden="true" />
        </Button>
      </InputGroupAddon>
    </InputGroup>
  )
}
