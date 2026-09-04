'use client'

import * as React from 'react'
import { IconCircle, IconPackage, IconKey, IconSparkles } from '@tabler/icons-react'

import { PinList } from '@/registry/components/spaceui/pin-list'

const ITEMS = [
  {
    id: 1,
    name: 'Commit Zone',
    info: 'Code updates · Closes 9:00 PM',
    icon: IconCircle,
    pinned: true,
  },
  {
    id: 2,
    name: '404 Room',
    info: 'Fixing errors · Open 24 hours',
    icon: IconCircle,
    pinned: true,
  },
  {
    id: 3,
    name: 'NPM Stop',
    info: 'Install stuff · Closes 8:00 PM',
    icon: IconPackage,
    pinned: false,
  },
  {
    id: 4,
    name: 'Token Lock',
    info: 'Login stuff · Open 24 hours',
    icon: IconKey,
    pinned: false,
  },
  {
    id: 5,
    name: 'IconSparkles Zone',
    info: 'Find words · Closes 9:00 PM',
    icon: IconSparkles,
    pinned: false,
  },
]

export const PinListDemo = () => <PinList items={ITEMS} />
