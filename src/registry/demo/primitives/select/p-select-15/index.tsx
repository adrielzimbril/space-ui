'use client'

import { Select, SelectItem, SelectPopup, SelectTrigger, SelectValue } from '@/registry/primitives/select'

const items = [
  { label: 'JavaScript', value: 'javascript' },
  { label: 'TypeScript', value: 'typescript' },
  { label: 'Python', value: 'python' },
  { label: 'Go', value: 'go' },
]

export default function Particle() {
  return (
    <Select aria-label="Select language" defaultValue={items[0]} itemToStringValue={(item) => item.value}>
      <SelectTrigger>
        <SelectValue>
          {(item) => (
            <span>
              <span className="text-muted-foreground">Language:</span> {item.label}
            </span>
          )}
        </SelectValue>
      </SelectTrigger>
      <SelectPopup alignItemWithTrigger={false}>
        {items.map((item) => (
          <SelectItem key={item.value} value={item}>
            {item.label}
          </SelectItem>
        ))}
      </SelectPopup>
    </Select>
  )
}
