'use client'

import { format } from 'date-fns'
import { useState } from 'react'
import { Calendar } from '@/registry/primitives/calendar'
import { ScrollArea } from '@/registry/primitives/scroll-area'
import { Toggle } from '@/registry/primitives/toggle'
import { ToggleGroup } from '@/registry/primitives/toggle-group'

export default function Demo() {
  const today = new Date()
  const [date, setDate] = useState<Date>(today)
  const [time, setTime] = useState<string | null>(null)

  const timeSlots = [
    { available: false, time: '09:00' },
    { available: false, time: '09:30' },
    { available: true, time: '10:00' },
    { available: true, time: '10:30' },
    { available: true, time: '11:00' },
    { available: true, time: '11:30' },
    { available: false, time: '12:00' },
    { available: true, time: '12:30' },
    { available: true, time: '13:00' },
    { available: true, time: '13:30' },
    { available: true, time: '14:00' },
    { available: false, time: '14:30' },
    { available: false, time: '15:00' },
    { available: true, time: '15:30' },
    { available: true, time: '16:00' },
    { available: true, time: '16:30' },
    { available: true, time: '17:00' },
    { available: true, time: '17:30' },
  ]

  return (
    <div className="flex max-sm:flex-col">
      <Calendar
        className="max-sm:pb-3 sm:pe-5"
        disabled={[{ before: today }]}
        mode="single"
        onSelect={(newDate) => {
          if (newDate) {
            setDate(newDate)
            setTime(null)
          }
        }}
        selected={date}
      />
      <div className="relative w-full max-sm:h-48 sm:w-40">
        <div className="absolute inset-0 max-sm:border-t">
          <ScrollArea className="h-full sm:border-s" scrollbarGutter scrollFade>
            <div className="flex flex-col gap-3 py-3 sm:pt-0 sm:pb-2">
              <div className="flex shrink-0 items-center font-medium text-sm sm:h-8 sm:px-5">
                {format(date, 'EEEE, d')}
              </div>
              <ToggleGroup
                className="grid w-full gap-1.5 max-sm:grid-cols-2 sm:px-5"
                onValueChange={(values) => setTime(values[0] || null)}
                value={time ? [time] : []}
              >
                {timeSlots.map(({ time: timeSlot, available }) => (
                  <Toggle disabled={!available} key={timeSlot} size="sm" value={timeSlot} variant="outline">
                    {timeSlot}
                  </Toggle>
                ))}
              </ToggleGroup>
            </div>
          </ScrollArea>
        </div>
      </div>
    </div>
  )
}
