import { Input } from '@/registry/primitives/input'

export default function Demo() {
  return (
    <Input
      aria-label="Enter text"
      className="[--radius-lg:9999px] [--radius:9999px]"
      placeholder="Enter text"
      type="text"
    />
  )
}
