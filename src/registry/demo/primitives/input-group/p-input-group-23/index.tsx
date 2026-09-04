'use client'

import { IconInfoCircle, IconSearch } from '@tabler/icons-react'
import { useEffect, useState } from 'react'
import { Button } from '@/registry/primitives/button'
import { InputGroup, InputGroupAddon, InputGroupInput } from '@/registry/primitives/input-group'
import { Tooltip, TooltipPopup, TooltipTrigger } from '@/registry/primitives/tooltip'

export default function Demo() {
  const [inputValue, setInputValue] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (inputValue) {
      setIsLoading(true)
      const timer = setTimeout(() => {
        setIsLoading(false)
      }, 500)
      return () => clearTimeout(timer)
    }
    setIsLoading(false)
  }, [inputValue])

  return (
    <InputGroup>
      <InputGroupAddon>
        {isLoading ? (
          <IconInfoCircle aria-label="Loading..." className="animate-spin" role="status" />
        ) : (
          <IconSearch aria-hidden="true" />
        )}
      </InputGroupAddon>
      <InputGroupInput
        aria-label="Search"
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Search..."
        type="search"
        value={inputValue}
      />
      <InputGroupAddon align="inline-end">
        <Tooltip>
          <TooltipTrigger render={<Button aria-label="Voice search" size="icon-xs" variant="ghost" />}>
            <IconInfoCircle aria-hidden="true" />
          </TooltipTrigger>
          <TooltipPopup>Voice search</TooltipPopup>
        </Tooltip>
      </InputGroupAddon>
    </InputGroup>
  )
}
