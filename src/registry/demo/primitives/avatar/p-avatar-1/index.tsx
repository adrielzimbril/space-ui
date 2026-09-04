import { Avatar, AvatarFallback, AvatarImage } from '@/registry/primitives/avatar'

export default function Particle() {
  return (
    <Avatar>
      <AvatarImage alt="Lauren Tan" src="https://avatars.spaceui.one/v1?name=laurentan&variant=glass" />
      <AvatarFallback>LT</AvatarFallback>
    </Avatar>
  )
}
