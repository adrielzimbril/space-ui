'use client'

import { IconCheck, IconCopy } from '@tabler/icons-react'
import { useRef } from 'react'
import { Button } from '@/registry/primitives/button'
import { InputGroup, InputGroupAddon, InputGroupTextarea } from '@/registry/primitives/input-group'
import { Select, SelectItem, SelectPopup, SelectTrigger, SelectValue } from '@/registry/primitives/select'
import { Tooltip, TooltipPopup, TooltipTrigger } from '@/registry/primitives/tooltip'
import { useClipboard } from '@/registry/hooks/browser/use-clipboard'

const languages = [
  { label: 'JavaScript', value: 'javascript' },
  { label: 'TypeScript', value: 'typescript' },
  { label: 'Python', value: 'python' },
  { label: 'Go', value: 'go' },
  { label: 'Rust', value: 'rust' },
]

export default function Particle() {
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const { copy, copied } = useClipboard({ timeout: 2000 })

  const handleCopy = () => {
    const content = textareaRef.current?.value || ''
    void copy(content)
  }

  return (
    <InputGroup>
      <InputGroupTextarea className="font-mono" placeholder="Paste your code here…" ref={textareaRef} rows={6} />
      <InputGroupAddon align="block-start" className="justify-between rounded-t-lg border-b bg-muted p-2!">
        <Select defaultValue="javascript" items={languages}>
          <SelectTrigger className="w-fit" size="sm">
            <SelectValue />
          </SelectTrigger>
          <SelectPopup>
            {languages.map(({ label, value }) => (
              <SelectItem key={value} value={value}>
                {label}
              </SelectItem>
            ))}
          </SelectPopup>
        </Select>
        <Tooltip>
          <TooltipTrigger
            render={
              <Button
                aria-label={copied ? 'Copied' : 'Copy code'}
                onClick={handleCopy}
                size="icon-sm"
                variant="ghost"
              />
            }
          >
            {copied ? <IconCheck /> : <IconCopy />}
          </TooltipTrigger>
          <TooltipPopup>{copied ? 'Copied!' : 'Copy to clipboard'}</TooltipPopup>
        </Tooltip>
      </InputGroupAddon>
    </InputGroup>
  )
}
