import { Field, FieldLabel } from '@/registry/primitives/field'
import { Slider, SliderValue } from '@/registry/primitives/slider'

export default function Demo() {
  return (
    <Field>
      <Slider defaultValue={50}>
        <div className="mb-2 flex items-center justify-between gap-1">
          <FieldLabel className="font-medium text-sm">Opacity</FieldLabel>
          <SliderValue />
        </div>
      </Slider>
    </Field>
  )
}
