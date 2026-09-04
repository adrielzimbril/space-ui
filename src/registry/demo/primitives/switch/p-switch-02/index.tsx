import { Switch } from '@/registry/primitives/switch'

export default function Demo() {
  return (
    <div className="flex flex-wrap items-center gap-4">
      <Switch defaultChecked className="scale-90" />
      <Switch defaultChecked />
      <Switch defaultChecked className="scale-110" />
    </div>
  )
}
