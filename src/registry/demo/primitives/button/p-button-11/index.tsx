import { IconChevronDown, IconArrowLeft, IconArrowRight, IconArrowUp, IconSend } from '@tabler/icons-react'
import { Button } from '@/registry/primitives/button'

export default function Demo() {
  return (
    <div className="inline-grid w-fit grid-cols-3 gap-1">
      <Button aria-label="Pan camera up" className="col-start-2" size="icon" variant="outline">
        <IconArrowUp aria-hidden="true" />
      </Button>
      <Button aria-label="Pan camera left" className="col-start-1" size="icon" variant="outline">
        <IconArrowLeft aria-hidden="true" />
      </Button>
      <div aria-hidden="true" className="flex items-center justify-center">
        <IconSend className="size-4 opacity-80" />
      </div>
      <Button aria-label="Pan camera right" size="icon" variant="outline">
        <IconArrowRight aria-hidden="true" />
      </Button>
      <Button aria-label="Pan camera down" className="col-start-2" size="icon" variant="outline">
        <IconChevronDown aria-hidden="true" />
      </Button>
    </div>
  )
}
