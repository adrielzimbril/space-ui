'use client'

import { IconPlus } from '@tabler/icons-react'
import { useState } from 'react'
import { Button } from '@/registry/primitives/button'

export default function Particle() {
  const [open, setOpen] = useState(false)

  return (
    <Button
      aria-expanded={open}
      aria-label={open ? 'Close menu' : 'Open menu'}
      className="rounded-full before:rounded-full"
      onClick={() => setOpen((prevState) => !prevState)}
      size="icon"
      variant="outline"
    >
      <IconPlus
        aria-hidden="true"
        className="in-[[aria-expanded=true]]:rotate-[135deg] transition-transform duration-500 ease-[cubic-bezier(0.68,-0.6,0.32,1.6)]"
      />
    </Button>
  )
}
