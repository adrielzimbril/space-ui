import { InputGroup, InputGroupAddon, InputGroupInput } from '@/registry/primitives/input-group'
import { Kbd } from '@/registry/primitives/kbd'

export default function Demo() {
  return (
    <InputGroup>
      <InputGroupInput placeholder="Search…" type="search" />
      <InputGroupAddon align="inline-end">
        <Kbd>⌘K</Kbd>
      </InputGroupAddon>
    </InputGroup>
  )
}
