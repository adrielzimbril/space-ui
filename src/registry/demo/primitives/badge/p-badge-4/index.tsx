import { IconCheck } from '@tabler/icons-react'
import { Badge } from '@/registry/primitives/badge'

export default function Particle() {
  return (
    <Badge variant="outline">
      <IconCheck aria-hidden="true" />
      Verified
    </Badge>
  )
}
