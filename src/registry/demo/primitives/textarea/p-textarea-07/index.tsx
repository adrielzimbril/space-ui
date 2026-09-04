'use client'

import { useId } from 'react'
import { Label } from '@/registry/primitives/label'
import { Textarea } from '@/registry/primitives/textarea'

export default function Demo() {
  const id = useId()
  return (
    <div className="flex flex-col gap-2">
      <div className="inline-flex w-full items-center justify-between gap-2">
        <Label htmlFor={id}>Message</Label>
        <Label className="font-normal text-muted-foreground" render={<span />}>
          Optional
        </Label>
      </div>
      <Textarea id={id} placeholder="Type your message here" />
    </div>
  )
}
