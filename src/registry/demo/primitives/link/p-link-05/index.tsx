import { Link } from '@/registry/primitives/link'

export default function Demo() {
  return (
    <div className="flex flex-wrap items-center justify-center  gap-6 text-sm">
      <Link href="https://github.com" target="_blank" rel="noopener noreferrer">
        GitHub Repository
      </Link>
      <Link href="https://www.spaceui.one" target="_blank" rel="noopener noreferrer" variant="secondary">
        Documentation
      </Link>
      <Link href="https://base-ui.com" target="_blank" rel="noopener noreferrer" asButton variant="outline" size="sm">
        Base UI Site
      </Link>
    </div>
  )
}
