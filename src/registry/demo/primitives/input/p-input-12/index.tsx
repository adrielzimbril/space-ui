'use client'

import { useId } from 'react'
import { Input } from '@/registry/primitives/input'
import { Label } from '@/registry/primitives/label'

export default function Particle() {
  const id = useId()
  return (
    <div className="flex flex-col gap-2">
      <Label htmlFor={id}>
        Email <span className="text-destructive">*</span>
      </Label>
      <Input id={id} placeholder="Email" required type="email" />
    </div>
  )
}
