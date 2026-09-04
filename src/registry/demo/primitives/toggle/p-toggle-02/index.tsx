import { IconBold } from '@tabler/icons-react'
import { Toggle } from '@/registry/primitives/toggle'

export default function Particle() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <Toggle size="sm" defaultPressed>
        <IconBold />
        Small
      </Toggle>
      <Toggle size="default" defaultPressed>
        <IconBold />
        Default
      </Toggle>
      <Toggle size="lg" defaultPressed>
        <IconBold />
        Large
      </Toggle>
    </div>
  )
}
