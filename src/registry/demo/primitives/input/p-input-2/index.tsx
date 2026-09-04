import { Input } from '@/registry/primitives/input'

export default function Particle() {
  return (
    <div className="flex w-full max-w-sm flex-col gap-3">
      <Input placeholder="Small input" size="sm" />
      <Input placeholder="Default input" size="default" />
      <Input placeholder="Large input" size="lg" />
    </div>
  )
}
