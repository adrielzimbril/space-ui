'use client'

import { format } from 'date-fns'
import { useState } from 'react'
import { Calendar } from '@/registry/primitives/calendar'
import { Popover, PopoverPopup, PopoverTrigger } from '@/registry/primitives/popover'
import { SelectButton } from '@/registry/primitives/select'

export default function Demo() {
  const [date, setDate] = useState<Date | undefined>()

  return (
    <Popover>
      <PopoverTrigger render={<SelectButton data-placeholder={!date ? '' : undefined} />}>
        {date ? format(date, 'PPP') : 'Pick a date'}
      </PopoverTrigger>
      <PopoverPopup>
        <Calendar defaultMonth={date} mode="single" onSelect={setDate} selected={date} />
      </PopoverPopup>
    </Popover>
  )
}
