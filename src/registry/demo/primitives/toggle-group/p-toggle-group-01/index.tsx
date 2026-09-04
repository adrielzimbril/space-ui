import { IconBold, IconItalic, IconUnderline } from '@tabler/icons-react'
import { ToggleGroup, ToggleGroupItem } from '@/registry/primitives/toggle-group'

export default function Demo() {
  return (
    <div className="flex flex-col gap-4">
      <ToggleGroup defaultValue={['bold']} multiple variant="default">
        <ToggleGroupItem value="bold">
          <IconBold />
        </ToggleGroupItem>
        <ToggleGroupItem value="italic">
          <IconItalic />
        </ToggleGroupItem>
        <ToggleGroupItem value="underline">
          <IconUnderline />
        </ToggleGroupItem>
      </ToggleGroup>

      <ToggleGroup defaultValue={['bold']} multiple variant="outline">
        <ToggleGroupItem value="bold">
          <IconBold />
        </ToggleGroupItem>
        <ToggleGroupItem value="italic">
          <IconItalic />
        </ToggleGroupItem>
        <ToggleGroupItem value="underline">
          <IconUnderline />
        </ToggleGroupItem>
      </ToggleGroup>
    </div>
  )
}
