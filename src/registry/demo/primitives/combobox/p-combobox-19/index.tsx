'use client'

import { IconSearch, IconX } from '@tabler/icons-react'
import { useState } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '@/registry/primitives/avatar'
import { Badge } from '@/registry/primitives/badge'
import { Button } from '@/registry/primitives/button'
import {
  Combobox,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
  ComboboxPopup,
} from '@/registry/primitives/combobox'

type TeamMember = {
  avatar: string
  initials: string
  label: string
  priority: 'Lowest' | 'Low' | 'Medium' | 'High' | 'Highest'
  value: string
  weight: number
}

const teamMembers: TeamMember[] = [
  {
    avatar: 'https://avatars.spaceui.one/v1?name=quasar&variant=shaula',
    initials: 'JH',
    label: 'Jenny Hamilton',
    priority: 'Highest',
    value: 'jenny',
    weight: 200,
  },
  {
    avatar: 'https://avatars.spaceui.one/v1?name=comet&variant=singularity',
    initials: 'PS',
    label: 'Paul Smith',
    priority: 'Medium',
    value: 'paul',
    weight: 100,
  },
  {
    avatar: 'https://avatars.spaceui.one/v1?name=apollo&variant=triton',
    initials: 'LW',
    label: 'Luna Wyen',
    priority: 'High',
    value: 'luna',
    weight: 150,
  },
  {
    avatar: 'https://avatars.spaceui.one/v1?name=gemini&variant=solar-flare',
    initials: 'AC',
    label: 'Alex Chen',
    priority: 'Low',
    value: 'alex',
    weight: 100,
  },
  {
    avatar: 'https://avatars.spaceui.one/v1?name=luna&variant=titan',
    initials: 'SJ',
    label: 'Sarah Johnson',
    priority: 'Medium',
    value: 'sarah',
    weight: 50,
  },
  {
    avatar: 'https://avatars.spaceui.one/v1?name=mars&variant=glass',
    initials: 'ED',
    label: 'Emma Davis',
    priority: 'Lowest',
    value: 'emma',
    weight: 100,
  },
]

export default function Demo() {
  const [open, setOpen] = useState(false)
  const [selected, setSelected] = useState<TeamMember[]>(teamMembers.slice(0, 2))

  return (
    <div className="flex w-full flex-col gap-2">
      <Combobox
        autoHighlight
        items={teamMembers}
        multiple
        onOpenChange={setOpen}
        onValueChange={(value) => {
          setSelected(value)
          setOpen(false)
        }}
        open={open}
        value={selected}
      >
        <ComboboxInput aria-label="Add team members" placeholder="Add team members…" startAddon={<IconSearch />} />
        <ComboboxPopup>
          <ComboboxEmpty>No team members found.</ComboboxEmpty>
          <ComboboxList>
            {(item: TeamMember) => (
              <ComboboxItem key={item.value} value={item}>
                {item.label}
              </ComboboxItem>
            )}
          </ComboboxList>
        </ComboboxPopup>
      </Combobox>
      {selected.length > 0 && (
        <ul className="divide-y rounded-lg border">
          {selected.map((member) => (
            <li className="flex items-center gap-2 p-1 ps-2 text-base sm:text-sm" key={member.value}>
              <Avatar className="size-5">
                <AvatarImage alt={member.label} src={member.avatar} />
                <AvatarFallback className="text-[.625rem]">{member.initials}</AvatarFallback>
              </Avatar>
              <span className="truncate font-medium">{member.label}</span>
              <Badge className="ms-auto" size="sm" variant="warning">
                {member.priority}
              </Badge>
              <span className="text-muted-foreground text-xs tabular-nums">{member.weight}%</span>
              <Button
                aria-label={`Remove ${member.label}`}
                onClick={() => setSelected((current) => current.filter((item) => item.value !== member.value))}
                size="icon-xs"
                variant="ghost"
              >
                <IconX />
              </Button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
