import { InputGroup, InputGroupAddon, InputGroupInput } from '@/registry/primitives/input-group'
import { Spinner } from '@/registry/primitives/spinner'

export default function Demo() {
  return (
    <InputGroup>
      <InputGroupInput disabled placeholder="Processing…" type="search" />
      <InputGroupAddon>
        <Spinner />
      </InputGroupAddon>
    </InputGroup>
  )
}
