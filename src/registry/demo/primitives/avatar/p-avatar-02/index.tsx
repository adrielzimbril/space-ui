import { Avatar, AvatarFallback, AvatarImage } from '@/registry/primitives/avatar'

export default function Particle() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <Avatar className="size-6">
        <AvatarImage alt="Guillermo Rauch" src="https://avatars.spaceui.one/v1?name=mercury&variant=lumina" />
        <AvatarFallback className="text-[10px]">XS</AvatarFallback>
      </Avatar>
      <Avatar className="size-8">
        <AvatarImage alt="Guillermo Rauch" src="https://avatars.spaceui.one/v1?name=pluto&variant=shaula" />
        <AvatarFallback className="text-xs">SM</AvatarFallback>
      </Avatar>
      <Avatar className="size-10">
        <AvatarImage alt="Guillermo Rauch" src="https://avatars.spaceui.one/v1?name=neptune&variant=singularity" />
        <AvatarFallback className="text-sm">MD</AvatarFallback>
      </Avatar>
      <Avatar className="size-12">
        <AvatarImage alt="Guillermo Rauch" src="https://avatars.spaceui.one/v1?name=uranus&variant=triton" />
        <AvatarFallback className="text-base">LG</AvatarFallback>
      </Avatar>
      <Avatar className="size-14">
        <AvatarImage alt="Guillermo Rauch" src="https://avatars.spaceui.one/v1?name=earth&variant=solar-flare" />
        <AvatarFallback className="text-lg">XL</AvatarFallback>
      </Avatar>
    </div>
  )
}
