'use client'

import type { DropdownProps } from '@daypicker/react'
import * as React from 'react'
import { Calendar } from '@/registry/primitives/calendar'
import {
  Combobox,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
  ComboboxPopup,
} from '@/registry/primitives/combobox'

interface DropdownItem {
  disabled?: boolean
  label: string
  value: string
}

function YearDropdown(props: DropdownProps) {
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

export default function Particle() {
  const [date, setDate] = React.useState<Date | undefined>(new Date())
  return (
    <Calendar
      captionLayout="dropdown-years"
      classNames={{
        dropdowns: '*:flex-1 *:[span]:text-center',
      }}
      components={{ Dropdown: YearDropdown }}
      endMonth={new Date(2030, 11)}
      mode="single"
      onSelect={setDate}
      selected={date}
      startMonth={new Date(1930, 0)}
    />
  )
}
