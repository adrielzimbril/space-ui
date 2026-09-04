import { Avatar, AvatarFallback, AvatarImage } from '@/registry/primitives/avatar'
import { AvatarExtended, AvatarRing } from '@/registry/components/spaceui/avatar-extended'

export default function Demo() {
  return (
    <div className="flex flex-wrap items-center gap-6">
      <AvatarExtended>
        <Avatar>
          <AvatarImage alt="Elon Musk" src="https://avatars.spaceui.one/v1?name=orion&variant=titan" />
          <AvatarFallback>EM</AvatarFallback>
        </Avatar>
        <AvatarRing />
      </AvatarExtended>

      <AvatarExtended>
        <Avatar className="rounded-lg">
          <AvatarImage alt="Nova" src="https://avatars.spaceui.one/v1?name=lyra&variant=glass" />
          <AvatarFallback>NV</AvatarFallback>
        </Avatar>
        <AvatarRing className="rounded-lg ring-emerald-500" />
      </AvatarExtended>

      <AvatarExtended>
        <Avatar className="rounded-xl">
          <AvatarImage alt="Evil Rabbit" src="https://avatars.spaceui.one/v1?name=vega&variant=pebble" />
          <AvatarFallback>ER</AvatarFallback>
        </Avatar>
        <AvatarRing className=" rounded-xl ring-rose-500" />
      </AvatarExtended>
    </div>
  )
}
