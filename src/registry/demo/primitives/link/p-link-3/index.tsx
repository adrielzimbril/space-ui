import { Link } from '@/registry/primitives/link'

export default function Particle() {
  return (
    <div className="flex flex-wrap items-center gap-4">
      <Link href="#" asButton variant="default">
        Default
      </Link>
      <Link href="#" asButton variant="secondary">
        Secondary
      </Link>
      <Link href="#" asButton variant="outline">
        Outline
      </Link>
      <Link href="#" asButton variant="ghost">
        Ghost
      </Link>
      <Link href="#" asButton variant="destructive">
        Destructive
      </Link>
      <Link href="#" asButton variant="destructive-outline">
        Destructive Outline
      </Link>
    </div>
  )
}
