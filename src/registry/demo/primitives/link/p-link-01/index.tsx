import { Link } from '@/registry/primitives/link'

export default function Demo() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-6 text-sm">
      <Link href="#" variant="default">
        Default
      </Link>
      <Link href="#" variant="secondary">
        Secondary
      </Link>
      <Link href="#" variant="outline" className="rounded-md px-3 py-1">
        Outline
      </Link>
      <Link href="#" variant="ghost">
        Ghost
      </Link>
      <Link href="#" variant="destructive">
        Destructive
      </Link>
      <Link href="#" variant="destructive-outline" className="rounded-md px-3 py-1">
        Destructive Outline
      </Link>
    </div>
  )
}
