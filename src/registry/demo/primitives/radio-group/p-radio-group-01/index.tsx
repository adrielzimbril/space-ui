import { Label } from '@/registry/primitives/label'
import { Radio, RadioGroup } from '@/registry/primitives/radio-group'

export default function Demo() {
  return (
    <RadioGroup defaultValue="next">
      <Label>
        <Radio value="next" /> Next.js
      </Label>
      <Label>
        <Radio value="vite" /> Vite
      </Label>
      <Label>
        <Radio value="astro" /> Astro
      </Label>
    </RadioGroup>
  )
}
