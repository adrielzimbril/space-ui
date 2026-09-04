'use client'

import { segmentedControlItemVariants, segmentedControlRootClassName } from '@/registry/lib/segmented-control'
import { RadioGroupPrimitive, RadioPrimitive } from '@/registry/primitives/radio-group'

const itemClassName = segmentedControlItemVariants({
  className: 'grow',
  state: 'checked',
})

export default function Demo() {
  return (
    <RadioGroupPrimitive aria-label="Billing period" className={segmentedControlRootClassName} defaultValue="monthly">
      <RadioPrimitive.Root className={itemClassName} value="monthly">
        Monthly
      </RadioPrimitive.Root>
      <RadioPrimitive.Root className={itemClassName} value="yearly">
        Yearly
      </RadioPrimitive.Root>
    </RadioGroupPrimitive>
  )
}
