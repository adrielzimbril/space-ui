import { LiquidMetalButton } from '@/registry/components/spaceui/liquid-metal-button'

export function LiquidMetalButtonSizes() {
  return (
    <div className="flex flex-wrap items-center gap-4">
      <LiquidMetalButton size="sm">Small</LiquidMetalButton>
      <LiquidMetalButton size="md">Medium</LiquidMetalButton>
      <LiquidMetalButton size="lg">Large</LiquidMetalButton>
    </div>
  )
}
