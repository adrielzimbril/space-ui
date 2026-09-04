import { Avatar, AvatarFallback, AvatarImage } from '@/registry/primitives/avatar'
import { AvatarGroup, AvatarGroupAction } from '@/registry/components/spaceui/avatar-group'
import { IconPlus } from '@tabler/icons-react'

export default function Demo() {
  return (
    <div className="flex flex-col items-center gap-10">
      <div className="flex flex-col items-center gap-2">
        <span className="text-sm text-muted-foreground">Action with Text Count</span>
        <AvatarGroup>
          <Avatar className="ring-2 ring-muted">
            <AvatarImage alt="Elon Musk" src="https://avatars.spaceui.one/v1?name=elonmusk&variant=pebble" />
            <AvatarFallback>EM</AvatarFallback>
          </Avatar>
          <Avatar className="ring-2 ring-muted">
            <AvatarImage alt="Nova" src="https://avatars.spaceui.one/v1?name=nova&variant=invader" />
            <AvatarFallback>NV</AvatarFallback>
          </Avatar>
          <Avatar className="ring-2 ring-muted">
            <AvatarImage alt="Evil Rabbit" src="https://avatars.spaceui.one/v1?name=evilrabbit&variant=kendo" />
            <AvatarFallback>ER</AvatarFallback>
          </Avatar>
          <AvatarGroupAction className="ring-2 ring-muted">+7</AvatarGroupAction>
        </AvatarGroup>
      </div>

      <div className="flex flex-col items-center gap-2">
        <span className="text-sm text-muted-foreground">Action with Icon</span>
        <AvatarGroup>
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
          <AvatarGroupAction className="ring-2 ring-muted">
            <IconPlus className="size-4" />
          </AvatarGroupAction>
        </AvatarGroup>
      </div>
    </div>
  )
}
