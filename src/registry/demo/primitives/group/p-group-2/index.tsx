'use client'

import { IconCheck, IconCopy } from '@tabler/icons-react'
import { useRef } from 'react'
import { useCopyToClipboard } from '@/registry/hooks/browser/use-clipboard'
import { Button } from '@/registry/primitives/button'
import { Group, GroupSeparator } from '@/registry/primitives/group'
import { Input } from '@/registry/primitives/input'
import { Tooltip, TooltipPopup, TooltipTrigger } from '@/registry/primitives/tooltip'

export default function Particle() {
  const { copyToClipboard, isCopied } = useCopyToClipboard()
  const inputRef = useRef<HTMLInputElement>(null)

  return (
    <Group aria-label="Url input">
      <Input aria-label="Url" defaultValue="https://spaceui.one" ref={inputRef} type="text" />
      <GroupSeparator />
      <Tooltip>
        <TooltipTrigger
          render={
            <Button
              aria-label="Copy"
              onClick={() => {
                if (inputRef.current) {
                  copyToClipboard(inputRef.current.value)
                }
              }}
              size="icon"
              variant="outline"
            />
          }
        >
          {isCopied ? <IconCheck /> : <IconCopy />}
        </TooltipTrigger>
        <TooltipPopup>
          <p>Copy to clipboard</p>
        </TooltipPopup>
      </Tooltip>
    </Group>
  )
}
