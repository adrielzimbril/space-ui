'use client'

import * as React from 'react'
import { motion, LayoutGroup } from 'motion/react'
import { Avatar, AvatarFallback, AvatarImage } from '@/registry/primitives/avatar'
import { TooltipProvider, Tooltip, TooltipContent, TooltipTrigger } from '@/registry/primitives/tooltip'
import { AvatarExtended, AvatarRing } from '@/registry/components/spaceui/avatar-extended'
import { cn } from '@/registry/lib/utils'

export interface PresenceUser {
  id: number
  name: string
  src: string
  fallback: string
  online: boolean
}

export interface UserPresenceAvatarProps {
  users: PresenceUser[]
  className?: string
  onChange?: (users: PresenceUser[]) => void
}

const AVATAR_MOTION_TRANSITION = {
  type: 'spring',
  stiffness: 220,
  damping: 24,
} as const

const GROUP_CONTAINER_TRANSITION = {
  type: 'spring',
  stiffness: 160,
  damping: 22,
} as const

function UserPresenceAvatar({ users: initialUsers, className, onChange }: UserPresenceAvatarProps) {
  const [users, setUsers] = React.useState<PresenceUser[]>(initialUsers)
  const [togglingGroup, setTogglingGroup] = React.useState<'online' | 'offline' | null>(null)

  const online = users.filter((u) => u.online)
  const offline = users.filter((u) => !u.online)

  const toggleStatus = (id: number) => {
    const user = users.find((u) => u.id === id)
    if (!user) return

    setTogglingGroup(user.online ? 'online' : 'offline')
    setUsers((prev) => {
      const idx = prev.findIndex((u) => u.id === id)
      if (idx === -1) return prev
      const updated = [...prev]
      const target = updated[idx]
      if (!target) return prev
      updated.splice(idx, 1)
      updated.push({ ...target, online: !target.online })
      onChange?.(updated)
      return updated
    })
    setTimeout(() => setTogglingGroup(null), 500)
  }

  return (
    <div className={cn('flex items-center gap-4', className)}>
      <LayoutGroup>
        <TooltipProvider>
          {online.length > 0 && (
            <motion.div
              layout
              className={cn('rounded-full bg-muted px-1.5 py-1', togglingGroup === 'online' ? 'z-5' : 'z-10')}
              transition={GROUP_CONTAINER_TRANSITION}
            >
              <div key={online.map((u) => u.id).join('_') + '-online'} className="flex items-center -space-x-2.5">
                {online.map((user) => (
                  <Tooltip key={user.id}>
                    <TooltipTrigger
                      render={
                        <motion.button
                          type="button"
                          layoutId={`avatar-${user.id}`}
                          className="relative flex size-full cursor-pointer rounded-full outline-none focus-visible:ring-2 focus-visible:ring-ring"
                          onClick={() => toggleStatus(user.id)}
                          animate={{
                            filter: 'grayscale(0)',
                            scale: 1,
                          }}
                          transition={AVATAR_MOTION_TRANSITION}
                          aria-label={`${user.name} (Online - click to set offline)`}
                          initial={false}
                        >
                          <AvatarExtended>
                            <Avatar className="size-10">
                              <AvatarImage src={user.src} alt={user.name} />
                              <AvatarFallback>{user.fallback}</AvatarFallback>
                            </Avatar>
                            <AvatarRing className="ring-background" />
                          </AvatarExtended>
                        </motion.button>
                      }
                    />
                    <TooltipContent>
                      <span>{user.name}</span>
                    </TooltipContent>
                  </Tooltip>
                ))}
              </div>
            </motion.div>
          )}

          {offline.length > 0 && (
            <motion.div
              layout
              className={cn('rounded-full bg-muted px-1.5 py-1', togglingGroup === 'offline' ? 'z-5' : 'z-10')}
              transition={GROUP_CONTAINER_TRANSITION}
            >
              <div key={offline.map((u) => u.id).join('_') + '-offline'} className="flex items-center -space-x-2.5">
                {offline.map((user) => (
                  <Tooltip key={user.id}>
                    <TooltipTrigger
                      render={
                        <motion.button
                          type="button"
                          layoutId={`avatar-${user.id}`}
                          className="relative flex size-full cursor-pointer rounded-full outline-none focus-visible:ring-2 focus-visible:ring-ring"
                          onClick={() => toggleStatus(user.id)}
                          animate={{
                            filter: 'grayscale(1)',
                            scale: 1,
                          }}
                          transition={AVATAR_MOTION_TRANSITION}
                          aria-label={`${user.name} (Offline - click to set online)`}
                          initial={false}
                        >
                          <AvatarExtended>
                            <Avatar className="size-10">
                              <AvatarImage src={user.src} alt={user.name} />
                              <AvatarFallback>{user.fallback}</AvatarFallback>
                              <AvatarRing className="ring-background" />
                            </Avatar>
                          </AvatarExtended>
                        </motion.button>
                      }
                    />
                    <TooltipContent>
                      <span>{user.name}</span>
                    </TooltipContent>
                  </Tooltip>
                ))}
              </div>
            </motion.div>
          )}
        </TooltipProvider>
      </LayoutGroup>
    </div>
  )
}

export { UserPresenceAvatar }
