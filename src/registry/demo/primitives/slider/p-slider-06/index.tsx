import { Slider } from '@/registry/primitives/slider'

export default function Demo() {
  return (
    <div>
      <div
        aria-hidden="true"
        className="mb-3 flex w-full items-center justify-between gap-2 font-medium text-muted-foreground text-xs"
      >
        <span>Low</span>
        <span>High</span>
      </div>
      <Slider aria-label="Intensity level from low to high" defaultValue={50} step={10} />
    </div>
  )
}
