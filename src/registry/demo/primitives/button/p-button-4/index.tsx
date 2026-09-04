import { IconPlus } from '@tabler/icons-react'
import { Button } from '@/registry/primitives/button'

export default function Particle() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <Button aria-label="Add extra small" size="icon-xs">
        <IconPlus aria-hidden="true" />
      </Button>
      <Button aria-label="Add small" size="icon-sm">
        <IconPlus aria-hidden="true" />
      </Button>
      <Button aria-label="Add default" size="icon">
        <IconPlus aria-hidden="true" />
      </Button>
      <Button aria-label="Add large" size="icon-lg">
        <IconPlus aria-hidden="true" />
      </Button>
      <Button aria-label="Add extra large" size="icon-xl">
        <IconPlus aria-hidden="true" />
      </Button>
    </div>
  )
}
