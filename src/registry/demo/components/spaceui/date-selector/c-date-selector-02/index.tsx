'use client'

import { IconCalendarEvent } from '@tabler/icons-react'
import { useEffect, useState } from 'react'
import { DateSelector, formatDateValue, type DateSelectorValue } from '@/registry/components/spaceui/date-selector'

import { Button } from '@/registry/primitives/button'
import { Popover, PopoverContent, PopoverTrigger } from '@/registry/primitives/popover'
import { Separator } from '@/registry/primitives/separator'
export default function Demo() {
  const [value, setValue] = useState<DateSelectorValue | undefined>()
  const [open, setOpen] = useState(false)
  const [internalValue, setInternalValue] = useState<DateSelectorValue | undefined>(value)

  const formattedValue = value ? formatDateValue(value) : ''
  const displayText = formattedValue || 'Select a date'

  useEffect(() => {
    if (open) {
      setInternalValue(value)
    }
  }, [open, value])

  const handleApply = () => {
    setValue(internalValue)
    setOpen(false)
  }

  const handleCancel = () => {
    setInternalValue(value)
    setOpen(false)
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger
        render={
          <Button variant="outline" className="w-56 justify-start">
            <IconCalendarEvent />
            {displayText}
          </Button>
        }
      />
      <PopoverContent className="w-auto gap-3 p-0" align="start" sideOffset={4}>
        <div className="p-3">
          <DateSelector
            value={internalValue}
            onChange={setInternalValue}
            allowRange={true}
            label="Due date"
            inputHint="Try: 2025, Q4, 05/10/2025"
          />
        </div>
        <Separator className="p-0" />
        <div className="flex justify-end gap-2 p-3 pt-0">
          <Button variant="outline" onClick={handleCancel}>
            Cancel
          </Button>
          <Button onClick={handleApply}>Apply</Button>
        </div>
      </PopoverContent>
    </Popover>
  )
}
