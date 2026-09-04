import { Slider } from '@/registry/primitives/slider'

export default function Particle() {
  return (
    <div className="flex h-40 items-center justify-center">
      <Slider defaultValue={[25, 75]} orientation="vertical" />
    </div>
  )
}
