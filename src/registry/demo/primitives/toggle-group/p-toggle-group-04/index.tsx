import { IconBold, IconItalic, IconUnderline } from '@tabler/icons-react'
import { ToggleGroup, ToggleGroupItem } from '@/registry/primitives/toggle-group'

export default function Particle() {
  return (
    <ToggleGroup defaultValue={['bold']} disabled>
      <ToggleGroupItem aria-label="Toggle bold" value="bold">
        <IconBold />
      </ToggleGroupItem>
      <ToggleGroupItem aria-label="Toggle italic" value="italic">
        <IconItalic />
      </ToggleGroupItem>
      <ToggleGroupItem aria-label="Toggle underline" value="underline">
        <IconUnderline />
      </ToggleGroupItem>
    </ToggleGroup>
  )
}
