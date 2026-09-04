import { Group, GroupSeparator } from '@/registry/primitives/group'
import { Input } from '@/registry/primitives/input'
import { Select, SelectItem, SelectPopup, SelectTrigger, SelectValue } from '@/registry/primitives/select'

const domains = [
  { label: '.one', value: 'one' },
  { label: '.com', value: 'com' },
  { label: '.org', value: 'org' },
  { label: '.net', value: 'net' },
]

export default function Particle() {
  return (
    <Group aria-label="Domain input">
      <Input aria-label="Domain name" placeholder="example" type="text" />
      <GroupSeparator />
      <Select defaultValue="one" items={domains}>
        <SelectTrigger className="w-fit min-w-none">
          <SelectValue />
        </SelectTrigger>
        <SelectPopup>
          {domains.map(({ label, value }) => (
            <SelectItem key={value} value={value}>
              {label}
            </SelectItem>
          ))}
        </SelectPopup>
      </Select>
    </Group>
  )
}
