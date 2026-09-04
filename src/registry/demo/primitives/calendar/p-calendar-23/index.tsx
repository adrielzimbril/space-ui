'use client'

import type { DateRange } from '@daypicker/react'
import { addDays } from 'date-fns'
import { useState } from 'react'
import { Calendar } from '@/registry/primitives/calendar'

export default function Demo() {
  const today = new Date()
  const [date, setDate] = useState<DateRange | undefined>({
    from: today,
    to: addDays(today, 48),
  })

  return (
    <Calendar
      classNames={{
        month:
          'relative first-of-type:before:hidden before:absolute max-md:before:inset-x-2 max-md:before:h-px max-md:before:-top-4 md:before:inset-y-2 md:before:w-px before:bg-border md:before:-left-4',
        months: 'sm:flex-col md:flex-row gap-8',
      }}
      mode="range"
      numberOfMonths={3}
      onSelect={setDate}
      pagedNavigation
      selected={date}
      showOutsideDays={false}
    />
  )
}
