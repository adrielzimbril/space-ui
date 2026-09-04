import { IconDatabase, IconHome } from '@tabler/icons-react'
import Link from 'next/link'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from '@/registry/primitives/breadcrumb'
import { Select, SelectItem, SelectPopup, SelectTrigger, SelectValue } from '@/registry/primitives/select'

const items = [
  { label: 'Space UI', value: 'space-ui' },
  { label: 'Atom', value: 'atom' },
  { label: 'Nova', value: 'nova' },
]

export default function Particle() {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink render={<Link href="/" />}>Projects</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <Select aria-label="Select project" defaultValue="space-ui" items={items}>
            <SelectTrigger size="sm">
              <IconDatabase />
              <SelectValue />
            </SelectTrigger>
            <SelectPopup>
              {items.map(({ label, value }) => (
                <SelectItem key={value} value={value}>
                  {label}
                </SelectItem>
              ))}
            </SelectPopup>
          </Select>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  )
}
