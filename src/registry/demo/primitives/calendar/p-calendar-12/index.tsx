'use client'

import type { WeekNumberProps } from '@daypicker/react'
import { useState } from 'react'
import { Calendar } from '@/registry/primitives/calendar'

export default function Demo() {
  const [date, setDate] = useState<Date | undefined>(new Date())

  return (
    <Calendar
      components={{
        WeekNumber: ({ week, ...props }: WeekNumberProps) => {
          return (
            <th {...props}>
              <span className="inline-flex size-(--cell-size) items-center justify-center">{week.weekNumber}</span>
            </th>
          )
        },
      }}
      fixedWeeks
      mode="single"
      onSelect={setDate}
      selected={date}
      showWeekNumber
    />
  )
}
