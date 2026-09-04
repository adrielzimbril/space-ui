import { Slider } from '@/registry/primitives/slider'

export default function Particle() {
  return (
    <Slider
      aria-label="Dual thumb slider with collision behavior swap"
      defaultValue={[25, 75]}
      thumbCollisionBehavior="swap"
    />
  )
}
