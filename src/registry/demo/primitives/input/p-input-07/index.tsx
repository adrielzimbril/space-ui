import { IconSearch } from '@tabler/icons-react'
import { Button } from '@/registry/primitives/button'
import { InputGroup, InputGroupAddon, InputGroupInput } from '@/registry/primitives/input-group'
import { Popover, PopoverPopup, PopoverTrigger } from '@/registry/primitives/popover'

export default function Demo() {
  return (
    <InputGroup>
      <InputGroupInput aria-label="Set your URL" className="*:[input]:ps-0!" placeholder="spaceui.one" type="text" />
      <InputGroupAddon>https://</InputGroupAddon>
      <InputGroupAddon align="inline-end">
        <Popover>
          <PopoverTrigger openOnHover render={<Button aria-label="More info" size="icon-xs" variant="ghost" />}>
            <IconSearch />
          </PopoverTrigger>
          <PopoverPopup side="top" tooltipStyle>
            <p>The URL of your website</p>
          </PopoverPopup>
        </Popover>
      </InputGroupAddon>
    </InputGroup>
  )
}
