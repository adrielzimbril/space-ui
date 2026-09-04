'use client'

import { useId } from 'react'
import { Input } from '@/registry/primitives/input'
import { Label } from '@/registry/primitives/label'

export default function Particle() {
  const id = useId()
  return (
    <div className="flex flex-col gap-2">
      <div className="inline-flex w-full items-center justify-between gap-2">
        <Label htmlFor={id}>Email</Label>
        <Label className="font-normal text-muted-foreground" render={<span />}>
          Optional
        </Label>
      </div>
      <Input id={id} placeholder="Email" type="email" />
    </div>
  )
}
