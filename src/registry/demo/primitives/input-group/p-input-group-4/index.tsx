import { InputGroup, InputGroupAddon, InputGroupInput, InputGroupText } from '@/registry/primitives/input-group'

export default function Particle() {
  return (
    <InputGroup>
      <InputGroupInput aria-label="Choose a username" placeholder="Choose a username" type="text" />
      <InputGroupAddon align="inline-end">
        <InputGroupText>@spaceui.one</InputGroupText>
      </InputGroupAddon>
    </InputGroup>
  )
}
