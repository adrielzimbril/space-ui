'use client'

import { format } from 'date-fns'
import { IconCalendar } from '@tabler/icons-react'
import { useState } from 'react'
import { Badge } from '@/registry/primitives/badge'
import { Button } from '@/registry/primitives/button'
import { Calendar } from '@/registry/primitives/calendar'
import { Popover, PopoverPopup, PopoverTrigger } from '@/registry/primitives/popover'

export default function Demo() {
  const [dates, setDates] = useState<Date[] | undefined>()

  return (
    <Popover>
      <PopoverTrigger render={<Button className="w-full justify-start" variant="outline" />}>
        <IconCalendar className="shrink-0" />
        <span className="flex flex-wrap gap-1">
          {dates && dates.length > 0 ? (
            <>
              {dates.slice(0, 3).map((date) => (
                <Badge key={date.toISOString()} variant="secondary">
                  {format(date, 'MMM d')}
                </Badge>
              ))}
              {dates.length > 3 && <Badge variant="secondary">+{dates.length - 3}</Badge>}
            </>
          ) : (
            <span>Pick dates</span>
          )}
        </span>
      </PopoverTrigger>
      <PopoverPopup>
        <Calendar mode="multiple" onSelect={setDates} selected={dates} />
      </PopoverPopup>
    </Popover>
  )
}
