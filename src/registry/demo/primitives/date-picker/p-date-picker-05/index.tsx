'use client'

import { format, isValid, parse } from 'date-fns'
import { IconCalendar } from '@tabler/icons-react'
import { useState } from 'react'
import { Button } from '@/registry/primitives/button'
import { Calendar } from '@/registry/primitives/calendar'
import { InputGroup, InputGroupAddon, InputGroupInput } from '@/registry/primitives/input-group'
import { Popover, PopoverPopup, PopoverTrigger } from '@/registry/primitives/popover'

export default function Demo() {
  const [date, setDate] = useState<Date | undefined>()
  const [inputValue, setInputValue] = useState('')
  const [month, setMonth] = useState<Date>(() => new Date())

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setInputValue(value)

    if (value) {
      const parsedDate = parse(value, 'yyyy-MM-dd', new Date())
      if (isValid(parsedDate)) {
        setDate(parsedDate)
        setMonth(parsedDate)
      }
    } else {
      setDate(undefined)
    }
  }

  const handleSelect = (selectedDate: Date | undefined) => {
    setDate(selectedDate)
    if (selectedDate) {
      setInputValue(format(selectedDate, 'yyyy-MM-dd'))
      setMonth(selectedDate)
    } else {
      setInputValue('')
    }
  }

  return (
    <Popover>
      <InputGroup>
        <InputGroupInput
          aria-label="Select date"
          className="*:[input]:[&::-webkit-calendar-picker-indicator]:hidden *:[input]:[&::-webkit-calendar-picker-indicator]:appearance-none"
          onChange={handleInputChange}
          onClick={(e) => e.stopPropagation()}
          type="date"
          value={inputValue}
        />
        <InputGroupAddon>
          <PopoverTrigger
            aria-label="Select date"
            render={<Button aria-label="Select date" size="icon-xs" variant="ghost" />}
          >
            <IconCalendar aria-hidden="true" />
          </PopoverTrigger>
        </InputGroupAddon>
      </InputGroup>
      <PopoverPopup align="start" alignOffset={-4} sideOffset={8}>
        <Calendar mode="single" month={month} onMonthChange={setMonth} onSelect={handleSelect} selected={date} />
      </PopoverPopup>
    </Popover>
  )
}
