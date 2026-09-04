import { AvatarFallback, LiquidMetalAvatar } from '@/registry/components/spaceui/liquid-metal-avatar'

export function LiquidMetalAvatarFallback() {
  return (
    <LiquidMetalAvatar>
      <AvatarFallback>ER</AvatarFallback>
    </LiquidMetalAvatar>
  )
}
