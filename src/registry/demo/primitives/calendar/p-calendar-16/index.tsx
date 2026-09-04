'use client'

import { addDays } from 'date-fns'
import { useState } from 'react'
import { Button } from '@/registry/primitives/button'
import { Calendar } from '@/registry/primitives/calendar'

export default function Demo() {
  const today = new Date()
  const selectedDay = addDays(today, -28)
  const [month, setMonth] = useState(selectedDay)
  const [date, setDate] = useState<Date | undefined>(selectedDay)

  return (
    <div className="flex flex-col items-start gap-2">
      <Calendar mode="single" month={month} onMonthChange={setMonth} onSelect={setDate} selected={date} />
      <Button
        onClick={() => {
          setDate(today)
          setMonth(today)
        }}
        size="sm"
        variant="outline"
      >
        Today
      </Button>
    </div>
  )
}
