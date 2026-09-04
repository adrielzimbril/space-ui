import { Button } from '@/registry/primitives/button'

export default function Demo() {
  return (
    <div className="inline-flex items-center gap-2">
      <Button variant="ghost">Cancel</Button>
      <Button>Save</Button>
    </div>
  )
}
