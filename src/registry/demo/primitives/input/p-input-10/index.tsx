import { InputGroup, InputGroupAddon, InputGroupInput } from '@/registry/primitives/input-group'
import { Kbd } from '@/registry/primitives/kbd'

export default function Demo() {
  return (
    <InputGroup>
      <InputGroupInput aria-label="Search" placeholder="Search…" type="search" />
      <InputGroupAddon align="inline-end">
        <Kbd>/</Kbd>
      </InputGroupAddon>
    </InputGroup>
  )
}
