'use client'

import { IconCheck, IconCopy } from '@tabler/icons-react'
import { useRef } from 'react'
import { useCopyToClipboard } from '@/registry/hooks/browser/use-clipboard'
import { Button } from '@/registry/primitives/button'
import { anchoredToastManager } from '@/registry/primitives/toast'
import { Tooltip, TooltipPopup, TooltipTrigger } from '@/registry/primitives/tooltip'

export default function Particle() {
  const copyButtonRef = useRef<HTMLButtonElement>(null)
  const toastTimeout = 2000

  const { copyToClipboard, isCopied } = useCopyToClipboard({
    onCopy: () => {
      if (copyButtonRef.current) {
        anchoredToastManager.add({
          data: {
            tooltipStyle: true,
          },
          positionerProps: {
            anchor: copyButtonRef.current,
          },
          timeout: toastTimeout,
          title: 'Copied!',
        })
      }
    },
    timeout: toastTimeout,
  })

  function handleCopy() {
    const url = 'https://www.spaceui.one'
    copyToClipboard(url)
  }

  return (
    <Tooltip>
      <TooltipTrigger
        render={
          <Button
            aria-label="Copy link"
            disabled={isCopied}
            onClick={handleCopy}
            ref={copyButtonRef}
            size="icon"
            variant="outline"
          />
        }
      >
        {isCopied ? <IconCheck className="size-4" /> : <IconCopy className="size-4" />}
      </TooltipTrigger>
      <TooltipPopup>
        <p>Copy to clipboard</p>
      </TooltipPopup>
    </Tooltip>
  )
}
