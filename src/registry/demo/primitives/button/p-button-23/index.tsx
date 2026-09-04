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
    <Button aria-label={copied ? 'Copied' : 'Copy to clipboard'} onClick={handleCopy} size="icon" variant="outline">
      {copied ? <IconCheck aria-hidden="true" /> : <IconCopy aria-hidden="true" />}
    </Button>
  )
}
