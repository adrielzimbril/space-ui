'use client'

import { Avatar, AvatarFallback, AvatarImage } from '@/registry/primitives/avatar'
import {
  Select,
  SelectGroup,
  SelectGroupLabel,
  SelectItem,
  SelectPopup,
  SelectTrigger,
  SelectValue,
} from '@/registry/primitives/select'

const users = [
  {
    avatar: 'https://avatars.spaceui.one/v1?name=uranus&variant=triton',
    initials: 'JH',
    label: 'Jenny Hamilton',
    value: 'jenny',
  },
  {
    avatar: 'https://avatars.spaceui.one/v1?name=earth&variant=solar-flare',
    initials: 'PS',
    label: 'Paul Smith',
    value: 'paul',
  },
  {
    avatar: 'https://avatars.spaceui.one/v1?name=orion&variant=titan',
    initials: 'LW',
    label: 'Luna Wyen',
    value: 'luna',
  },
]

export default function Demo() {
  return (
    <Select aria-label="Select user" defaultValue={users[0]} itemToStringValue={(item) => item.value}>
      <SelectTrigger>
        <SelectValue>
          {(item) => (
            <span className="flex items-center gap-2">
              <Avatar className="size-5">
                <AvatarImage alt={item.label} src={item.avatar} />
                <AvatarFallback className="text-[.625rem]">{item.initials}</AvatarFallback>
              </Avatar>
              <span className="truncate">{item.label}</span>
            </span>
          )}
        </SelectValue>
      </SelectTrigger>
      <SelectPopup>
        <SelectGroup>
          <SelectGroupLabel>Impersonate user</SelectGroupLabel>
          {users.map((item) => (
            <SelectItem key={item.value} value={item}>
              <span className="flex items-center gap-2">
                <Avatar className="size-5">
                  <AvatarImage alt={item.label} src={item.avatar} />
                  <AvatarFallback className="text-[10px]">{item.initials}</AvatarFallback>
                </Avatar>
                <span className="truncate">{item.label}</span>
              </span>
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectPopup>
    </Select>
  )
}
