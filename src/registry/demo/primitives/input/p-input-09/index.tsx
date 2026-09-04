'use client'

import { IconMail, IconStar } from '@tabler/icons-react'
import { useState } from 'react'
import { Button } from '@/registry/primitives/button'
import { InputGroup, InputGroupAddon, InputGroupInput } from '@/registry/primitives/input-group'
import { Popover, PopoverDescription, PopoverPopup, PopoverTitle, PopoverTrigger } from '@/registry/primitives/popover'

export default function Particle() {
  const [isFavorite, setIsFavorite] = useState(false)

  return (
    <InputGroup>
      <Popover>
        <InputGroupAddon>
          <PopoverTrigger render={<Button size="icon-xs" variant="secondary" />}>
            <IconMail />
          </PopoverTrigger>
        </InputGroupAddon>
        <PopoverPopup align="start" alignOffset={-5} className="w-64" sideOffset={6}>
          <PopoverTitle className="text-sm">Your connection is not secure.</PopoverTitle>
          <PopoverDescription>You should not enter any sensitive information on this site.</PopoverDescription>
        </PopoverPopup>
      </Popover>
      <InputGroupAddon className="pl-1.5 text-muted-foreground">https://</InputGroupAddon>
      <InputGroupInput aria-label="Url" className="*:[input]:ps-1!" type="text" />
      <InputGroupAddon align="inline-end">
        <Button onClick={() => setIsFavorite(!isFavorite)} size="icon-xs" variant="ghost">
          <IconStar
            className="data-[favorite=true]:fill-primary data-[favorite=true]:stroke-primary"
            data-favorite={isFavorite}
          />
        </Button>
      </InputGroupAddon>
    </InputGroup>
  )
}
