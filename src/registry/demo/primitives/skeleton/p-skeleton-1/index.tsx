'use client'

import { IconSparkles, IconClock } from '@tabler/icons-react'
import { useEffect, useState } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '@/registry/primitives/avatar'
import { Button } from '@/registry/primitives/button'
import { Skeleton } from '@/registry/primitives/skeleton'

const users = [
  {
    delay: 3000,
    fallback: 'SJ',
    followers: '15k',
    image: 'https://avatars.spaceui.one/v1?name=nova&variant=kendo',
    name: 'Sarah Johnson',
    role: 'Design Engineer',
  },
  {
    delay: 4000,
    fallback: 'MA',
    followers: '8k',
    image: 'https://avatars.spaceui.one/v1?name=pulsar&variant=lumina',
    name: 'Mark Bennett Andersson',
    role: 'Product Designer',
  },
  {
    delay: 3400,
    fallback: 'AR',
    followers: '12k',
    image: 'https://avatars.spaceui.one/v1?name=quasar&variant=shaula',
    name: 'Alex Rivera',
    role: 'UI/UX Designer',
  },
]

function UserCard({ delay, user }: { delay: number; user: (typeof users)[0] }) {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true)
    }, delay)

    return () => clearTimeout(timer)
  }, [delay])

  if (!isLoaded) {
    return <UserCardSkeleton />
  }

  return (
    <>
      <Avatar className="size-10">
        <AvatarImage alt={user.name} src={user.image} />
        <AvatarFallback>{user.fallback}</AvatarFallback>
      </Avatar>
      <div className="flex min-w-0 flex-1 flex-col gap-1">
        <h4 className="line-clamp-1 font-medium text-sm">{user.name}</h4>
        <div className="flex items-center gap-3 text-muted-foreground text-xs">
          <span className="truncate">{user.role}</span>
          <div className="flex min-w-0 items-center gap-1">
            <IconClock className="size-3 shrink-0" />
            <span className="truncate">
              {user.followers}
              <span className="max-sm:hidden"> followers</span>
            </span>
          </div>
        </div>
      </div>
      <Button size="xs">
        <IconSparkles />
        Follow
      </Button>
    </>
  )
}

function UserCardSkeleton() {
  return (
    <>
      <Skeleton className="size-10 rounded-full" />
      <div className="flex flex-1 flex-col">
        <Skeleton className="my-0.5 h-4 max-w-54" />
        <div className="flex max-w-54 items-center gap-1">
          <Skeleton className="my-0.5 h-4 w-1/2" />
          <Skeleton className="my-0.5 h-4 w-1/2" />
        </div>
      </div>
      <Skeleton className="h-7 w-19 sm:h-6 sm:w-17" />
    </>
  )
}

export default function Particle() {
  return (
    <div className="flex w-full max-w-92 flex-col gap-6">
      {users.map((user) => (
        <div className="flex items-center gap-4" key={user.fallback}>
          <UserCard delay={user.delay} user={user} />
        </div>
      ))}
    </div>
  )
}
