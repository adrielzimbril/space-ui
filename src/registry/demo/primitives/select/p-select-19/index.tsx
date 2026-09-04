'use client'

import { Avatar, AvatarFallback, AvatarImage } from '@/registry/primitives/avatar'
import { Select, SelectItem, SelectPopup, SelectTrigger, SelectValue } from '@/registry/primitives/select'

const users = [
  {
    avatar: 'https://avatars.spaceui.one/v1?name=lyra&variant=glass',
    initials: 'JH',
    label: 'Jenny Hamilton',
    username: '@jennycodes',
    value: 'jenny',
  },
  {
    avatar: 'https://avatars.spaceui.one/v1?name=vega&variant=pebble',
    initials: 'PS',
    label: 'Paul Smith',
    username: '@paulsmith',
    value: 'paul',
  },
  {
    avatar: 'https://avatars.spaceui.one/v1?name=sirius&variant=invader',
    initials: 'LW',
    label: 'Luna Wyen',
    username: '@wyen.luna',
    value: 'luna',
  },
]

export default function Demo() {
  return (
    <Select aria-label="Select user" defaultValue={users[0]} itemToStringValue={(item) => item.value}>
      <SelectTrigger className="h-auto py-1.5">
        <SelectValue>
          {(item) => (
            <span className="flex items-center gap-2">
              <Avatar className="size-8">
                <AvatarImage alt={item.label} src={item.avatar} />
                <AvatarFallback>{item.initials}</AvatarFallback>
              </Avatar>
              <span className="flex flex-col text-left">
                <span className="truncate font-medium">{item.label}</span>
                <span className="truncate text-muted-foreground text-xs">{item.username}</span>
              </span>
            </span>
          )}
        </SelectValue>
      </SelectTrigger>
      <SelectPopup>
        {users.map((item) => (
          <SelectItem className="py-1.5" key={item.value} value={item}>
            <span className="flex items-center gap-2">
              <Avatar className="size-8">
                <AvatarImage alt={item.label} src={item.avatar} />
                <AvatarFallback>{item.initials}</AvatarFallback>
              </Avatar>
              <span className="flex flex-col">
                <span className="truncate font-medium">{item.label}</span>
                <span className="truncate text-muted-foreground text-xs">{item.username}</span>
              </span>
            </span>
          </SelectItem>
        ))}
      </SelectPopup>
    </Select>
  )
}
