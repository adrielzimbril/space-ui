import { IconBold, IconItalic, IconUnderline } from '@tabler/icons-react'
import { ToggleGroup, ToggleGroupItem } from '@/registry/primitives/toggle-group'

export default function Demo() {
  return (
    <ToggleGroup defaultValue={['bold']}>
      <ToggleGroupItem aria-label="Toggle bold" value="bold">
        <IconBold />
      </ToggleGroupItem>
      <ToggleGroupItem aria-label="Toggle italic" disabled value="italic">
        <IconItalic />
      </ToggleGroupItem>
      <ToggleGroupItem aria-label="Toggle underline" value="underline">
        <IconUnderline />
      </ToggleGroupItem>
    </ToggleGroup>
  )
}
