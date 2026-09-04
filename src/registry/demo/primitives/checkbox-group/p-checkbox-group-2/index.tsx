import { Checkbox } from '@/registry/primitives/checkbox'
import { CheckboxGroup } from '@/registry/primitives/checkbox-group'
import { Label } from '@/registry/primitives/label'

export default function Particle() {
  return (
    <CheckboxGroup aria-label="Select frameworks" defaultValue={['next']}>
      <Label>
        <Checkbox value="next" />
        Next.js
      </Label>
      <Label>
        <Checkbox disabled value="vite" />
        Vite
      </Label>
      <Label>
        <Checkbox value="astro" />
        Astro
      </Label>
    </CheckboxGroup>
  )
}
