import { Badge } from '@/registry/primitives/badge'
import { Button } from '@/registry/primitives/button'

export default function Particle() {
  return (
    <Button variant="outline">
      Messages
      <Badge className="-me-1" variant="outline">
        18
      </Badge>
    </Button>
  )
}
