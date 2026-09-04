'use client'

import { useId } from 'react'
import { Input } from '@/registry/primitives/input'
import { Label } from '@/registry/primitives/label'

export default function Particle() {
  const id = useId()
  return (
    <div className="flex flex-col items-start gap-2">
      <Label htmlFor={id}>Email</Label>
      <Input aria-label="Email" id={id} placeholder="you@example.com" type="email" />
    </div>
  )
}
