'use client'

import { useId } from 'react'
import { Label } from '@/registry/primitives/label'
import { Textarea } from '@/registry/primitives/textarea'

export default function Particle() {
  const id = useId()
  return (
    <div className="flex flex-col items-start gap-2">
      <Label htmlFor={id}>Message</Label>
      <Textarea id={id} placeholder="Type your message here" />
    </div>
  )
}
