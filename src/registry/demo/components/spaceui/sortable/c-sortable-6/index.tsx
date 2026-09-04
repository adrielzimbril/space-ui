'use client'

import {
  IconLayoutDashboard,
  IconInbox,
  IconFolder,
  IconCalendarEvent,
  IconChartBar,
  IconSettings,
  IconGripVertical,
} from '@tabler/icons-react'
import { ReactNode, useState } from 'react'
import { Badge } from '@/registry/primitives/badge'
import { Frame, FrameHeader, FramePanel, FrameTitle } from '@/registry/primitives/frame'
import { Sortable, SortableItem, SortableItemHandle } from '@/registry/components/spaceui/sortable'

interface NavItem {
  id: string
  label: string
  icon: ReactNode
  count?: number
}

const defaultItems: NavItem[] = [
  {
    id: '1',
    label: 'Dashboard',
    icon: <IconLayoutDashboard className="text-muted-foreground size-4" />,
  },
  {
    id: '2',
    label: 'Inbox',
    icon: <IconInbox className="text-muted-foreground size-4" />,
    count: 5,
  },
  {
    id: '3',
    label: 'Projects',
    icon: <IconFolder className="text-muted-foreground size-4" />,
    count: 12,
  },
  {
    id: '4',
    label: 'Calendar',
    icon: <IconCalendarEvent className="text-muted-foreground size-4" />,
  },
  {
    id: '5',
    label: 'Analytics',
    icon: <IconChartBar className="text-muted-foreground size-4" />,
  },
  {
    id: '6',
    label: 'Settings',
    icon: <IconSettings className="text-muted-foreground size-4" />,
  },
]

export default function Pattern() {
  const [items, setItems] = useState<NavItem[]>(defaultItems)

  return (
    <div className="mx-auto w-full max-w-xs">
      <Frame spacing="xs">
        <FrameHeader>
          <FrameTitle>Navigation</FrameTitle>
        </FrameHeader>
        <FramePanel className="p-2!">
          <Sortable
            value={items}
            onValueChange={setItems}
            getItemValue={(item) => item.id}
            strategy="vertical"
            className="space-y-0.5"
          >
            {items.map((item) => (
              <SortableItem key={item.id} value={item.id}>
                <div className="hover:bg-accent flex items-center gap-1.5 rounded-md px-2 py-1.5 transition-colors">
                  <SortableItemHandle className="text-muted-foreground hover:text-foreground opacity-0 transition-opacity group-hover:opacity-100 [div:hover>&]:opacity-100">
                    <IconGripVertical className="size-3.5" />
                  </SortableItemHandle>
                  {item.icon}
                  <span className="flex-1 text-sm">{item.label}</span>
                  {item.count && (
                    <Badge variant="outline" size="sm" className="rounded-full">
                      {item.count}
                    </Badge>
                  )}
                </div>
              </SortableItem>
            ))}
          </Sortable>
        </FramePanel>
      </Frame>
    </div>
  )
}
