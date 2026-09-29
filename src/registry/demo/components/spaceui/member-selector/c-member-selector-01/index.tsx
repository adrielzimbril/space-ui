'use client'

import * as React from 'react'
import { MemberSelector, type Member } from '@/registry/components/spaceui/member-selector'

const SAMPLE_MEMBERS: Member[] = [
  {
    id: '1',
    name: 'Guillermo Rauch',
    email: 'guillermo.rauch@spaceui.one',
    avatar: 'https://avatars.spaceui.one/v1?name=guillermo&variant=all',
  },
  {
    id: '2',
    name: 'Evan You',
    email: 'evan.you@spaceui.one',
    avatar: 'https://avatars.spaceui.one/v1?name=evan&variant=all',
  },
  {
    id: '3',
    name: 'Dan Abramov',
    email: 'dan.abramov@spaceui.one',
    avatar: 'https://avatars.spaceui.one/v1?name=dan&variant=all',
  },
  {
    id: '4',
    name: 'Lee Robinson',
    email: 'lee.robinson@spaceui.one',
    avatar: 'https://avatars.spaceui.one/v1?name=leerob&variant=all',
  },
  {
    id: '5',
    name: 'Sophie Alpert',
    email: 'sophie.alpert@spaceui.one',
    avatar: 'https://avatars.spaceui.one/v1?name=sophie&variant=all',
  },
  {
    id: '6',
    name: 'Mitchell Hashimoto',
    email: 'mitchell.hashimoto@spaceui.one',
    avatar: 'https://avatars.spaceui.one/v1?name=mitchell&variant=all',
  },
  {
    id: '7',
    name: 'Andrej Karpathy',
    email: 'andrej.karpathy@spaceui.one',
    avatar: 'https://avatars.spaceui.one/v1?name=andrej&variant=all',
  },
  {
    id: '8',
    name: 'Kelsey Hightower',
    email: 'kelsey.hightower@spaceui.one',
    avatar: 'https://avatars.spaceui.one/v1?name=kelsey&variant=all',
  },
  {
    id: '9',
    name: 'Linus Torvalds',
    email: 'linus.torvalds@spaceui.one',
    avatar: 'https://avatars.spaceui.one/v1?name=linus&variant=all',
  },
  {
    id: '10',
    name: 'Rich Harris',
    email: 'rich.harris@spaceui.one',
    avatar: 'https://avatars.spaceui.one/v1?name=rich&variant=all',
  },
]

export default function Demo() {
  const [selectedIds, setSelectedIds] = React.useState<string[]>(['1', '2'])

  return (
    <div className="flex w-full items-center justify-center p-6 sm:p-12">
      <div className="relative">
        <MemberSelector
          members={SAMPLE_MEMBERS}
          selected={selectedIds}
          onChange={setSelectedIds}
          maxVisible={5}
          label="Participants"
        />
      </div>
    </div>
  )
}
