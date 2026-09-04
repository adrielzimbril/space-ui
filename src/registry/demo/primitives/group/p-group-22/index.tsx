'use client'

import { IconInfoCircle, IconFilter, IconSearch, IconX } from '@tabler/icons-react'
import { useState } from 'react'
import { cn } from '@/registry/lib/utils'
import { Avatar, AvatarFallback, AvatarImage } from '@/registry/primitives/avatar'
import { Badge } from '@/registry/primitives/badge'
import { Button, buttonVariants } from '@/registry/primitives/button'
import {
  Combobox,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
  ComboboxPopup,
  ComboboxTrigger,
} from '@/registry/primitives/combobox'
import { Group, GroupSeparator, GroupText } from '@/registry/primitives/group'

type FilterOption = {
  id: string
  label: string
  avatar?: string
}

const members: FilterOption[] = [
  {
    avatar: 'https://avatars.spaceui.one/v1?name=jupiter&variant=pebble',
    id: 'alex-chen',
    label: 'Alex Chen',
  },
  {
    avatar: 'https://avatars.spaceui.one/v1?name=saturn&variant=invader',
    id: 'sarah-johnson',
    label: 'Sarah Johnson',
  },
  {
    avatar: 'https://avatars.spaceui.one/v1?name=venus&variant=kendo',
    id: 'marcus-williams',
    label: 'Marcus Williams',
  },
  {
    avatar: 'https://avatars.spaceui.one/v1?name=mercury&variant=lumina',
    id: 'emma-davis',
    label: 'Emma Davis',
  },
  {
    avatar: 'https://avatars.spaceui.one/v1?name=pluto&variant=shaula',
    id: 'james-miller',
    label: 'James Miller',
  },
]

function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/)
  if (parts.length === 1) {
    return parts[0]?.charAt(0).toUpperCase() ?? ''
  }
  const first = parts[0]?.charAt(0) ?? ''
  const last = parts[parts.length - 1]?.charAt(0) ?? ''
  return (first + last).toUpperCase()
}

function MemberAvatar({ name, avatarUrl, className }: { name: string; avatarUrl?: string; className?: string }) {
  return (
    <Avatar className={cn('size-5', className)}>
      {avatarUrl ? <AvatarImage alt={name} src={avatarUrl} /> : null}
      <AvatarFallback className="text-[0.5rem]">{getInitials(name)}</AvatarFallback>
    </Avatar>
  )
}

export default function Demo() {
  const [selectedMembers, setSelectedMembers] = useState<FilterOption[]>(members.slice(0, 2))

  const renderTriggerContent = () => {
    if (selectedMembers.length === 0) return 'Select'
    const firstMember = selectedMembers[0]
    const remainingCount = selectedMembers.length - 1

    return (
      <div className="flex items-center gap-2">
        <MemberAvatar avatarUrl={firstMember?.avatar} name={firstMember?.label ?? ''} />
        <span className="truncate">{firstMember?.label}</span>
        {remainingCount > 0 && (
          <Badge className="tabular-nums" variant="secondary">
            +{remainingCount}
          </Badge>
        )}
      </div>
    )
  }

  return (
    <Group>
      <GroupText
        className={cn(
          buttonVariants({
            size: 'sm',
            variant: 'outline',
          }),
          'pointer-events-none',
        )}
      >
        <IconFilter />
        Member
      </GroupText>
      <GroupSeparator />
      <Combobox
        autoHighlight
        items={members}
        multiple
        onValueChange={(value) => {
          if (Array.isArray(value)) {
            setSelectedMembers(value)
          }
        }}
        value={selectedMembers}
      >
        <ComboboxTrigger
          render={
            <Button
              className={selectedMembers.length === 0 ? 'justify-between' : undefined}
              size="sm"
              variant="outline"
            />
          }
        >
          {renderTriggerContent()}
          {selectedMembers.length === 0 && <IconInfoCircle className="-me-1!" />}
        </ComboboxTrigger>
        <ComboboxPopup aria-label="Select member">
          <div className="border-b p-2">
            <ComboboxInput
              className="rounded-md before:rounded-[calc(var(--radius-md)-1px)]"
              placeholder="Search members..."
              showTrigger={false}
              startAddon={<IconSearch />}
            />
          </div>
          <ComboboxEmpty>No members found.</ComboboxEmpty>
          <ComboboxList>
            {(option: FilterOption) => (
              <ComboboxItem key={option.id} value={option}>
                <div className="flex items-center gap-2">
                  <MemberAvatar avatarUrl={option.avatar} name={option.label} />
                  <span>{option.label}</span>
                </div>
              </ComboboxItem>
            )}
          </ComboboxList>
        </ComboboxPopup>
      </Combobox>
      <GroupSeparator />
      <Button aria-label="Remove filter" onClick={() => setSelectedMembers([])} size="icon-sm" variant="outline">
        <IconX />
      </Button>
    </Group>
  )
}
