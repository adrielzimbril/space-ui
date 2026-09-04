'use client'

import type { DateRange } from '@daypicker/react'
import { addDays } from 'date-fns'
import { useState } from 'react'
import { Calendar } from '@/registry/primitives/calendar'

export default function Demo() {
  const today = new Date()
  const [date, setDate] = useState<DateRange | undefined>({
    from: today,
    to: addDays(today, 3),
  })

  return (
    <Calendar
      classNames={{
        day: 'relative before:absolute before:inset-y-px before:inset-x-0 [&.range-start:not(.range-end):before]:bg-linear-to-end before:from-transparent before:from-50% before:to-accent before:to-50% [&.range-end:not(.range-start):before]:bg-linear-to-start',
        day_button:
          'rounded-full group-[.range-start:not(.range-end)]:rounded-e-full group-[.range-end:not(.range-start)]:rounded-s-full',
      }}
      mode="range"
      onSelect={setDate}
      selected={date}
    />
  )
}
