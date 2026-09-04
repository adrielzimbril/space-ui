'use client'

import { format } from 'date-fns'
import { IconCalendar } from '@tabler/icons-react'
import { useState } from 'react'
import { Button } from '@/registry/primitives/button'
import { Calendar } from '@/registry/primitives/calendar'
import { Popover, PopoverPopup, PopoverTrigger } from '@/registry/primitives/popover'

export default function Particle() {
  const [date, setDate] = useState<Date | undefined>()

  return (
    <Popover>
      <PopoverTrigger render={<Button className="w-full justify-start" variant="outline" />}>
        <IconCalendar aria-hidden="true" />
        {date ? format(date, 'PPP') : 'Pick a date'}
      </PopoverTrigger>
      <PopoverPopup>
        <Calendar defaultMonth={date} mode="single" onSelect={setDate} selected={date} />
      </PopoverPopup>
    </Popover>
  )
}
