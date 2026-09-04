import { IconSearch } from '@tabler/icons-react'
import { InputGroup, InputGroupAddon, InputGroupInput } from '@/registry/primitives/input-group'

export default function Demo() {
  return (
    <InputGroup>
      <InputGroupInput aria-label="Search" placeholder="Search" size="sm" type="search" />
      <InputGroupAddon>
        <IconSearch aria-hidden="true" />
      </InputGroupAddon>
    </InputGroup>
  )
}
