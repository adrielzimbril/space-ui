'use client'

import type { DateRange } from '@daypicker/react'
import { addDays } from 'date-fns'
import { useState } from 'react'
import { Calendar } from '@/registry/primitives/calendar'

export default function Particle() {
  const today = new Date()
  const [date, setDate] = useState<DateRange | undefined>({
    from: today,
    to: addDays(today, 25),
  })

  return (
    <Calendar
      classNames={{
        month:
          'relative first-of-type:before:hidden before:absolute max-sm:before:inset-x-2 max-sm:before:h-px max-sm:before:-top-2 sm:before:inset-y-2 sm:before:w-px before:bg-border sm:before:-left-4',
        months: 'gap-8',
      }}
      mode="range"
      numberOfMonths={2}
      onSelect={setDate}
      pagedNavigation
      selected={date}
      showOutsideDays={false}
    />
  )
}
