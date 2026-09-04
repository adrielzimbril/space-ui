'use client'

import { IconPlus, IconAdjustmentsHorizontal } from '@tabler/icons-react'
import { useState } from 'react'

import { Avatar, AvatarFallback, AvatarImage } from '@/registry/primitives/avatar'
import { Button } from '@/registry/primitives/button'
import { Group } from '@/registry/primitives/group'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/registry/primitives/select'
const users = [
  {
    id: '1',
    name: 'Alex Johnson',
    email: 'alex@example.com',
    avatar: 'https://avatars.spaceui.one/v1?name=mars&variant=glass',
    initials: 'AJ',
  },
  {
    id: '2',
    name: 'Sarah Chen',
    email: 'sarah@example.com',
    avatar: 'https://avatars.spaceui.one/v1?name=jupiter&variant=pebble',
    initials: 'SC',
  },
  {
    id: '3',
    name: 'Michael Rodriguez',
    email: 'michael@example.com',
    avatar: 'https://avatars.spaceui.one/v1?name=saturn&variant=invader',
    initials: 'MR',
  },
  {
    id: '4',
    name: 'Emma Wilson',
    email: 'emma@example.com',
    avatar: 'https://avatars.spaceui.one/v1?name=venus&variant=kendo',
    initials: 'EW',
  },
]

export default function Demo() {
  const mappedUsers = users.map((user) => ({
    value: user.id,
    label: user.name,
    avatar: user.avatar,
    initials: user.initials,
  }))

  const [selectedUser, setSelectedUser] = useState<(typeof mappedUsers)[number] | null>(mappedUsers[2])

  return (
    <Group>
      <Select value={selectedUser} onValueChange={(val) => setSelectedUser(val)} items={mappedUsers}>
        <SelectTrigger className="w-40">
          <SelectValue>
            {(item: (typeof mappedUsers)[number]) => (
              <span className="flex items-center gap-2">
                <Avatar className="size-5">
                  <AvatarImage src={item?.avatar} alt={item?.label} />
                  <AvatarFallback className="text-[10px]">{item?.initials}</AvatarFallback>
                </Avatar>
                <span className="truncate">{item?.label}</span>
              </span>
            )}
          </SelectValue>
        </SelectTrigger>
        <SelectContent showIcon={false} alignItemWithTrigger={false} className="min-w-[200px]">
          <SelectGroup>
            <SelectLabel>Team Members</SelectLabel>
            {mappedUsers.map((user) => (
              <SelectItem key={user.value} value={user}>
                <Avatar className="size-5 me-2">
                  <AvatarImage src={user.avatar} alt={user.label} />
                  <AvatarFallback className="text-[10px]">{user.initials}</AvatarFallback>
                </Avatar>
                <span>{user.label}</span>
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
      <Button variant="outline" size="icon" aria-label="Add Tag">
        <IconPlus aria-hidden="true" />
      </Button>
      <Button variant="outline" size="icon" aria-label="Settings">
        <IconAdjustmentsHorizontal aria-hidden="true" />
      </Button>
    </Group>
  )
}
