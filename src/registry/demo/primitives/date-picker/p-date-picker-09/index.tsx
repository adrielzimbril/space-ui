'use client'

import type { DateRange } from '@daypicker/react'
import { format } from 'date-fns'
import { IconCalendar } from '@tabler/icons-react'
import { useState } from 'react'
import { Button } from '@/registry/primitives/button'
import { Calendar } from '@/registry/primitives/calendar'
import { Popover, PopoverPopup, PopoverTrigger } from '@/registry/primitives/popover'

export default function Demo() {
  const [date, setDate] = useState<DateRange | undefined>()

  return (
    <Popover>
      <PopoverTrigger render={<Button className="w-full justify-start" variant="outline" />}>
        <IconCalendar aria-hidden="true" />
        {date?.from ? (
          date.to ? (
            <>
              {format(date.from, 'LLL dd, y')} - {format(date.to, 'LLL dd, y')}
            </>
          ) : (
            format(date.from, 'LLL dd, y')
          )
        ) : (
          <span>Pick a date range</span>
        )}
      </PopoverTrigger>
      <PopoverPopup>
        <Calendar defaultMonth={date?.from} mode="range" numberOfMonths={2} onSelect={setDate} selected={date} />
      </PopoverPopup>
    </Popover>
  )
}
