'use client'

import { useMemo } from 'react'
import {
  Combobox,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
  ComboboxPopup,
} from '@/registry/primitives/combobox'

export default function Demo() {
  const timezones = Intl.supportedValuesOf('timeZone')

  const formattedTimezones = useMemo(() => {
    return timezones
      .map((timezone) => {
        const formatter = new Intl.DateTimeFormat('en', {
          timeZone: timezone,
          timeZoneName: 'shortOffset',
        })
        const parts = formatter.formatToParts(new Date())
        const offset = parts.find((part) => part.type === 'timeZoneName')?.value || ''
        const modifiedOffset = offset === 'GMT' ? 'GMT+0' : offset

        const offsetMatch = offset.match(/GMT([+-]?)(\d+)(?::(\d+))?/)
        const sign = offsetMatch?.[1] === '-' ? -1 : 1
        const hours = Number.parseInt(offsetMatch?.[2] || '0', 10)
        const minutes = Number.parseInt(offsetMatch?.[3] || '0', 10)
        const totalMinutes = sign * (hours * 60 + minutes)

        return {
          label: `(${modifiedOffset}) ${timezone.replace(/_/g, ' ')}`,
          numericOffset: totalMinutes,
          value: timezone,
        }
      })
      .sort((a, b) => a.numericOffset - b.numericOffset)
  }, [timezones])

  const defaultTimezone = formattedTimezones.find((tz) => tz.value === 'Europe/London')

  return (
    <Combobox autoHighlight defaultValue={defaultTimezone} items={formattedTimezones}>
      <ComboboxInput aria-label="Select timezone" placeholder="Select timezone..." />
      <ComboboxPopup>
        <ComboboxEmpty>No timezones found.</ComboboxEmpty>
        <ComboboxList>
          {(item) => (
            <ComboboxItem key={item.value} value={item}>
              {item.label}
            </ComboboxItem>
          )}
        </ComboboxList>
      </ComboboxPopup>
    </Combobox>
  )
}
