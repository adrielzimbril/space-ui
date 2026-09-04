'use client'

import { useId } from 'react'
import { Textarea } from '@/registry/primitives/textarea'

export default function Demo() {
  const id = useId()
  return <Textarea className="read-only:bg-muted" defaultValue="This is a read-only textarea" id={id} readOnly />
}
