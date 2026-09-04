'use client'

import { UserPresenceAvatar, type PresenceUser } from '@/registry/components/spaceui/user-presence-avatar'

const USERS: PresenceUser[] = [
  {
    id: 1,
    name: 'Guillermo Rauch',
    src: 'https://avatars.spaceui.one/v1?name=guillermorauch&variant=singularity',
    fallback: 'GR',
    online: true,
  },
  {
    id: 2,
    name: 'Lee Robinson',
    src: 'https://avatars.spaceui.one/v1?name=leerobinson&variant=glass',
    fallback: 'LR',
    online: true,
  },
  {
    id: 3,
    name: 'Shadcn',
    src: 'https://avatars.spaceui.one/v1?name=shadcn&variant=pebble',
    fallback: 'CN',
    online: true,
  },
  {
    id: 4,
    name: 'Lauren Tan',
    src: 'https://avatars.spaceui.one/v1?name=laurentan&variant=solar-flare',
    fallback: 'LT',
    online: true,
  },
  {
    id: 5,
    name: 'Evil Rabbit',
    src: 'https://avatars.spaceui.one/v1?name=evilrabbit&variant=titan',
    fallback: 'ER',
    online: false,
  },
  {
    id: 6,
    name: 'Alexandr Wang',
    src: 'https://avatars.spaceui.one/v1?name=alexandrwang&variant=triton',
    fallback: 'AW',
    online: false,
  },
  {
    id: 7,
    name: 'Max Leiter',
    src: 'https://avatars.spaceui.one/v1?name=maxleiter&variant=lumina',
    fallback: 'ML',
    online: false,
  },
  {
    id: 8,
    name: 'Elon Musk',
    src: 'https://avatars.spaceui.one/v1?name=elonmusk&variant=shaula',
    fallback: 'EM',
    online: false,
  },
  {
    id: 9,
    name: 'Sam Altman',
    src: 'https://avatars.spaceui.one/v1?name=samaltman&variant=invader',
    fallback: 'SA',
    online: false,
  },
  {
    id: 10,
    name: 'Andrej Karpathy',
    src: 'https://avatars.spaceui.one/v1?name=andrejkarpathy&variant=kendo',
    fallback: 'AK',
    online: false,
  },
]

export default function UserPresenceAvatarDemo() {
  return <UserPresenceAvatar users={USERS} />
}

export { UserPresenceAvatarDemo }
