import { IconMail } from '@tabler/icons-react'
import { InputGroup, InputGroupAddon, InputGroupInput } from '@/registry/primitives/input-group'

export default function Particle() {
  return (
    <InputGroup>
      <InputGroupInput aria-label="Email" placeholder="Email" type="email" />
      <InputGroupAddon align="inline-end">
        <IconMail aria-hidden="true" />
      </InputGroupAddon>
    </InputGroup>
  )
}
