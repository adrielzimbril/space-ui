'use client'

import { IconX } from '@tabler/icons-react'
import { Button } from '@/registry/primitives/button'
import {
  Popover,
  PopoverClose,
  PopoverDescription,
  PopoverPopup,
  PopoverTitle,
  PopoverTrigger,
} from '@/registry/primitives/popover'

export default function Demo() {
  return (
    <Popover>
      <PopoverTrigger render={<Button variant="outline" />}>Open Popover</PopoverTrigger>
      <PopoverPopup className="w-80">
        <PopoverClose
          aria-label="Close"
          className="absolute end-2 top-2"
          render={<Button size="icon" variant="ghost" />}
        >
          <IconX />
        </PopoverClose>
        <div className="mb-2">
          <PopoverTitle className="text-base">Notifications</PopoverTitle>
          <PopoverDescription>You are all caught up. Good job!</PopoverDescription>
        </div>
        <PopoverClose render={<Button variant="outline" />}>Close</PopoverClose>
      </PopoverPopup>
    </Popover>
  )
}
