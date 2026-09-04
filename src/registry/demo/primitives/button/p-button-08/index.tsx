'use client'

import { IconChevronDown, IconArrowUp } from '@tabler/icons-react'
import { useState } from 'react'
import { Button } from '@/registry/primitives/button'

export default function Demo() {
  const [isExpanded, setIsExpanded] = useState<boolean>(false)

  const toggleExpand = () => {
    setIsExpanded((prevState) => !prevState)
  }

  return (
    <Button
      aria-controls="expandable-content"
      aria-expanded={isExpanded}
      className="gap-1"
      onClick={toggleExpand}
      variant="ghost" // Use this ID on the element that this button controls
    >
      {isExpanded ? 'Show less' : 'Show more'}
      {isExpanded ? (
        <IconArrowUp aria-hidden="true" className="-me-1" />
      ) : (
        <IconChevronDown aria-hidden="true" className="-me-1" />
      )}
    </Button>
  )
}
