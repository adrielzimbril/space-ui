'use client'

import { IconCheck, IconCopy } from '@tabler/icons-react'
import { Button } from '@/registry/primitives/button'
import { useClipboard } from '@/registry/hooks/browser/use-clipboard'

export default function Particle() {
  const { copy, copied } = useClipboard({ timeout: 2000 })

  const handleCopy = () => {
    void copy('Text copied!')
  }

  return (
    <Button onClick={handleCopy} variant="outline">
      {copied ? (
        <>
          <IconCheck aria-hidden="true" />
          Copied
        </>
      ) : (
        <>
          <IconCopy aria-hidden="true" />
          Copy
        </>
      )}
    </Button>
  )
}
