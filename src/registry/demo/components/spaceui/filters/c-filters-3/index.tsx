'use client'

import {
  IconStar,
  IconTag,
  IconMail,
  IconWorld,
  IconUser,
  IconUserX,
  IconAlertCircle,
  IconFilter2,
  IconFilterX,
} from '@tabler/icons-react'
import { useCallback, useState } from 'react'
import { createFilter, Filters, type Filter, type FilterFieldConfig } from '@/registry/components/spaceui/filters'

import { Avatar, AvatarFallback, AvatarImage } from '@/registry/primitives/avatar'
import { Button } from '@/registry/primitives/button'
// Priority icon component
const PriorityIcon = ({ priority }: { priority: string }) => {
  const colors = {
    low: 'text-green-500',
    medium: 'text-yellow-500',
    high: 'text-orange-500',
    urgent: 'text-red-500',
  }
  return <IconStar className={colors[priority as keyof typeof colors]} />
}

export default function Pattern() {
  // Basic filter fields for outline variant demo
  const fields: FilterFieldConfig[] = [
    {
      key: 'text',
      label: 'Text',
      icon: <IconTag className="size-3.5" />,
      type: 'text',
      className: 'w-36',
      placeholder: 'Search text...',
    },
    {
      key: 'email',
      label: 'Email',
      icon: <IconMail className="size-3.5" />,
      type: 'text',
      className: 'w-40',
      placeholder: 'user@example.com',
    },
    {
      key: 'website',
      label: 'Website',
      icon: <IconWorld className="size-3.5" />,
      type: 'text',
      className: 'w-40',
      placeholder: 'https://example.com',
    },
    {
      key: 'assignee',
      label: 'Assignee',
      icon: <IconUser className="size-3.5" />,
      type: 'multiselect',
      className: 'w-[200px]',
      options: [
        {
          value: 'john',
          label: 'John Doe',
          icon: (
            <Avatar className="size-5">
              <AvatarImage src="https://avatars.spaceui.one/v1?name=nova&variant=solar-flare" alt="John Doe" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
          ),
        },
        {
          value: 'jane',
          label: 'Jane Smith',
          icon: (
            <Avatar className="size-5">
              <AvatarImage src="https://avatars.spaceui.one/v1?name=pulsar&variant=titan" alt="Jane Smith" />
              <AvatarFallback>JS</AvatarFallback>
            </Avatar>
          ),
        },
        {
          value: 'bob',
          label: 'Bob Johnson',
          icon: (
            <Avatar className="size-5">
              <AvatarImage src="https://avatars.spaceui.one/v1?name=quasar&variant=glass" alt="Bob Johnson" />
              <AvatarFallback>BJ</AvatarFallback>
            </Avatar>
          ),
        },
        {
          value: 'alice',
          label: 'Alice Brown',
          icon: (
            <Avatar className="size-5">
              <AvatarImage src="https://avatars.spaceui.one/v1?name=comet&variant=pebble" alt="Alice Brown" />
              <AvatarFallback>AB</AvatarFallback>
            </Avatar>
          ),
        },
        {
          value: 'nick',
          label: 'Nick Bold',
          icon: (
            <Avatar className="size-5">
              <AvatarImage src="https://avatars.spaceui.one/v1?name=apollo&variant=invader" alt="Nick Bold" />
              <AvatarFallback>NB</AvatarFallback>
            </Avatar>
          ),
        },
        {
          value: 'unassigned',
          label: 'Unassigned',
          icon: (
            <Avatar className="size-5">
              <AvatarFallback>
                <IconUserX />
              </AvatarFallback>
            </Avatar>
          ),
        },
      ],
    },
    {
      key: 'priority',
      label: 'Priority',
      icon: <IconAlertCircle className="size-3.5" />,
      type: 'multiselect',
      className: 'w-[180px]',
      options: [
        { value: 'low', label: 'Low', icon: <PriorityIcon priority="low" /> },
        {
          value: 'medium',
          label: 'Medium',
          icon: <PriorityIcon priority="medium" />,
        },
        {
          value: 'high',
          label: 'High',
          icon: <PriorityIcon priority="high" />,
        },
        {
          value: 'urgent',
          label: 'Urgent',
          icon: <PriorityIcon priority="urgent" />,
        },
      ],
    },
  ]

  const [filters, setFilters] = useState<Filter[]>([createFilter('assignee', 'is_any_of', ['john', 'nick', 'alice'])])

  const handleFiltersChange = useCallback((filters: Filter[]) => {
    setFilters(filters)
  }, [])

  return (
    <div className="flex grow content-start items-start gap-2.5 self-start">
      <div className="flex-1">
        <Filters
          filters={filters}
          fields={fields}
          trigger={
            <Button variant="outline" size="icon">
              <IconFilter2 />
            </Button>
          }
          onChange={handleFiltersChange}
        />
      </div>

      {filters.length > 0 && (
        <Button variant="outline" onClick={() => setFilters([])}>
          <IconFilterX />
          Clear
        </Button>
      )}
    </div>
  )
}
