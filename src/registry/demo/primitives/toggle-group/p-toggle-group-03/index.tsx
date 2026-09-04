import { IconBold, IconItalic, IconUnderline } from '@tabler/icons-react'
import { ToggleGroup, ToggleGroupItem, ToggleGroupSeparator } from '@/registry/primitives/toggle-group'

export default function Demo() {
  return (
    <ToggleGroup defaultValue={['bold']} orientation="vertical" variant="outline">
      <ToggleGroupItem aria-label="Toggle bold" value="bold">
        <IconBold />
      </ToggleGroupItem>
      <ToggleGroupSeparator orientation="horizontal" />
      <ToggleGroupItem aria-label="Toggle italic" value="italic">
        <IconItalic />
      </ToggleGroupItem>
      <ToggleGroupSeparator orientation="horizontal" />
      <ToggleGroupItem aria-label="Toggle underline" value="underline">
        <IconUnderline />
      </ToggleGroupItem>
    </ToggleGroup>
  )
}
