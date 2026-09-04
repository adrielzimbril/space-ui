import { Badge } from '@/registry/primitives/badge'

export default function Particle() {
  return (
    <Badge variant="outline">
      Notifications
      <span className="ms-1 font-semibold text-primary">5</span>
    </Badge>
  )
}
