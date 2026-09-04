import { Avatar, AvatarFallback, AvatarImage } from '@/registry/primitives/avatar'
import { AvatarExtended, AvatarIndicator } from '@/registry/components/spaceui/avatar-extended'

export default function AvatarStatus() {
  return (
    <div className="flex flex-wrap items-center gap-6">
      <AvatarExtended>
        <Avatar>
          <AvatarImage alt="Online" src="https://avatars.spaceui.one/v1?name=online&variant=invader" />
          <AvatarFallback>ON</AvatarFallback>
        </Avatar>
        <AvatarIndicator className="bg-emerald-500" />
      </AvatarExtended>

      <AvatarExtended>
        <Avatar>
          <AvatarImage alt="Do not disturb" src="https://avatars.spaceui.one/v1?name=dnd&variant=pebble" />
          <AvatarFallback>DD</AvatarFallback>
        </Avatar>
        <AvatarIndicator className="bg-red-500" />
      </AvatarExtended>

      <AvatarExtended>
        <Avatar>
          <AvatarImage alt="Busy" src="https://avatars.spaceui.one/v1?name=busy&variant=kendo" />
          <AvatarFallback>BU</AvatarFallback>
        </Avatar>
        <AvatarIndicator className="bg-amber-500" />
      </AvatarExtended>

      <AvatarExtended>
        <Avatar>
          <AvatarImage alt="Away" src="https://avatars.spaceui.one/v1?name=away&variant=titan" />
          <AvatarFallback>AW</AvatarFallback>
        </Avatar>
        <AvatarIndicator className="bg-violet-500" />
      </AvatarExtended>

      <AvatarExtended>
        <Avatar className="rounded-lg">
          <AvatarImage alt="Offline" src="https://avatars.spaceui.one/v1?name=offline&variant=triton" />
          <AvatarFallback>OF</AvatarFallback>
        </Avatar>
        <AvatarIndicator className="bg-slate-400" />
      </AvatarExtended>
    </div>
  )
}
