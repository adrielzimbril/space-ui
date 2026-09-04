import { LiquidMetalButton } from '@/registry/components/spaceui/liquid-metal-button'

export function LiquidMetalButtonCustom() {
  return (
    <LiquidMetalButton speed={1.2} repetition={6} softness={0.8} shiftRed={0.5} shiftBlue={0.1}>
      Custom Effect
    </LiquidMetalButton>
  )
}
