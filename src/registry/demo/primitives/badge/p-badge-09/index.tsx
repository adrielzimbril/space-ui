import { Badge } from '@/registry/primitives/badge'

export default function Particle() {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <Badge variant="outline">
        <span aria-hidden="true" className="size-1.5 rounded-full bg-emerald-500" />
        Paid
      </Badge>
      <Badge variant="outline">
        <span aria-hidden="true" className="size-1.5 rounded-full bg-amber-500" />
        Pending
      </Badge>
      <Badge variant="outline">
        <span aria-hidden="true" className="size-1.5 rounded-full bg-red-500" />
        Failed
      </Badge>
    </div>
  )
}
