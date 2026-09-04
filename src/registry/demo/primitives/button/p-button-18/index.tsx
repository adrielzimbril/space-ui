import { IconArrowRight } from '@tabler/icons-react'
import { Button } from '@/registry/primitives/button'

export default function Particle() {
  return (
    <Button>
      Get Started
      <IconArrowRight
        aria-hidden="true"
        className="in-[[data-slot=button]:hover]:translate-x-0.5 transition-transform"
      />
    </Button>
  )
}
