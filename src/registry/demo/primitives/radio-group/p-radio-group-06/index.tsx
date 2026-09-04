'use client'

import { segmentedControlItemVariants, segmentedControlRootClassName } from '@/registry/lib/segmented-control'
import { RadioGroupPrimitive, RadioPrimitive } from '@/registry/primitives/radio-group'

const smClassName = segmentedControlItemVariants({ className: 'grow', size: 'sm', state: 'checked' })
const defaultClassName = segmentedControlItemVariants({ className: 'grow', state: 'checked' })
const lgClassName = segmentedControlItemVariants({ className: 'grow', size: 'lg', state: 'checked' })

export default function Particle() {
  return (
    <div className="flex w-full max-w-sm flex-col gap-4">
      <RadioGroupPrimitive aria-label="Plan" className={segmentedControlRootClassName} defaultValue="pro">
        <RadioPrimitive.Root className={smClassName} value="free">
          Free
        </RadioPrimitive.Root>
        <RadioPrimitive.Root className={smClassName} value="pro">
          Pro
        </RadioPrimitive.Root>
        <RadioPrimitive.Root className={smClassName} value="enterprise">
          Enterprise
        </RadioPrimitive.Root>
      </RadioGroupPrimitive>

      <RadioGroupPrimitive aria-label="Plan" className={segmentedControlRootClassName} defaultValue="pro">
        <RadioPrimitive.Root className={defaultClassName} value="free">
          Free
        </RadioPrimitive.Root>
        <RadioPrimitive.Root className={defaultClassName} value="pro">
          Pro
        </RadioPrimitive.Root>
        <RadioPrimitive.Root className={defaultClassName} value="enterprise">
          Enterprise
        </RadioPrimitive.Root>
      </RadioGroupPrimitive>

      <RadioGroupPrimitive aria-label="Plan" className={segmentedControlRootClassName} defaultValue="pro">
        <RadioPrimitive.Root className={lgClassName} value="free">
          Free
        </RadioPrimitive.Root>
        <RadioPrimitive.Root className={lgClassName} value="pro">
          Pro
        </RadioPrimitive.Root>
        <RadioPrimitive.Root className={lgClassName} value="enterprise">
          Enterprise
        </RadioPrimitive.Root>
      </RadioGroupPrimitive>
    </div>
  )
}
