import { IconBold, IconItalic } from '@tabler/icons-react'
import { Toggle } from '@/registry/primitives/toggle'

export default function Demo() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <Toggle defaultPressed variant="default">
        <IconBold />
        Bold
      </Toggle>
      <Toggle defaultPressed variant="outline">
        <IconItalic />
        Italic
      </Toggle>
    </div>
  )
}
