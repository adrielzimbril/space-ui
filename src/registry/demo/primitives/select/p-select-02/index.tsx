import { Select, SelectItem, SelectPopup, SelectTrigger, SelectValue } from '@/registry/primitives/select'

export default function Particle() {
  return (
    <div className="flex w-full max-w-sm flex-col gap-3">
      <Select defaultValue="apple">
        <SelectTrigger size="sm">
          <SelectValue placeholder="Select fruit (sm)" />
        </SelectTrigger>
        <SelectPopup>
          <SelectItem value="apple">Apple</SelectItem>
          <SelectItem value="banana">Banana</SelectItem>
          <SelectItem value="orange">Orange</SelectItem>
        </SelectPopup>
      </Select>

      <Select defaultValue="apple">
        <SelectTrigger size="default">
          <SelectValue placeholder="Select fruit (default)" />
        </SelectTrigger>
        <SelectPopup>
          <SelectItem value="apple">Apple</SelectItem>
          <SelectItem value="banana">Banana</SelectItem>
          <SelectItem value="orange">Orange</SelectItem>
        </SelectPopup>
      </Select>

      <Select defaultValue="apple">
        <SelectTrigger size="lg">
          <SelectValue placeholder="Select fruit (lg)" />
        </SelectTrigger>
        <SelectPopup>
          <SelectItem value="apple">Apple</SelectItem>
          <SelectItem value="banana">Banana</SelectItem>
          <SelectItem value="orange">Orange</SelectItem>
        </SelectPopup>
      </Select>
    </div>
  )
}
