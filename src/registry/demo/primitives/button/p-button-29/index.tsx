'use client'

import { useState } from 'react'
import { Button } from '@/registry/primitives/button'
import { sleep } from '@/registry/utils/sleep'

export default function Particle() {
  const [isLoading, setIsLoading] = useState(false)

  const handleClick = async () => {
    setIsLoading(true)
    await sleep(1500)
    setIsLoading(false)
  }

  return (
    <div className="flex flex-wrap items-center gap-4">
      <Button loading>Always Loading</Button>
      <Button loading={isLoading} onClick={handleClick}>
        {isLoading ? 'Saving...' : 'Click to Load'}
      </Button>
    </div>
  )
}
