'use client'

import { useState } from 'react'
import { Calendar } from '@/registry/primitives/calendar'

export default function Demo() {
  const [date, setDate] = useState<Date | undefined>(new Date())

  return (
    <Calendar
      classNames={{
        month_caption: 'ms-0 me-[calc(var(--cell-size)*2)] justify-start',
        nav: 'justify-end',
      }}
      mode="single"
      onSelect={setDate}
      selected={date}
    />
  )
}
