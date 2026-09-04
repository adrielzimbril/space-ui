'use client'

import { IconArrowRight } from '@tabler/icons-react'
import { Button } from '@/registry/primitives/button'
import { Group, GroupSeparator } from '@/registry/primitives/group'
import { NumberField, NumberFieldGroup, NumberFieldInput } from '@/registry/primitives/number-field'
import { Select, SelectItem, SelectPopup, SelectTrigger, SelectValue } from '@/registry/primitives/select'

interface Currency {
  value: string
  label: string
}

const currencies: Currency[] = [
  {
    label: 'US Dollar',
    value: '$',
  },
  {
    label: 'Euro',
    value: '€',
  },
  {
    label: 'British Pound',
    value: '£',
  },
]

export default function Demo() {
  return (
    <Group aria-label="Payment amount">
      <Group aria-label="Amount input">
        <Select defaultValue={currencies[0]} itemToStringValue={(currency) => currency.value}>
          <SelectTrigger className="w-fit min-w-none">
            <SelectValue>{(currency: Currency) => currency.value}</SelectValue>
          </SelectTrigger>
          <SelectPopup className="min-w-48">
            {currencies.map((curr) => (
              <SelectItem key={curr.value} value={curr}>
                {curr.value} <span className="ms-1">{curr.label}</span>
              </SelectItem>
            ))}
          </SelectPopup>
        </Select>
        <GroupSeparator />
        <NumberField aria-label="Enter the amount" className="gap-0" defaultValue={10} render={<NumberFieldGroup />}>
          <NumberFieldInput className="text-left" />
        </NumberField>
      </Group>
      <Group aria-label="Submit">
        <Button aria-label="Send" size="icon" variant="outline">
          <IconArrowRight aria-hidden="true" />
        </Button>
      </Group>
    </Group>
  )
}
