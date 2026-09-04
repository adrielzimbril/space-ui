import { Avatar, AvatarFallback, AvatarImage } from '@/registry/primitives/avatar'
import { AvatarGroup } from '@/registry/components/spaceui/avatar-group'

export default function AvatarGroupDemo() {
  return (
    <div className="flex flex-col items-center gap-10">
      <div className="flex flex-col items-center gap-2">
        <span className="text-sm text-muted-foreground">Right overlaps Left (Default)</span>
        <AvatarGroup>
          <Avatar className="ring-2 ring-muted">
            <AvatarImage alt="Elon Musk" src="https://avatars.spaceui.one/v1?name=elonmusk&variant=pebble" />
            <AvatarFallback>EM</AvatarFallback>
          </Avatar>
          <Avatar className="ring-2 ring-muted">
            <AvatarImage alt="Shadcn" src="https://avatars.spaceui.one/v1?name=shadcn&variant=invader" />
            <AvatarFallback>SH</AvatarFallback>
          </Avatar>
          <Avatar className="ring-2 ring-muted">
            <AvatarImage alt="Evil Rabbit" src="https://avatars.spaceui.one/v1?name=evilrabbit&variant=kendo" />
            <AvatarFallback>ER</AvatarFallback>
          </Avatar>
        </AvatarGroup>
      </div>

      <div className="flex flex-col items-center gap-2">
        <span className="text-sm text-muted-foreground">Left overlaps Right</span>
        <AvatarGroup stacking="left">
          <Avatar className="ring-2 ring-muted">
            <AvatarImage alt="Max" src="https://avatars.spaceui.one/v1?name=max&variant=pebble" />
            <AvatarFallback>MA</AvatarFallback>
          </Avatar>
          <Avatar className="ring-2 ring-muted">
            <AvatarImage alt="Guillermo Rauch" src="https://avatars.spaceui.one/v1?name=guillermo&variant=invader" />
            <AvatarFallback>GR</AvatarFallback>
          </Avatar>
          <Avatar className="ring-2 ring-muted">
            <AvatarImage alt="Lee Robinson" src="https://avatars.spaceui.one/v1?name=leerob&variant=kendo" />
            <AvatarFallback>LR</AvatarFallback>
          </Avatar>
        </AvatarGroup>
      </div>
    </div>
  )
}
