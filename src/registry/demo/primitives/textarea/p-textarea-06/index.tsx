'use client'

import { useId } from 'react'
import { Label } from '@/registry/primitives/label'
import { Textarea } from '@/registry/primitives/textarea'

export default function Demo() {
  const id = useId()
  return (
    <div className="flex flex-col gap-2">
      <Label htmlFor={id}>
        Message <span className="text-destructive">*</span>
      </Label>
      <Textarea id={id} placeholder="Type your message here" required />
    </div>
  )
}
