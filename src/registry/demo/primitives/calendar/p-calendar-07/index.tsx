'use client'

import { addDays } from 'date-fns'
import { Calendar } from '@/registry/primitives/calendar'

export default function Particle() {
  const today = new Date()

  return (
    <Calendar
      disabled={[
        { before: new Date() },
        new Date(),
        { dayOfWeek: [0, 6] },
        {
          from: addDays(today, 14),
          to: addDays(today, 16),
        },
        {
          from: addDays(today, 23),
          to: addDays(today, 24),
        },
      ]}
      excludeDisabled
      mode="range"
    />
  )
}
