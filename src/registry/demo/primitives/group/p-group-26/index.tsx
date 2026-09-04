import { cn } from '@/registry/lib/utils'
import { Group } from '@/registry/primitives/group'
import { Input } from '@/registry/primitives/input'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/registry/primitives/select'

const statuses = [
  { value: '1', label: 'In Progress', color: 'bg-violet-500' },
  { value: '2', label: 'Completed', color: 'bg-green-500' },
  { value: '3', label: 'Pending', color: 'bg-primary' },
  { value: '4', label: 'Cancelled', color: 'bg-yellow-500' },
  { value: '5', label: 'Rejected', color: 'bg-destructive' },
]

export default function Pattern() {
  return (
    <Group className="max-w-xs">
      <Select defaultValue={statuses[1]} items={statuses}>
        <SelectTrigger className="min-w-36">
          <SelectValue>
            {(item: (typeof statuses)[number]) => (
              <span className="flex items-center gap-2">
                <span className={cn('size-1.5 rounded-full', item?.color)} />
                <span>{item?.label}</span>
              </span>
            )}
          </SelectValue>
        </SelectTrigger>
        <SelectContent alignItemWithTrigger={false}>
          <SelectGroup>
            {statuses.map((status) => (
              <SelectItem key={status.value} value={status}>
                <span className="flex items-center gap-2">
                  <span className={cn('size-1.5 rounded-full', status.color)} />
                  <span>{status.label}</span>
                </span>
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
      <Input placeholder="Search tasks..." />
    </Group>
  )
}
