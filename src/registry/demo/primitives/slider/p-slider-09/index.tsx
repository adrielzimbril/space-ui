import { Slider } from '@/registry/primitives/slider'

export default function Demo() {
  return (
    <Slider
      aria-label="Dual thumb slider with collision behavior none"
      defaultValue={[25, 75]}
      thumbCollisionBehavior="none"
    />
  )
}
