'use client'

import { format } from 'date-fns'
import { IconCalendar } from '@tabler/icons-react'
import { useState } from 'react'
import { Button } from '@/registry/primitives/button'
import { Calendar } from '@/registry/primitives/calendar'
import { Popover, PopoverPopup, PopoverTrigger } from '@/registry/primitives/popover'

export default function Particle() {
  const [date, setDate] = useState<Date | undefined>()
  const [open, setOpen] = useState(false)

  const handleSelect = (selectedDate: Date | undefined) => {
    setDate(selectedDate)
    setOpen(false)
  }

  return (
    <Popover onOpenChange={setOpen} open={open}>
      <PopoverTrigger render={<Button className="w-full justify-start" variant="outline" />}>
        <IconCalendar />
        {date ? format(date, 'PPP') : 'Pick a date'}
      </PopoverTrigger>
      <PopoverPopup>
        <Calendar mode="single" onSelect={handleSelect} selected={date} />
      </PopoverPopup>
    </Popover>
  )
}
