import { Checkbox } from '@/registry/primitives/checkbox'

export default function Demo() {
  return (
    <div className="flex flex-wrap items-center gap-4">
      <Checkbox defaultChecked className="size-3.5" />
      <Checkbox defaultChecked className="size-4" />
      <Checkbox defaultChecked className="size-5" />
    </div>
  )
}
