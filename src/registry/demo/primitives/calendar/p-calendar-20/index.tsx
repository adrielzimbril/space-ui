'use client'

import { subDays, subMonths, subYears } from 'date-fns'
import { useState } from 'react'
import { Button } from '@/registry/primitives/button'
import { Calendar } from '@/registry/primitives/calendar'

export default function Particle() {
  const today = new Date()
  const yesterday = subDays(today, 1)
  const lastWeek = subDays(today, 7)
  const lastMonth = subMonths(today, 1)
  const lastYear = subYears(today, 1)
  const [month, setMonth] = useState(today)
  const [date, setDate] = useState<Date>(today)

  return (
    <div className="flex max-sm:flex-col">
      <div className="relative py-1 ps-1 max-sm:order-1 max-sm:border-t">
        <div className="flex h-full flex-col sm:border-e sm:pe-3">
          <Button
            className="w-full justify-start"
            onClick={() => {
              setDate(today)
              setMonth(today)
            }}
            size="sm"
            variant="ghost"
          >
            Today
          </Button>
          <Button
            className="w-full justify-start"
            onClick={() => {
              setDate(yesterday)
              setMonth(yesterday)
            }}
            size="sm"
            variant="ghost"
          >
            Yesterday
          </Button>
          <Button
            className="w-full justify-start"
            onClick={() => {
              setDate(lastWeek)
              setMonth(lastWeek)
            }}
            size="sm"
            variant="ghost"
          >
            Last week
          </Button>
          <Button
            className="w-full justify-start"
            onClick={() => {
              setDate(lastMonth)
              setMonth(lastMonth)
            }}
            size="sm"
            variant="ghost"
          >
            Last month
          </Button>
          <Button
            className="w-full justify-start"
            onClick={() => {
              setDate(lastYear)
              setMonth(lastYear)
            }}
            size="sm"
            variant="ghost"
          >
            Last year
          </Button>
        </div>
      </div>
      <Calendar
        className="max-sm:pb-3 sm:ps-5"
        disabled={[{ after: today }]}
        mode="single"
        month={month}
        onMonthChange={setMonth}
        onSelect={(newDate) => {
          if (newDate) {
            setDate(newDate)
          }
        }}
        selected={date}
      />
    </div>
  )
}
