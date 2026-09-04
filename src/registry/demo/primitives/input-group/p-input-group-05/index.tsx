import { InputGroup, InputGroupAddon, InputGroupInput, InputGroupText } from '@/registry/primitives/input-group'

export default function Demo() {
  return (
    <InputGroup>
      <InputGroupInput aria-label="Enter your domain" className="*:[input]:px-0!" placeholder="space-ui" type="text" />
      <InputGroupAddon>
        <InputGroupText>https://</InputGroupText>
      </InputGroupAddon>
      <InputGroupAddon align="inline-end">
        <InputGroupText>.one</InputGroupText>
      </InputGroupAddon>
    </InputGroup>
  )
}
