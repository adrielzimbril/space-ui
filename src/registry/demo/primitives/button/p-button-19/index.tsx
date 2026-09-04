import { IconSparkles } from '@tabler/icons-react'
import { Button } from '@/registry/primitives/button'
import { Kbd, KbdGroup } from '@/registry/primitives/kbd'

export default function Particle() {
  return (
    <Button variant="outline">
      <IconSparkles aria-hidden="true" />
      Print
      <KbdGroup className="-me-1">
        <Kbd>&#8984;</Kbd>
        <Kbd>P</Kbd>
      </KbdGroup>
    </Button>
  )
}
