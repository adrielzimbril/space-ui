'use client'

import { Radio, RadioGroup } from '@/registry/primitives/radio-group'

export default function Demo() {
  return (
    <RadioGroup defaultValue="small" className="flex items-center gap-4">
      <Radio value="small" className="size-3.5" />
      <Radio value="medium" className="size-4" />
      <Radio value="large" className="size-5" />
    </RadioGroup>
  )
}
