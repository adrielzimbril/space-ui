import { Textarea } from '@/registry/primitives/textarea'

export default function Demo() {
  return (
    <div className="flex w-full max-w-sm flex-col gap-3">
      <Textarea placeholder="Small textarea" size="sm" rows={2} />
      <Textarea placeholder="Default textarea" size="default" rows={3} />
      <Textarea placeholder="Large textarea" size="lg" rows={4} />
    </div>
  )
}
