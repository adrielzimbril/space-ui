'use client'

import { IconSearch } from '@tabler/icons-react'
import { useMemo } from 'react'
import {
  Combobox,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
  ComboboxPopup,
  ComboboxTrigger,
  ComboboxValue,
} from '@/registry/primitives/combobox'
import { SelectButton } from '@/registry/primitives/select'

export default function Particle() {
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

  const _defaultTimezone = formattedTimezones.find((tz) => tz.value === 'Europe/London')

  return (
    <Combobox autoHighlight items={formattedTimezones}>
      <ComboboxTrigger render={<SelectButton />}>
        <ComboboxValue placeholder="Select timezone" />
      </ComboboxTrigger>
      <ComboboxPopup aria-label="Select timezone">
        <div className="border-b p-2">
          <ComboboxInput
            className="rounded-md before:rounded-[calc(var(--radius-md)-1px)]"
            placeholder="e.g. Europe/London"
            showTrigger={false}
            startAddon={<IconSearch />}
          />
        </div>
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
