import { Badge } from '@/registry/primitives/badge'

export default function Particle() {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <Badge size="sm" square>
        8
      </Badge>
      <Badge size="default" square>
        8
      </Badge>
      <Badge size="lg" square>
        8
      </Badge>
    </div>
  )
}
