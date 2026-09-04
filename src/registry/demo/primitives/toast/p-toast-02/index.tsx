'use client'

import { useState } from 'react'
import { Button } from '@/registry/primitives/button'
import { toastManager } from '@/registry/primitives/toast'

const TEXTS = [
  'Short message.',
  'A bit longer message that spans two lines.',
  'This is a longer description that intentionally takes more vertical space to demonstrate stacking with varying heights.',
  'An even longer description that should span multiple lines so we can verify the clamped collapsed height and smooth expansion animation when hovering or focusing the viewport.',
]

export default function Particle() {
  const [count, setCount] = useState(0)

  function createToast() {
    setCount((prev) => prev + 1)
    const description = TEXTS[Math.floor(Math.random() * TEXTS.length)]
    toastManager.add({
      description,
      title: `Toast ${count + 1} created`,
    })
  }

  return (
    <Button onClick={createToast} variant="outline">
      With Varying Heights
    </Button>
  )
}
