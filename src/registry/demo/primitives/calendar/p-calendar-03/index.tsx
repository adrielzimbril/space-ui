'use client'

import type { DateRange } from '@daypicker/react'
import * as React from 'react'
import { Calendar } from '@/registry/primitives/calendar'

export default function Demo() {
  const [range, setRange] = React.useState<DateRange | undefined>({
    from: new Date(),
    to: new Date(new Date().setDate(new Date().getDate() + 7)),
  })

  return <Calendar mode="range" onSelect={setRange} selected={range} />
}
