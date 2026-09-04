import { IconUser } from '@tabler/icons-react'
import { Avatar, AvatarFallback } from '@/registry/primitives/avatar'

export default function Demo() {
  return (
    <Avatar>
      <AvatarFallback>
        <IconUser className="size-4" />
      </AvatarFallback>
    </Avatar>
  )
}
