import { AvatarFallback, AvatarImage, LiquidMetalAvatar } from '@/registry/components/spaceui/liquid-metal-avatar'

export function LiquidMetalAvatarDefault() {
  return (
    <LiquidMetalAvatar>
      <AvatarImage src="https://avatars.spaceui.one/v1?name=evilrabbit&variant=pebble" alt="Evil Rabbit" />
      <AvatarFallback>ER</AvatarFallback>
    </LiquidMetalAvatar>
  )
}
