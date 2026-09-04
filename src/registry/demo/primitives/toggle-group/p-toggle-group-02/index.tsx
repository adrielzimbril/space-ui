import { IconBold, IconItalic, IconUnderline } from '@tabler/icons-react'
import { ToggleGroup, ToggleGroupItem } from '@/registry/primitives/toggle-group'

export default function Particle() {
  return (
    <div className="flex flex-col gap-4">
      <ToggleGroup size="sm">
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

      <ToggleGroup size="default">
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

      <ToggleGroup size="lg">
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
