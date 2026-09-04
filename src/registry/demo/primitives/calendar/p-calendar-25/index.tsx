'use client'

import { format } from 'date-fns'
import { IconClock } from '@tabler/icons-react'
import { useState } from 'react'
import {
  Autocomplete,
  AutocompleteInput,
  AutocompleteItem,
  AutocompleteList,
  AutocompletePopup,
} from '@/registry/primitives/autocomplete'
import { Calendar } from '@/registry/primitives/calendar'
import { Field, FieldLabel } from '@/registry/primitives/field'

const times = Array.from({ length: 96 }, (_, i) => {
  const hours = String(Math.floor(i / 4)).padStart(2, '0')
  const minutes = String((i % 4) * 15).padStart(2, '0')
  return `${hours}:${minutes}`
})

function parseTime(value: string): string | null {
  const trimmed = value.trim()
  if (!trimmed) {
    return null
  }

  const colonMatch = /^(\d{1,2}):(\d{1,2})$/.exec(trimmed)
  if (colonMatch) {
    const hours = Number(colonMatch[1])
    const minutes = Number(colonMatch[2])
    if (hours > 23 || minutes > 59) {
      return null
    }
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`
  }

  const digits = trimmed.replace(/\D/g, '')
  if (digits.length === 0 || digits.length > 4) {
    return null
  }

  let hours: number
  let minutes: number

  if (digits.length <= 2) {
    hours = Number(digits)
    minutes = 0
  } else if (digits.length === 3) {
    // HMM → H:MM (215 → 02:15)
    hours = Number(digits[0])
    minutes = Number(digits.slice(1))
  } else {
    // HHMM → HH:MM (2150 → 21:50)
    hours = Number(digits.slice(0, 2))
    minutes = Number(digits.slice(2))
  }

  if (hours > 23 || minutes > 59) {
    return null
  }

  return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`
}

/**
 * Live input formatting from a digit buffer:
 * - ≤2 digits: as-is
 * - 3 digits: H:MM (unpadded hour so a 4th digit can still become HHMM)
 * - 4 digits: HH:mm
 */
function formatTimeInput(value: string) {
  const digits = value.replace(/\D/g, '').slice(0, 4)

  if (digits.length <= 2) {
    return digits
  }

  if (digits.length === 3) {
    const minutes = Number(digits.slice(1))
    if (minutes <= 59) {
      return `${digits[0]}:${digits.slice(1)}`
    }
    return digits
  }

  return parseTime(digits) ?? digits
}

function filterTime(item: string, query: string) {
  const trimmed = query.trim().toLowerCase()
  if (!trimmed) {
    return true
  }

  if (item.toLowerCase().startsWith(trimmed)) {
    return true
  }

  const itemDigits = item.replace(/\D/g, '')
  const queryDigits = trimmed.replace(/\D/g, '')
  if (!queryDigits) {
    return false
  }

  const itemHour = Number(itemDigits.slice(0, 2))
  const itemMinutes = itemDigits.slice(2)
  // Padded "0615" and unpadded "615" so "61" matches 06:15 while typing toward 615
  const itemDigitsUnpadded = `${itemHour}${itemMinutes}`

  if (itemDigits.startsWith(queryDigits) || itemDigitsUnpadded.startsWith(queryDigits)) {
    return true
  }

  if (queryDigits.length >= 3) {
    const normalized = parseTime(queryDigits)
    return normalized === item
  }

  const queryHour = Number(queryDigits)

  if (trimmed.includes(':')) {
    const minuteQuery = trimmed.split(':')[1]?.replace(/\D/g, '') ?? ''
    return itemHour === queryHour && (!minuteQuery || itemMinutes.startsWith(minuteQuery))
  }

  if (queryDigits.length === 1) {
    return itemHour === queryHour || String(itemHour).startsWith(queryDigits)
  }

  return queryHour <= 23 && itemHour === queryHour
}

function applyTime(date: Date, time: string) {
  const parsed = parseTime(time)
  if (!parsed) {
    return date
  }
  const hours = Number(parsed.slice(0, 2))
  const minutes = Number(parsed.slice(3, 5))
  const next = new Date(date)
  next.setHours(hours, minutes, 0, 0)
  return next
}

export default function Particle() {
  const [date, setDate] = useState<Date | undefined>(() => {
    const initial = new Date()
    initial.setHours(12, 0, 0, 0)
    return initial
  })
  const [month, setMonth] = useState<Date>(() => new Date())
  const [time, setTime] = useState('12:00')
  const [isEditing, setIsEditing] = useState(false)

  const handleDaySelect = (selectedDate: Date | undefined) => {
    if (!selectedDate) {
      setDate(undefined)
      return
    }
    const next = applyTime(selectedDate, time)
    setDate(next)
    setMonth(next)
  }

  const handleTimeChange = (value: string) => {
    setIsEditing(true)
    const next = formatTimeInput(value)
    setTime(next)

    // List picks and completed HH:mm only — avoid committing mid-typing ("2:1" → 02:01)
    if (date && /^\d{2}:\d{2}$/.test(next)) {
      setDate(applyTime(date, next))
    }
  }

  const handleTimeBlur = () => {
    const normalized = parseTime(time)
    if (normalized) {
      setTime(normalized)
      if (date) {
        setDate(applyTime(date, normalized))
      }
    } else if (date) {
      setTime(format(date, 'HH:mm'))
    }
    setIsEditing(false)
  }

  const filterQuery = isEditing ? time : ''
  const matchingTimes = times.filter((item) => filterTime(item, filterQuery))

  return (
    <div className="flex w-fit flex-col gap-2">
      <Calendar mode="single" month={month} onMonthChange={setMonth} onSelect={handleDaySelect} selected={date} />
      <Field className="w-0 min-w-full flex-row items-center gap-3">
        <FieldLabel className="whitespace-nowrap text-xs">Enter time</FieldLabel>
        <Autocomplete
          autoHighlight
          filter={(item, query) => filterTime(item, isEditing ? query : '')}
          items={times}
          onValueChange={handleTimeChange}
          openOnInputClick
          value={time}
        >
          <AutocompleteInput
            aria-label="Enter time"
            inputMode="numeric"
            maxLength={5}
            onBlur={handleTimeBlur}
            onFocus={(event) => {
              setIsEditing(false)
              event.currentTarget.select()
            }}
            placeholder="HH:mm"
            startAddon={<IconClock aria-hidden="true" />}
          />
          <AutocompletePopup className={matchingTimes.length === 0 ? 'hidden' : undefined}>
            <AutocompleteList>
              {(item: string) => (
                <AutocompleteItem key={item} value={item}>
                  {item}
                </AutocompleteItem>
              )}
            </AutocompleteList>
          </AutocompletePopup>
        </Autocomplete>
      </Field>
    </div>
  )
}
