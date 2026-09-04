import { Avatar, AvatarFallback, AvatarImage } from '@/registry/primitives/avatar'
import { Button } from '@/registry/primitives/button'

export default function Particle() {
  return (
    <Button className="rounded-full ps-1">
      <Avatar className="size-6">
        <AvatarImage alt="Lauren Tan" src="https://avatars.spaceui.one/v1?name=poteto&variant=all" />
        <AvatarFallback>LT</AvatarFallback>
      </Avatar>
      @poteto
    </Button>
  )
}
