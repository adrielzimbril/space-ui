'use client'

import { IconGitCommit, IconBug, IconBrandNpm, IconLock, IconSparkles } from '@tabler/icons-react'
import { PinList } from '@/registry/components/spaceui/pin-list'

const ITEMS = [
  {
    id: 1,
    name: 'Commit Zone',
    info: 'Code updates · Closes 9:00 PM',
    icon: IconGitCommit,
    pinned: true,
  },
  {
    id: 2,
    name: '404 Room',
    info: 'Fixing errors · Open 24 hours',
    icon: IconBug,
    pinned: true,
  },
  {
    id: 3,
    name: 'NPM Stop',
    info: 'Install dependencies · Closes 8:00 PM',
    icon: IconBrandNpm,
    pinned: false,
  },
  {
    id: 4,
    name: 'Token Lock',
    info: 'Auth & security · Open 24 hours',
    icon: IconLock,
    pinned: false,
  },
  {
    id: 5,
    name: 'AI Studio',
    info: 'Generative models · Active now',
    icon: IconSparkles,
    pinned: false,
  },
]

export default function Demo() {
  return (
    <div className="w-full max-w-sm p-4">
      <PinList items={ITEMS} />
    </div>
  )
}
