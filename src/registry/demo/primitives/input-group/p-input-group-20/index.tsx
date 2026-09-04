import { IconSearch } from '@tabler/icons-react'
import { InputGroup, InputGroupAddon, InputGroupInput } from '@/registry/primitives/input-group'

export default function Demo() {
  return (
    <InputGroup>
      <InputGroupAddon>
        <IconSearch aria-hidden="true" />
      </InputGroupAddon>
      <InputGroupInput aria-label="Search" placeholder="Search" type="search" />
    </InputGroup>
  )
}
