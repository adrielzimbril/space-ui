import { IconSparkles } from '@tabler/icons-react'
import { Button } from '@/registry/primitives/button'

export default function Particle() {
  return (
    <Button className="pe-0" variant="outline">
      <IconSparkles aria-hidden="true" />
      Like
      <span className="relative ms-1 px-3 font-medium text-muted-foreground text-xs before:absolute before:inset-0 before:left-0 before:w-px before:bg-input">
        86
      </span>
    </Button>
  )
}
