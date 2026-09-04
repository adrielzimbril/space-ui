'use client'

import type { DropdownProps } from '@daypicker/react'
import { format } from 'date-fns'
import { IconCalendar } from '@tabler/icons-react'
import * as React from 'react'
import { Button } from '@/registry/primitives/button'
import { Calendar } from '@/registry/primitives/calendar'
import {
  Combobox,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
  ComboboxPopup,
} from '@/registry/primitives/combobox'
import { Field, FieldLabel } from '@/registry/primitives/field'
import { Popover, PopoverPopup, PopoverTrigger } from '@/registry/primitives/popover'

interface DropdownItem {
  disabled?: boolean
  label: string
  value: string
}

function CalendarDropdown(props: DropdownProps) {
  const { options, value, onChange, 'aria-label': ariaLabel } = props

  const items: DropdownItem[] =
    options?.map((option) => ({
      disabled: option.disabled,
      label: option.label,
      value: option.value.toString(),
    })) ?? []

  const selectedItem = items.find((item) => item.value === value?.toString())

  const handleValueChange = (newValue: DropdownItem | null) => {
    if (onChange && newValue) {
      const syntheticEvent = {
        target: { value: newValue.value },
      } as React.ChangeEvent<HTMLSelectElement>
      onChange(syntheticEvent)
    }
  }

  return (
    <Combobox aria-label={ariaLabel} autoHighlight items={items} onValueChange={handleValueChange} value={selectedItem}>
      <ComboboxInput className="**:[input]:w-0 **:[input]:flex-1" onFocus={(e) => e.currentTarget.select()} />
      <ComboboxPopup aria-label={ariaLabel}>
        <ComboboxEmpty>No items found.</ComboboxEmpty>
        <ComboboxList>
          {(item: DropdownItem) => (
            <ComboboxItem disabled={item.disabled} key={item.value} value={item}>
              {item.label}
            </ComboboxItem>
          )}
        </ComboboxList>
      </ComboboxPopup>
    </Combobox>
  )
}

export default function Demo() {
  const [date, setDate] = React.useState<Date | undefined>()
  const id = React.useId()
  return (
    <Field>
      <FieldLabel htmlFor={id}>Start date</FieldLabel>
      <Popover>
        <PopoverTrigger id={id} render={<Button className="w-full justify-start" variant="outline" />}>
          <IconCalendar aria-hidden="true" />
          {date ? format(date, 'PPP') : 'Pick a date'}
        </PopoverTrigger>
        <PopoverPopup>
          <Calendar
            captionLayout="dropdown"
            components={{ Dropdown: CalendarDropdown }}
            defaultMonth={date}
            endMonth={new Date()}
            mode="single"
            onSelect={setDate}
            selected={date}
            startMonth={new Date(1900, 0)}
          />
        </PopoverPopup>
      </Popover>
    </Field>
  )
}
