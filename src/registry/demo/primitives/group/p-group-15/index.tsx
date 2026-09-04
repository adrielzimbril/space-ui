'use client'

import { IconSearch } from '@tabler/icons-react'
import { Button } from '@/registry/primitives/button'
import { Group, GroupSeparator } from '@/registry/primitives/group'
import { Input } from '@/registry/primitives/input'
import { Select, SelectItem, SelectPopup, SelectTrigger, SelectValue } from '@/registry/primitives/select'

const protocols = [
  { label: 'http', value: 'http' },
  { label: 'https', value: 'https' },
  { label: 'http + https', value: 'both' },
]

const subdomains = [
  { label: 'Subdomains', value: null },
  { label: 'www', value: 'www' },
  { label: 'api', value: 'api' },
  { label: 'cdn', value: 'cdn' },
]

export default function Demo() {
  return (
    <Group aria-label="URL search">
      <Select defaultValue="both" items={protocols}>
        <SelectTrigger className="w-fit min-w-none">
          <SelectValue />
        </SelectTrigger>
        <SelectPopup>
          {protocols.map(({ label, value }) => (
            <SelectItem key={value} value={value}>
              {label}
            </SelectItem>
          ))}
        </SelectPopup>
      </Select>
      <GroupSeparator />
      <Input aria-label="URL" className="flex-1" defaultValue="spaceui.one" type="text" />
      <GroupSeparator />
      <Select defaultValue={null} items={subdomains}>
        <SelectTrigger className="w-fit min-w-none">
          <SelectValue />
        </SelectTrigger>
        <SelectPopup>
          {subdomains.map(({ label, value }) => (
            <SelectItem key={value} value={value}>
              {label}
            </SelectItem>
          ))}
        </SelectPopup>
      </Select>
      <GroupSeparator />
      <Button aria-label="Search" size="icon" variant="outline">
        <IconSearch aria-hidden="true" />
      </Button>
    </Group>
  )
}
