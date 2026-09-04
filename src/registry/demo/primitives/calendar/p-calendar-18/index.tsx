'use client'

import { IconClock } from '@tabler/icons-react'
import { useState } from 'react'
import { Calendar } from '@/registry/primitives/calendar'
import { Field, FieldLabel } from '@/registry/primitives/field'
import { InputGroup, InputGroupAddon, InputGroupInput } from '@/registry/primitives/input-group'

export default function Demo() {
  const [date, setDate] = useState<Date | undefined>(() => new Date())
  const [month, setMonth] = useState<Date>(() => new Date())
  const [timeValue, setTimeValue] = useState('12:00:00')

  const handleDayPickerSelect = (selectedDate: Date | undefined) => {
    setDate(selectedDate)
    if (selectedDate) {
      setMonth(selectedDate)
    }
  }

  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTimeValue(e.target.value)
  }

  return (
    <div className="flex flex-col gap-2">
      <Calendar mode="single" month={month} onMonthChange={setMonth} onSelect={handleDayPickerSelect} selected={date} />
      <Field className="flex-row items-center gap-3">
        <FieldLabel className="whitespace-nowrap text-xs">Enter time</FieldLabel>
        <InputGroup className="grow">
          <InputGroupInput
            aria-label="Select time"
            className="*:[input]:[&::-webkit-calendar-picker-indicator]:hidden *:[input]:[&::-webkit-calendar-picker-indicator]:appearance-none"
            onChange={handleTimeChange}
            step="1"
            type="time"
            value={timeValue}
          />
          <InputGroupAddon>
            <IconClock aria-hidden="true" />
          </InputGroupAddon>
        </InputGroup>
      </Field>
    </div>
  )
}
