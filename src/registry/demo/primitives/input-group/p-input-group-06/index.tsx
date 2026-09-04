import { InputGroup, InputGroupAddon, InputGroupText } from '@/registry/primitives/input-group'
import { NumberField, NumberFieldInput } from '@/registry/primitives/number-field'

export default function Demo() {
  return (
    <InputGroup>
      <NumberField aria-label="Enter the amount" defaultValue={10}>
        <NumberFieldInput className="text-left" />
      </NumberField>
      <InputGroupAddon>
        <InputGroupText>€</InputGroupText>
      </InputGroupAddon>
      <InputGroupAddon align="inline-end">
        <InputGroupText>EUR</InputGroupText>
      </InputGroupAddon>
    </InputGroup>
  )
}
