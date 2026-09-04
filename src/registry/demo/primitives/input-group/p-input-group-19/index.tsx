'use client'

import { IconBold, IconInfoCircle, IconLink } from '@tabler/icons-react'
import { Button } from '@/registry/primitives/button'
import { InputGroup, InputGroupAddon, InputGroupTextarea } from '@/registry/primitives/input-group'
import { Toggle } from '@/registry/primitives/toggle'

export default function Demo() {
  return (
    <InputGroup>
      <InputGroupTextarea placeholder="Tell us about yourself…" />
      <InputGroupAddon align="block-start" className="gap-1 rounded-t-lg border-b bg-muted p-2!">
        <Toggle aria-label="Toggle bold" size="sm">
          <IconBold aria-hidden="true" />
        </Toggle>
        <Toggle aria-label="Toggle italic" size="sm">
          <IconInfoCircle aria-hidden="true" />
        </Toggle>
        <Button aria-label="Link" size="icon-sm" variant="ghost">
          <IconLink aria-hidden="true" />
        </Button>
      </InputGroupAddon>
    </InputGroup>
  )
}
