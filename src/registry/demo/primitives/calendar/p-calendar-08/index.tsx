'use client'

import { addDays, subDays } from 'date-fns'
import { useState } from 'react'
import { Calendar } from '@/registry/primitives/calendar'

export default function Demo() {
  const today = new Date()
  const [date, setDate] = useState<Date[] | undefined>([
    subDays(today, 17),
    addDays(today, 2),
    addDays(today, 6),
    addDays(today, 8),
  ])

  return <Calendar mode="multiple" onSelect={setDate} selected={date} />
}
