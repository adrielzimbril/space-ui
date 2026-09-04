import { Avatar, AvatarFallback, AvatarImage } from '@/registry/primitives/avatar'
import { AvatarExtended, AvatarBadge } from '@/registry/components/spaceui/avatar-extended'

export default function AvatarCounts() {
  return (
    <div className="flex flex-wrap items-center gap-8">
      <AvatarExtended>
        <Avatar>
          <AvatarImage alt="Elon Musk" src="https://avatars.spaceui.one/v1?name=elonmusk&variant=titan" />
          <AvatarFallback>EM</AvatarFallback>
        </Avatar>
        <AvatarBadge>1</AvatarBadge>
      </AvatarExtended>

      <AvatarExtended>
        <Avatar>
          <AvatarImage alt="Shadcn" src="https://avatars.spaceui.one/v1?name=shadcn&variant=glass" />
          <AvatarFallback>SH</AvatarFallback>
        </Avatar>
        <AvatarBadge variant="destructive">20</AvatarBadge>
      </AvatarExtended>

      <AvatarExtended>
        <Avatar>
          <AvatarImage alt="Evil Rabbit" src="https://avatars.spaceui.one/v1?name=evilrabbit&variant=pebble" />
          <AvatarFallback>ER</AvatarFallback>
        </Avatar>
        <AvatarBadge variant="info">+6</AvatarBadge>
      </AvatarExtended>
    </div>
  )
}
