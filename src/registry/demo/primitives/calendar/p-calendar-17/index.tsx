'use client'

import { format, isValid, parse } from 'date-fns'
import { IconCalendar } from '@tabler/icons-react'
import { useState } from 'react'
import { Calendar } from '@/registry/primitives/calendar'
import { Field, FieldLabel } from '@/registry/primitives/field'
import { InputGroup, InputGroupAddon, InputGroupInput } from '@/registry/primitives/input-group'

export default function Particle() {
  const [date, setDate] = useState<Date | undefined>(() => new Date())
  const [month, setMonth] = useState<Date>(() => new Date())
  const [inputValue, setInputValue] = useState(() => format(new Date(), 'yyyy-MM-dd'))

  const handleDayPickerSelect = (selectedDate: Date | undefined) => {
    if (!selectedDate) {
      setInputValue('')
      setDate(undefined)
    } else {
      setDate(selectedDate)
      setMonth(selectedDate)
      setInputValue(format(selectedDate, 'yyyy-MM-dd'))
    }
  }

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

  return (
    <div className="flex flex-col gap-2">
      <Calendar mode="single" month={month} onMonthChange={setMonth} onSelect={handleDayPickerSelect} selected={date} />
      <Field className="flex-row items-center gap-4">
        <FieldLabel className="whitespace-nowrap">Enter date</FieldLabel>
        <InputGroup>
          <InputGroupInput
            aria-label="Select date"
            className="*:[input]:[&::-webkit-calendar-picker-indicator]:hidden *:[input]:[&::-webkit-calendar-picker-indicator]:appearance-none"
            onChange={handleInputChange}
            type="date"
            value={inputValue}
          />
          <InputGroupAddon>
            <IconCalendar aria-hidden="true" />
          </InputGroupAddon>
        </InputGroup>
      </Field>
    </div>
  )
}
