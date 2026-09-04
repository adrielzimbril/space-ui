'use client'

import { IconStar } from '@tabler/icons-react'
import { useState } from 'react'
import { Button } from '@/registry/primitives/button'

export default function Demo() {
  const [isStarred, setIsStarred] = useState(false)
  const count = isStarred ? 730 : 729

  return (
    <Button onClick={() => setIsStarred(!isStarred)}>
      <IconStar aria-hidden="true" className={`${isStarred ? 'fill-yellow-500 text-yellow-500' : undefined}`} />
      <span className="flex items-baseline gap-2">
        {isStarred ? 'Starred' : 'Star'}
        <span className="text-primary-foreground/60 text-xs">{count}</span>
      </span>
    </Button>
  )
}
