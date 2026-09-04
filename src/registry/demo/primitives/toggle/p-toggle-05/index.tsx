import { IconBold, IconStar } from '@tabler/icons-react'
import { Toggle } from '@/registry/primitives/toggle'

export default function Demo() {
  return (
    <div className="flex items-center gap-1">
      <Toggle aria-label="Toggle bold" variant="outline">
        <IconBold />
      </Toggle>
      <Toggle aria-label="Toggle italic" variant="outline">
        <IconStar />
      </Toggle>
      <Toggle aria-label="Toggle underline" variant="outline">
        <IconStar />
      </Toggle>
    </div>
  )
}
