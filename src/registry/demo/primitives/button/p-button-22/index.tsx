import { Button } from '@/registry/primitives/button'

export default function Demo() {
  return (
    <Button variant="outline">
      <span
        aria-hidden="true"
        className="relative size-2 rounded-full bg-emerald-500 before:absolute before:inset-0 before:animate-ping before:rounded-full before:bg-emerald-400 before:opacity-75"
      />
      Online
    </Button>
  )
}
