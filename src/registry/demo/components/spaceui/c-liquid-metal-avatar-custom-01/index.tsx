import { AvatarFallback, AvatarImage, LiquidMetalAvatar } from '@/registry/components/spaceui/liquid-metal-avatar'

export function LiquidMetalAvatarCustom() {
  return (
    <LiquidMetalAvatar size="lg" speed={0.8} repetition={8} softness={0.7} shiftRed={0.5} shiftBlue={0.1}>
      <AvatarImage src="https://avatars.spaceui.one/v1?name=guillermo&variant=pebble" alt="Guillermo Rauch" />
      <AvatarFallback>GR</AvatarFallback>
    </LiquidMetalAvatar>
  )
}
