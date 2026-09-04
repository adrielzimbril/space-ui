'use client'

import { IconBell, IconUser } from '@tabler/icons-react'
import type { ComponentType } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '@/registry/primitives/avatar'
import { Button } from '@/registry/primitives/button'
import {
  Popover,
  PopoverCreateHandle,
  PopoverDescription,
  PopoverPopup,
  PopoverTitle,
  PopoverTrigger,
} from '@/registry/primitives/popover'

const popoverHandle = PopoverCreateHandle<ComponentType>()

const NotificationsContent = () => {
  return (
    <>
      <PopoverTitle className="text-base">Notifications</PopoverTitle>
      <PopoverDescription>You have no new notifications at this time.</PopoverDescription>
    </>
  )
}

const ProfileContent = () => {
  return (
    <div className="w-48">
      <div className="flex items-center gap-3">
        <Avatar>
          <AvatarImage alt="Alexandr Wang" src="https://avatars.spaceui.one/v1?name=alexandrwang&variant=singularity" />
          <AvatarFallback>AW</AvatarFallback>
        </Avatar>
        <div className="min-w-0 flex-1">
          <h4 className="line-clamp-1 font-medium text-sm">Alexandr Wang</h4>
          <div className="flex items-center gap-3 text-muted-foreground text-xs">Product Designer</div>
        </div>
      </div>
      <Button className="mt-3 w-full" size="sm" variant="outline">
        Log out
      </Button>
    </div>
  )
}

export default function Demo() {
  return (
    <div className="flex gap-2">
      <PopoverTrigger
        handle={popoverHandle}
        payload={NotificationsContent}
        render={<Button aria-label="Notifications" size="icon" variant="outline" />}
      >
        <IconBell aria-hidden="true" />
      </PopoverTrigger>
      <PopoverTrigger
        handle={popoverHandle}
        payload={ProfileContent}
        render={<Button aria-label="Profile" size="icon" variant="outline" />}
      >
        <IconUser aria-hidden="true" />
      </PopoverTrigger>
      <Popover handle={popoverHandle}>
        {({ payload: Payload }) => (
          <PopoverPopup className="min-w-none">{Payload !== undefined && <Payload />}</PopoverPopup>
        )}
      </Popover>
    </div>
  )
}
