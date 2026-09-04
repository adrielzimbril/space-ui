'use client'

import { useId } from 'react'
import { Input } from '@/registry/primitives/input'

export default function Demo() {
  const id = useId()
  return <Input className="read-only:bg-muted" defaultValue="This is a read-only input" id={id} readOnly type="text" />
}
