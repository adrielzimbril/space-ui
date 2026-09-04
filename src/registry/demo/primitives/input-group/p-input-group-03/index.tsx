import { InputGroup, InputGroupAddon, InputGroupInput, InputGroupText } from '@/registry/primitives/input-group'

export default function Demo() {
  return (
    <InputGroup>
      <InputGroupInput aria-label="Set your URL" className="*:[input]:ps-0!" placeholder="space" type="search" />
      <InputGroupAddon>
        <InputGroupText>i.cal.com/</InputGroupText>
      </InputGroupAddon>
    </InputGroup>
  )
}
