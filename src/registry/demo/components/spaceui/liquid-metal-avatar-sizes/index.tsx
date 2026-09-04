import { AvatarFallback, AvatarImage, LiquidMetalAvatar } from '@/registry/components/spaceui/liquid-metal-avatar'

export function LiquidMetalAvatarSizes() {
  return (
    <div className="flex items-center gap-4">
      <LiquidMetalAvatar size="sm">
        <AvatarImage src="https://avatars.spaceui.one/v1?name=elonmusk&variant=pebble" alt="Elon Musk" />
        <AvatarFallback>EM</AvatarFallback>
      </LiquidMetalAvatar>
      <LiquidMetalAvatar size="md">
        <AvatarImage src="https://avatars.spaceui.one/v1?name=shadcn&variant=pebble" alt="Shadcn" />
        <AvatarFallback>CN</AvatarFallback>
      </LiquidMetalAvatar>
      <LiquidMetalAvatar size="lg">
        <AvatarImage src="https://avatars.spaceui.one/v1?name=laurentan&variant=pebble" alt="Lauren Tan" />
        <AvatarFallback>LT</AvatarFallback>
      </LiquidMetalAvatar>
    </div>
  )
}
