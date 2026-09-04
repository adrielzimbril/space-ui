'use client'

import { AutoscaleInput } from '@/registry/components/spaceui/autoscale-input'

export default function Demo() {
  return (
    <div className="flex w-full max-w-sm flex-col items-center justify-center px-6 py-10">
      <AutoscaleInput defaultValue="1234567.89" prefix="$" numberFormat="us" aria-label="Amount" />
    </div>
  )
}
