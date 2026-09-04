import { IconArrowLeft } from '@tabler/icons-react'
import { Button } from '@/registry/primitives/button'

export default function Demo() {
  return (
    <Button variant="link">
      <IconArrowLeft aria-hidden="true" />
      Go back
    </Button>
  )
}
