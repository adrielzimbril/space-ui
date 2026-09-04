import { InputGroup, InputGroupAddon, InputGroupInput } from '@/registry/primitives/input-group'
import { Spinner } from '@/registry/primitives/spinner'

export default function Particle() {
  return (
    <InputGroup>
      <InputGroupInput disabled placeholder="Processing…" type="search" />
      <InputGroupAddon align="inline-end">
        <Spinner />
      </InputGroupAddon>
    </InputGroup>
  )
}
