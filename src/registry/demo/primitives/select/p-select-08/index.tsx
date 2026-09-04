'use client'

import { IconSourceCode, IconGlobe, IconBox, IconGauge } from '@tabler/icons-react'
import { Select, SelectItem, SelectPopup, SelectTrigger, SelectValue } from '@/registry/primitives/select'

const items = [
  { icon: IconBox, label: 'Components', value: 'components' },
  { icon: IconGauge, label: 'Performance', value: 'performance' },
  { icon: IconGlobe, label: 'Network', value: 'network' },
  { icon: IconSourceCode, label: 'Development', value: 'development' },
]

export default function Demo() {
  return (
    <Select aria-label="Select category" defaultValue={items[0]} itemToStringValue={(item) => item.value}>
      <SelectTrigger>
        <SelectValue>
          {(item) => (
            <span className="flex items-center gap-2">
              <item.icon />
              <span className="truncate">{item.label}</span>
            </span>
          )}
        </SelectValue>
      </SelectTrigger>
      <SelectPopup>
        {items.map((item) => (
          <SelectItem key={item.value} value={item}>
            <span className="flex items-center gap-2">
              <item.icon />
              <span className="truncate">{item.label}</span>
            </span>
          </SelectItem>
        ))}
      </SelectPopup>
    </Select>
  )
}
